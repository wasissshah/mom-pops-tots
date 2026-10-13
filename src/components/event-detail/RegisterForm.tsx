"use client";

import { useState, type FormEvent } from "react";
import SafeInput from "@/components/ui/SafeInput";
import { ApiError } from "@/api/client";
import type { EventActivity, EventDetail, EventSession } from "@/api/eventDetail";
import { getCities } from "@/api/cities";
import { registerForEvent } from "@/api/registration";
import { useApi } from "@/hooks/useApi";
import { formatDayHeading, formatTimeShort } from "@/lib/eventDate";

type Props = { event: EventDetail };
type Status = { type: "success" | "error"; text: string } | null;

// name + age rows (children / adults) are kept as a list of ids so rows can be added and removed
let nextRowId = 2;
const newRow = () => nextRowId++;

type DayGroup = { activity: EventActivity; sessions: EventSession[] };

// activities -> one block per day, one group per activity (same layout as the design)
function groupByDay(activities: EventActivity[]) {
  const days = new Map<string, DayGroup[]>();
  activities.forEach((activity) =>
    activity.schedule.forEach((day) => {
      if (day.sessions.length === 0) return;
      days.set(day.date, [...(days.get(day.date) ?? []), { activity, sessions: day.sessions }]);
    }),
  );
  return [...days].sort((a, b) => a[0].localeCompare(b[0]));
}

// the API may send nested keys as children.0.name or children[0][name]
const normalizeKeys = (fields: Record<string, string>) =>
  Object.fromEntries(Object.entries(fields).map(([k, v]) => [k.replace(/\[(\w+)\]/g, ".$1"), v]));

// age fields accept digits only (also strips pasted letters)
const digitsOnly = (e: FormEvent<HTMLInputElement>) => {
  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
};

const toAge = (value: FormDataEntryValue | null) => {
  const text = String(value ?? "").trim();
  return text === "" || Number.isNaN(Number(text)) ? null : Number(text);
};

