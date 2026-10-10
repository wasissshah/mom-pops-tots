import type { EventDetail } from "@/api/eventDetail";

export default function LocationBlock({ event }: { event: EventDetail }) {
  const { venue } = event;
  const query = venue.latitude != null && venue.longitude != null
    ? `${venue.latitude},${venue.longitude}`
    : encodeURIComponent([venue.name, venue.address].filter(Boolean).join(", "));
  return (
    <section className="event-detail__block">
      <div className="text-center"><h2 className="section-title section-title--center">Location</h2></div>
      <div className="event-detail__venue">
        <div>
          <h3>{venue.name}</h3>
          <p>{venue.address}</p>
        </div>
        <a className="btn btn-primary btn-primary--green" href={`https://www.google.com/maps?q=${query}`} target="_blank" rel="noreferrer">Open in Google Map</a>
      </div>
      <div className="event-detail__map">
        <iframe
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
}
