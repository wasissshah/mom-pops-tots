"use client";

import SafeInput from "@/components/ui/SafeInput";

export default function CtaBanners() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-banner cta-banner--green">
          <div className="cta-banner__copy">
            <h2>Want to be the First to know about our events?</h2>
            <p>Get new events sent straight to your WhatsApp - no spam, just good family plans.</p>
          </div>
          <form className="cta-banner__form" onSubmit={(e) => e.preventDefault()}>
            <SafeInput className="form-control" type="tel" placeholder="+971 6X XXX XXXX" aria-label="WhatsApp number" />
            <button className="btn btn-primary btn-primary--green" type="submit">Sign up now</button>
          </form>
        </div>
        <div className="cta-banner cta-banner--pink">
          <div className="cta-banner__copy">
            <h2>Want to list your family event here?</h2>
            <p>Speak to our team for more information.</p>
          </div>
          <a className="btn btn-primary" href="#">Become a partner</a>
          <img className="cta-banner__img" src="/assets/images/img2.jpg" alt="" />
        </div>
      </div>
    </section>
  );
}
