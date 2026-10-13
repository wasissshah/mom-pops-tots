"use client";

import { useState, type FormEvent } from "react";
import DoodleSection from "@/components/ui/DoodleSection";
import SafeInput from "@/components/ui/SafeInput";
import { ApiError } from "@/api/client";
import { sendContact } from "@/api/contact";
import { countryCodes } from "@/data/countryCodes";

type Status = { type: "success" | "error"; text: string } | null;

export default function Connect() {
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({}); // one message per field from the API
  const [status, setStatus] = useState<Status>(null);

  const invalid = (name: string) => (errors[name] ? " is-invalid" : "");
  const fieldError = (name: string) =>
    errors[name] ? <div className="invalid-feedback d-block">{errors[name]}</div> : null;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const code = value("country_code").replace(/^\+/, "");

    setSending(true);
    setErrors({});
    setStatus(null);
    try {
      const result = await sendContact({
        full_name: value("full_name"),
        company: value("company"),
        email: value("email"),
        phone: value("phone") ? `+${code} ${value("phone")}` : "",
        message: value("message"),
        website: value("website"),
      });
      setStatus({ type: "success", text: result.message });
      form.reset();
    } catch (error) {
      console.log("[API] Contact form failed:", error);
      if (error instanceof ApiError) {
        if (error.status === 422) setErrors(error.fields); // field-level messages
        // show the API's own message (validation, "too many messages", ...)
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
    const name = (e.target as HTMLInputElement).name;
    if (name && errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
  }

  return (
    <DoodleSection className="connect">
      <img className="doodle connect__doodle connect__doodle--envelope" src="/assets/images/envelope.svg" alt="" />
      <img className="doodle connect__doodle connect__doodle--calendar" src="/assets/images/calendar.svg" alt="" />
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-6 d-flex flex-column">
            <div className="text-center text-lg-start">
              <span className="section-eyebrow d-block">Let&apos;s connect for</span>
              <h2 className="section-title">General Queries</h2>
            </div>
            <form className="connect-card flex-grow-1" onSubmit={onSubmit} onInput={clearError} noValidate>
              <h3 className="connect-card__title">Send Us a Message</h3>
              <p className="connect-card__sub">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label" htmlFor="fullName">Full Name</label>
                  <div className="position-relative">
                    <SafeInput className={`form-control${invalid("full_name")}`} id="fullName" name="full_name" type="text" placeholder="Enter your name" />
                  </div>
                  {fieldError("full_name")}
                </div>
                <div className="col-6">
                  <label className="form-label" htmlFor="company">Company / Organization</label>
                  <div className="position-relative">
                    <SafeInput className={`form-control${invalid("company")}`} id="company" name="company" type="text" placeholder="Enter your company name" />
                  </div>
                  {fieldError("company")}
                </div>
                <div className="col-6">
                  <label className="form-label" htmlFor="connectEmail">Email Address</label>
                  <div className="position-relative">
                    <SafeInput className={`form-control${invalid("email")}`} id="connectEmail" name="email" type="email" placeholder="your.email@example.com" />
                  </div>
                  {fieldError("email")}
                </div>
                <div className="col-6">
                  <label className="form-label" htmlFor="connectPhone">Contact Number</label>
                  <div className="d-flex gap-2">
                    <select className="form-select phone-code" name="country_code" defaultValue="971" aria-label="Country code">
                      {countryCodes.map((c) => (
                        <option key={c.iso} value={c.dial} title={c.name}>{c.iso} +{c.dial}</option>
                      ))}
                    </select>
                    <SafeInput className={`form-control${invalid("phone")}`} id="connectPhone" name="phone" type="tel" />
                  </div>
                  {fieldError("phone")}
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea className={`form-control${invalid("message")}`} id="message" name="message" rows={5} placeholder="Tell us about your requirements..." />
                  {fieldError("message")}
                </div>
                {/* honeypot: hidden from people, bots fill it and get rejected */}
                <div aria-hidden style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
              </div>
              {status && (
                <div className={`alert alert-${status.type === "success" ? "success" : "danger"} py-2 mt-3 mb-0`} role="alert">
                  {status.text}
                </div>
              )}
              <div className="connect-card__footer">
                <p className="connect-card__privacy">
                  <img src="/assets/images/lock-icon.svg" alt="" width={10} height={12} /> We respect your privacy.
                  <br />Your information is safe with us.
                </p>
                <button className="btn btn-primary" type="submit" disabled={sending} aria-busy={sending}>
                  {sending ? "Sending..." : "Send inquiry"}
                </button>
              </div>
            </form>
          </div>

          <div className="col-lg-6 d-flex flex-column">
            <div className="text-center text-lg-start">
              <span className="section-eyebrow d-block">Connect here if you are</span>
              <h2 className="section-title">Advertiser or Exhibitor</h2>
            </div>
            <div className="connect-card connect-card--calendar flex-grow-1" />
          </div>
        </div>
      </div>
    </DoodleSection>
  );
}