export default function RegisterForm({ event }: Props) {
  const { registration, title } = event;
  const activities = event.activities ?? [];
  const days = groupByDay(activities);
  const relationships = registration?.relationships ?? [];
  // global cities list (same API as the header); the event's own list is the fallback if it fails
  const { data: cityData } = useApi(getCities, "Cities (register form)", { localized: false });
  const cities = cityData?.length ? cityData : (registration?.cities ?? []);
  const limits = registration?.limits;
  // activity id -> chosen session id (one session per activity; click the chosen one again to clear it)
  const [selected, setSelected] = useState<Record<number, number | null>>({});
  const [children, setChildren] = useState([1]);
  const [adults, setAdults] = useState<number[]>([1]);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>(null);

  const invalid = (key: string) => (errors[key] ? " is-invalid" : "");
  const fieldError = (key: string) => (errors[key] ? <div className="invalid-feedback d-block">{errors[key]}</div> : null);

  // errors that do not belong to a visible field are listed in the alert so nothing is lost
  const shown = /^(first_name|last_name|email|phone|city_id|relationship|website)$|^(children|adults)\.\d+\.(name|age)$|^sessions(\.|$)/;
  const otherErrors = Object.entries(errors).filter(([key]) => !shown.test(key));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const text = (name: string) => String(data.get(name) ?? "").trim();

    if (!data.get("consent")) {
      setErrors({});
      setStatus({ type: "error", text: "Please accept the terms to continue." });
      return;
    }

    // chosen sessions in the shape the API expects: activity + date + start time
    const chosenSessions = activities.flatMap((activity) =>
      activity.schedule.flatMap((day) =>
        day.sessions
          .filter((session) => selected[activity.id] === session.id)
          .map((session) => ({ activity_id: activity.id, date: day.date, start: session.start })),
      ),
    );

    const rows = (ids: number[], prefix: string) =>
      ids.map((id) => ({ name: text(`${prefix}_name_${id}`), age: toAge(data.get(`${prefix}_age_${id}`)) }));

    setSending(true);
    setErrors({});
    setStatus(null);
    try {
      const result = await registerForEvent(event.id, {
        first_name: text("first_name"),
        last_name: text("last_name"),
        email: text("email"),
        phone: text("phone"),
        city_id: text("city_id") ? Number(text("city_id")) : null,
        relationship: text("relationship"),
        // empty rows are skipped, so an unused second child does not fail validation
        children: rows(children, "child").filter((c) => c.name || c.age !== null),
        adults: rows(adults, "adult").filter((a) => a.name || a.age !== null),
        sessions: chosenSessions,
        website: text("website"),
      });
      setStatus({ type: "success", text: result.message ?? "Thank you! Your registration has been received." });
      form.reset();
      setChildren([1]);
      setAdults([1]);
      setSelected({});
    } catch (error) {
      console.log("[API] Event registration failed:", error);
      if (error instanceof ApiError) {
        if (error.status === 422) setErrors(normalizeKeys(error.fields));
        setStatus({ type: "error", text: error.message });
      } else {
        setStatus({ type: "error", text: "Something went wrong. Please try again." });
      }
    } finally {
      setSending(false);
    }
  }

  // typing in a field removes its error message
  function clearError(e: FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement;
    const key = target.name
      .replace(/^child_(name|age)_(\d+)$/, (_m, field, id) => `children.${children.indexOf(Number(id))}.${field}`)
      .replace(/^adult_(name|age)_(\d+)$/, (_m, field, id) => `adults.${adults.indexOf(Number(id))}.${field}`);
    if (key && errors[key]) setErrors(({ [key]: _removed, ...rest }) => rest);
  }

  const personRows = (ids: number[], prefix: "child" | "adult", group: "children" | "adults", label: string, onRemove?: (id: number) => void) =>
    ids.map((id, i) => (
      <div className="row g-3 mt-0" key={id}>
        <div className="col-md-6">
          <label className="form-label" htmlFor={`${prefix}${id}`}>{label} {i + 1} Name</label>
          <SafeInput className={`form-control${invalid(`${group}.${i}.name`)}`} id={`${prefix}${id}`} name={`${prefix}_name_${id}`} type="text" />
          {fieldError(`${group}.${i}.name`)}
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor={`${prefix}age${id}`}>Age</label>
          <div className="register__row">
            <SafeInput className={`form-control${invalid(`${group}.${i}.age`)}`} id={`${prefix}age${id}`} name={`${prefix}_age_${id}`} type="text" inputMode="numeric" maxLength={3} onInput={digitsOnly} />
            {onRemove && i > 0 && (
              <button className="register__remove" type="button" aria-label={`Remove ${label.toLowerCase()} ${i + 1}`} onClick={() => onRemove(id)}>
                <img src="/assets/images/delete-btn.png" alt="" />
              </button>
            )}
          </div>
          {fieldError(`${group}.${i}.age`)}
        </div>
      </div>
    ));

  if (registration && !registration.open) {
    return (
      <section className="register" id="register">
        <div className="container text-center">
          <span className="section-eyebrow d-block">Registration</span>
          <h2 className="section-title section-title--center">Registration is closed</h2>
          <p>Registration for {title} is not open right now.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="register" id="register">
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">Registration</span>
          <h2 className="section-title section-title--center">Register for {title}</h2>
        </div>

        <form className="register__form form-brand" onSubmit={onSubmit} onInput={clearError} noValidate>
          <div className="form-card">
            <h3 className="form-card__title">Your Details</h3>
            <p className="form-card__sub">Complete the registration form below.</p>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label" htmlFor="firstName">First name</label>
                <SafeInput className={`form-control${invalid("first_name")}`} id="firstName" name="first_name" type="text" />
                {fieldError("first_name")}
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="lastName">Last name</label>
                <SafeInput className={`form-control${invalid("last_name")}`} id="lastName" name="last_name" type="text" />
                {fieldError("last_name")}
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="email">Email *</label>
                <SafeInput className={`form-control${invalid("email")}`} id="email" name="email" type="email" />
                {fieldError("email")}
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="phone">Phone Number *</label>
                <SafeInput className={`form-control${invalid("phone")}`} id="phone" name="phone" type="tel" placeholder="+971 50 123 4567" />
                {fieldError("phone")}
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="city">City</label>
                <select className={`form-select${invalid("city_id")}`} id="city" name="city_id" defaultValue="">
                  <option value="" disabled />
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {fieldError("city_id")}
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="role">Are you a?</label>
                <select className={`form-select${invalid("relationship")}`} id="role" name="relationship" defaultValue="">
                  <option value="" disabled />
                  {relationships.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
                {fieldError("relationship")}
              </div>
            </div>

            <div className="form-card__head">
              <h3 className="form-card__title">Children&apos;s Details</h3>
              <button className="btn btn-brand-outline" type="button" disabled={!!limits && children.length >= limits.max_children} onClick={() => setChildren((c) => [...c, newRow()])}>
                + Add child
              </button>
            </div>
            {personRows(children, "child", "children", "Child", (id) => setChildren((c) => c.filter((x) => x !== id)))}

            <hr className="form-card__rule" />
            <div className="form-card__head form-card__head--flat">
              <h3 className="form-card__title">Adult accompanying?</h3>
              <button className="btn btn-brand-outline" type="button" disabled={!!limits && adults.length >= limits.max_adults} onClick={() => setAdults((a) => [...a, newRow()])}>
                + Add the adults
              </button>
            </div>
            {personRows(adults, "adult", "adults", "Adult", (id) => setAdults((a) => a.filter((x) => x !== id)))}
          </div>

          {days.map(([date, groups]) => (
            <div className="choose" key={date}>
              <h3 className="choose__title">Choose your Activities - <span>{formatDayHeading(date)}</span></h3>
              <div className="row g-4">
                {groups.map(({ activity, sessions }) => (
                  <div className="col-md-6" key={activity.id}>
                    <h4 className="choose__group">{activity.title}</h4>
                    <div className="choose__list">
                      {sessions.map((session) => {
                        const text = session.description ? `${activity.title} - ${session.description}` : activity.title;
                        if (session.is_full || !session.bookable) {
                          return (
                            <div className="choice choice--full" key={session.id}>
                              <span className="choice__text">{text}</span>
                              <time>{formatTimeShort(session.start)}</time>
                            </div>
                          );
                        }
                        const checked = selected[activity.id] === session.id;
                        return (
                          <label className="choice" key={session.id}>
                            <span className="choice__text">{text}</span>
                            <time>{formatTimeShort(session.start)}</time>
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`activity_${activity.id}`}
                              checked={checked}
                              onChange={() => setSelected((s) => ({ ...s, [activity.id]: session.id }))}
                              onClick={() => checked && setSelected((s) => ({ ...s, [activity.id]: null }))}
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(errors).some((k) => k.startsWith("sessions")) && (
            <div className="invalid-feedback d-block mb-3">
              {Object.entries(errors).filter(([k]) => k.startsWith("sessions")).map(([, message]) => message).join(" ")}
            </div>
          )}

          {/* honeypot: hidden from people, bots fill it and get rejected */}
          <div aria-hidden style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
            <label htmlFor="regWebsite">Website</label>
            <input id="regWebsite" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="form-check form-check--green">
            <input className="form-check-input" type="checkbox" id="consent" name="consent" defaultChecked />
            <label className="form-check-label" htmlFor="consent">
              I agree to receive information from Moms, Pops &amp; Tots and The PR Professionals related to upcoming
              events, parenting advice and other family resources. I understand that some of the activities may not
              be suitable for children under the age of 5 &amp; Parent are fully responsible for their children
              throughout the course of the event. I understand that this information may be shared with the event
              exhibitors and the event partners. Please note that photography and videography will be taking place
              during the event. By attending, you acknowledge that you may appear in event coverage used for
              promotional and marketing purposes.
            </label>
          </div>

          {status && (
            <div className={`alert alert-${status.type === "success" ? "success" : "danger"} mt-4 mb-0`} role="alert">
              {status.text}
              {otherErrors.length > 0 && (
                <ul className="mb-0 mt-2">
                  {otherErrors.map(([key, message]) => (
                    <li key={key}>{message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <div className="text-center mt-4">
            <button className="btn btn-primary" type="submit" disabled={sending} aria-busy={sending}>
              {sending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
