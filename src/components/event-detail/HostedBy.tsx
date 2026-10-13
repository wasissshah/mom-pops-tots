import type { EventDetail } from "@/api/eventDetail";

// Contact details come from `event.hosts` (lists of names, emails and WhatsApp numbers)
export default function HostedBy({ event }: { event: EventDetail }) {
  const { names = [], emails = [], whatsapp = [] } = event.hosts ?? {};
  if (!names.length && !emails.length && !whatsapp.length) return null;

  return (
    <section className="event-detail__block">
      <div className="text-center"><h2 className="section-title section-title--center">Hosted By</h2></div>
      <h3 className="event-detail__host">Moms Pops Tots</h3>
      <div className="event-detail__contacts">
        {names.length > 0 && (
          <div className="contact-item">
            <span className="social-pebble social-pebble--yellow">
              <img src="/assets/images/contact.svg" alt="" width={22} />
            </span>
            <div><small>Contact person</small>{names.map((n) => <strong key={n}>{n}</strong>)}</div>
          </div>
        )}
        {names.length > 0 && emails.length > 0 && <span className="event-detail__contacts-divider" />}
        {emails.length > 0 && (
          <div className="contact-item">
            <span className="social-pebble social-pebble--pink">
              <img src="/assets/images/email.svg" alt="" width={22} />
            </span>
            <div><small>Email</small>{emails.map((m) => <strong key={m}>{m}</strong>)}</div>
          </div>
        )}
        <span className="event-detail__contacts-break" />
        {whatsapp.length > 0 && (
          <div className="contact-item">
            <span className="social-pebble social-pebble--green">
              <img src="/assets/images/whatsapp.svg" alt="" width={20} height={20} />
            </span>
            <div><small>WhatsApp</small>{whatsapp.map((w) => <strong key={w}>{w}</strong>)}</div>
          </div>
        )}
      </div>
    </section>
  );
}
