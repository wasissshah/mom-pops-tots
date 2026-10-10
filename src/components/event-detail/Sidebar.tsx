import type { EventDetail } from "@/api/eventDetail";
import { formatSession } from "@/lib/eventDate";

export default function Sidebar({ event }: { event: EventDetail }) {
  const { pricing, venue } = event;
  return (
    <aside className="event-detail__aside">
      <div className="info-card">
        <span className={`tag${pricing.is_paid ? "" : " tag--green"}`}>{pricing.is_paid ? pricing.label : "Free to attend"}</span>
        <ul className="detail-list">
          <li>
            <img src="/assets/images/calendar2.svg" alt="" />
            <div>
              {event.dates.map((d) => (
                <strong key={`${d.date}-${d.start}`}>{formatSession(d.date, d.start, d.end)}</strong>
              ))}
            </div>
          </li>
          <li>
            <img src="/assets/images/map.svg" alt="" />
            <div><strong>{venue.name}</strong><small>{venue.address}</small></div>
          </li>
        </ul>
        <a className="btn btn-primary w-100" href="#register">Register now</a>
      </div>
      <div className="info-card">
        <h3 className="event-detail__share">Share Event</h3>
        <div className="d-flex gap-2">
          <a className="social-pebble social-pebble--pink" href="#" aria-label="Instagram"><img src="/assets/images/instagram.svg" alt="" width={20} height={20} /></a>
          <a className="social-pebble social-pebble--blue" href="#" aria-label="Facebook"><img src="/assets/images/facebook.svg" alt="" width={20} height={20} /></a>
          <a className="social-pebble social-pebble--green" href="#" aria-label="WhatsApp"><img src="/assets/images/whatsapp.svg" alt="" width={20} height={20} /></a>
          <a className="social-pebble social-pebble--yellow" href="#" aria-label="Copy link"><img src="/assets/images/copy.svg" alt="" width={20} height={20} /></a>
        </div>
      </div>
    </aside>
  );
}
