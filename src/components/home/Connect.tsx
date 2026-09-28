"use client";

import DoodleSection from "@/components/ui/DoodleSection";
import SafeInput from "@/components/ui/SafeInput";

export default function Connect() {
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
            <form className="connect-card flex-grow-1" onSubmit={(e) => e.preventDefault()}>
              <h3 className="connect-card__title">Send Us a Message</h3>
              <p className="connect-card__sub">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label" htmlFor="fullName">Full Name</label>
                  <div className="position-relative">
                    <SafeInput className="form-control" id="fullName" type="text" placeholder="Enter your name" />
                  </div>
                </div>
                <div className="col-6">
                  <label className="form-label" htmlFor="company">Company / Organization</label>
                  <div className="position-relative">
                    <SafeInput className="form-control" id="company" type="text" placeholder="Enter your company name" />
                  </div>
                </div>
                <div className="col-6">
                  <label className="form-label" htmlFor="connectEmail">Email Address</label>
                  <div className="position-relative">
                    <SafeInput className="form-control" id="connectEmail" type="email" placeholder="your.email@example.com" />
                  </div>
                </div>
                <div className="col-6">
                  <label className="form-label" htmlFor="connectPhone">Contact Number</label>
                  <div className="d-flex gap-2">
                    <SafeInput className="form-control phone-code" type="text" defaultValue="947" aria-label="Country code" />
                    <SafeInput className="form-control" id="connectPhone" type="tel" />
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea className="form-control" id="message" rows={5} placeholder="Tell us about your requirements..." />
                </div>
              </div>
              <div className="connect-card__footer">
                <p className="connect-card__privacy">
                  <img src="/assets/images/lock-icon.svg" alt="" width={10} height={12} /> We respect your privacy.
                  <br />Your information is safe with us.
                </p>
                <button className="btn btn-primary" type="submit">Send inquiry</button>
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
