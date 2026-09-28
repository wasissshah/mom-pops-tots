export default function Sidebar() {
  return (
    <aside className="event-detail__aside">
      <div className="info-card">
        <span className="tag tag--green">Free to attend</span>
        <p className="event-detail__spots">Only 18 spots left for Saturday</p>
        <div className="progress" role="progressbar" aria-label="Spots filled" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar" style={{ width: "60%" }} />
        </div>
        <ul className="detail-list">
          <li>
            <img src="/assets/images/calendar2.svg" alt="" />
            <div>
              <strong>Thu, Aug 21 - 2:00 PM to 5:00 PM</strong>
              <strong>Fri, Aug 22 - 2:00 PM to 5:00 PM</strong>
              <strong>Sat, Aug 23 - 2:00 PM to 5:00 PM</strong>
              <small>Multiple sessions per day</small>
            </div>
          </li>
          <li>
            <img src="/assets/images/map.svg" alt="" />
            <div><strong>City Walk Library</strong><small>Manrat Al Saadiyat, Abu Dhabi</small></div>
          </li>
          <li>
            <img src="/assets/images/age.svg" alt="" />
            <div><strong>Ages 3+</strong><small>Family-friendly</small></div>
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
