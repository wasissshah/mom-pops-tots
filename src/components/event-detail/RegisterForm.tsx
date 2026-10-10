"use client";

import { Fragment, useState } from "react";
import SafeInput from "@/components/ui/SafeInput";
import { chooseDays } from "@/data/eventDetail";

export default function RegisterForm({ title }: { title?: string }) {
  const [children, setChildren] = useState([1, 2]);

  return (
    <section className="register" id="register">
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">Registration</span>
          <h2 className="section-title section-title--center">Register for {title ?? "this event"}</h2>
        </div>

        <form className="register__form form-brand" onSubmit={(e) => e.preventDefault()}>
          <div className="form-card">
            <h3 className="form-card__title">Your Details</h3>
            <p className="form-card__sub">Complete the registration form below.</p>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label" htmlFor="firstName">First name</label>
                <SafeInput className="form-control" id="firstName" type="text" />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="lastName">Last name</label>
                <SafeInput className="form-control" id="lastName" type="text" />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="email">Email *</label>
                <SafeInput className="form-control" id="email" type="email" />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="phone">Phone Number *</label>
                <SafeInput className="form-control" id="phone" type="tel" />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="city">City</label>
                <select className="form-select" id="city" defaultValue="">
                  <option value="" disabled />
                  <option>Abu Dhabi</option>
                  <option>Dubai</option>
                  <option>Sharjah</option>
                  <option>Muscat</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="role">Are you a?</label>
                <select className="form-select" id="role" defaultValue="">
                  <option value="" disabled />
                  <option>Mom</option>
                  <option>Pop</option>
                  <option>Guardian</option>
                </select>
              </div>
            </div>

            <div className="form-card__head">
              <h3 className="form-card__title">Children&apos;s Details</h3>
              <button className="btn btn-brand-outline" type="button" onClick={() => setChildren((c) => [...c, c.length + 1])}>
                + Add child
              </button>
            </div>
            <div className="row g-3">
              {children.map((n) => (
                <Fragment key={n}>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor={`child${n}`}>Child {n} Name</label>
                    <SafeInput className="form-control" id={`child${n}`} type="text" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor={`age${n}`}>Age</label>
                    <SafeInput className="form-control" id={`age${n}`} type="text" />
                  </div>
                </Fragment>
              ))}
            </div>

            <hr className="form-card__rule" />
            <div className="form-card__head form-card__head--flat">
              <h3 className="form-card__title">Adult accompanying?</h3>
              <button className="btn btn-brand-outline" type="button">+ Add the adults</button>
            </div>
          </div>

          {chooseDays.map((day) => (
            <div className="choose" key={day.date}>
              <h3 className="choose__title">{day.title} - <span>{day.date}</span></h3>
              <div className="row g-4">
                {day.groups.map((group) => (
                  <div className="col-md-6" key={group.name}>
                    <h4 className="choose__group">{group.group}</h4>
                    <div className="choose__list">
                      {group.options.map((option, i) =>
                        option.disabled ? (
                          <div className="choice choice--full" key={i}>
                            <span className="choice__text">{option.text}</span>
                            <time>{option.time}</time>
                          </div>
                        ) : (
                          <label className="choice" key={i}>
                            <span className="choice__text">{option.text}</span>
                            <time>{option.time}</time>
                            <input className="form-check-input" type="radio" name={group.name} />
                          </label>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="form-check form-check--green">
            <input className="form-check-input" type="checkbox" id="consent" defaultChecked />
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
          <div className="text-center mt-4">
            <button className="btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
}
