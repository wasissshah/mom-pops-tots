import type { EventDetail } from "@/api/eventDetail";
import { formatDayLabel, formatDuration, formatTimeRange } from "@/lib/eventDate";

// Built from the event's `dates` array: one slot per session date.
// The API has no instructor / per-slot capacity, so those parts are not shown.
export default function Activities({ event }: { event: EventDetail }) {
  if (event.dates.length === 0) return null;
  const duration = formatDuration(event.dates[0].start, event.dates[0].end);

  return (
    <section className="event-detail__block">
      <div className="text-center"><h2 className="section-title section-title--center">Activities</h2></div>
      <div className="activity">
        <h3 className="activity__title">{event.title}</h3>
        {event.excerpt && <p className="activity__text">{event.excerpt}</p>}
        {duration && (
          <p className="activity__meta">Duration: <strong>{duration}</strong></p>
        )}
        <span className="activity__label">Available Slots</span>
        <div className="row g-2">
          {event.dates.map((d) => (
            <div className="col-4" key={`${d.date}-${d.start}`}>
              <span className="slot">{formatTimeRange(d.start, d.end)}<small>{formatDayLabel(d.date)}</small></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
