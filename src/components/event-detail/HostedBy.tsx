export default function HostedBy() {
  return (
    <section className="event-detail__block">
      <div className="text-center"><h2 className="section-title section-title--center">Hosted By</h2></div>
      <h3 className="event-detail__host">Moms Pops Tots</h3>
      <div className="event-detail__contacts">
        <div className="contact-item">
          <span className="social-pebble social-pebble--yellow">
            <img src="/assets/images/contact.svg" alt="" width={22} />
          </span>
          <div><small>Contact person</small><strong>James Okafor</strong></div>
        </div>
        <span className="event-detail__contacts-divider" />
        <div className="contact-item">
          <span className="social-pebble social-pebble--pink">
            <img src="/assets/images/email.svg" alt="" width={22} />
          </span>
          <div><small>Email</small><strong>james@momspopstots.com</strong></div>
        </div>
        <span className="event-detail__contacts-break" />
        <div className="contact-item">
          <span className="social-pebble social-pebble--green">
            <img src="/assets/images/whatsapp.svg" alt="" width={20} height={20} />
          </span>
          <div><small>WhatsApp</small><strong>+1 718 555 0341</strong></div>
        </div>
      </div>
    </section>
  );
}
