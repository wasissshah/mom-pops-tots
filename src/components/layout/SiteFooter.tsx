"use client";

import { footerColumns } from "@/data/navigation";
import SafeInput from "@/components/ui/SafeInput";
import { useBackToTop } from "@/hooks/useBackToTop";

export default function SiteFooter() {
  const { visible, scrollToTop } = useBackToTop();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <img className="footer-logo" src="/assets/images/logo.jpg" alt="Moms Pops Tots" />
            <p className="footer-tagline">Connecting Families, Enriching Lives.</p>
            <p className="footer-about">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
          </div>
          {footerColumns.map((col, i) => (
            <div className="col-sm-6 col-lg" key={i}>
              <h5 className="footer-title">{col.title}</h5>
              <ul className="nav flex-column footer-nav">
                {col.links.map((link) => (
                  <li className="nav-item" key={link}>
                    <a className="nav-link" href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-lg-5 offset-lg-3">
            <form className="footer-newsletter mb-4 mb-lg-0">
              <h5 className="footer-title">Get valuable updates &amp; insights</h5>
              <div className="footer-newsletter__field">
                <SafeInput className="form-control" type="email" placeholder="Your email here" aria-label="Email address" />
                <button type="submit" aria-label="Subscribe"><img src="/assets/images/arrow-line-dark.svg" alt="" /></button>
              </div>
              <p className="footer-newsletter__note">
                By signing up to receive emails, you agree to our <a href="#">Privacy Policy.</a> We treat your
                information responsibly. Unsubscribe anytime.
              </p>
            </form>
          </div>
          <div className="col-lg-3">
            <h5 className="footer-follow">Follow Us</h5>
            <div className="d-flex gap-2">
              <a className="social-pebble social-pebble--pink" href="#" aria-label="Instagram"><img src="/assets/images/instagram.svg" alt="" width={20} height={20} /></a>
              <a className="social-pebble social-pebble--blue" href="#" aria-label="Facebook"><img src="/assets/images/facebook.svg" alt="" width={20} height={20} /></a>
              <a className="social-pebble social-pebble--green" href="#" aria-label="WhatsApp"><img src="/assets/images/whatsapp.svg" alt="" width={20} height={20} /></a>
            </div>
          </div>
        </div>

        <a
          className={`footer-top${visible ? " is-visible" : ""}`}
          href="#"
          aria-label="Back to top"
          onClick={scrollToTop}
        >
          <img src="/assets/images/arrow-up.svg" alt="" width={16} height={16} />
        </a>

        <div className="footer-bottom d-flex justify-content-between">
          <span>All rights reserved &copy; 2025</span>
          <span>Copyright MOMS,POPS &amp; TOTS</span>
        </div>
      </div>
    </footer>
  );
}
