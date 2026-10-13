import type { EventDetail } from "@/api/eventDetail";
import { formatSession } from "@/lib/eventDate";

// Activities and their slots come from `event.activities` (one slot per session).
export default function Activities({ event }: { event: EventDetail }) {
  const activities = (event.activities ?? []).filter((a) => a.schedule.some((day) => day.sessions.length));
  if (activities.length === 0) return null;

  return (
    <section className="event-detail__block">
      <div className="text-center"><h2 className="section-title section-title--center">Activities</h2></div>
      {activities.map((activity, i) => (
        <div key={activity.id}>
          <div className="activity">
            <h3 className="activity__title">{activity.title}</h3>
            {activity.description && <p className="activity__text">{activity.description}</p>}
            <p className="activity__meta">
              {activity.instructor && <>Instructor: <strong>{activity.instructor}</strong> </>}
              {activity.duration && <>Duration: <strong>{activity.duration}</strong></>}
            </p>
            <span className="activity__label">Available Slots</span>
            <div className="row g-2">
              {activity.schedule.flatMap((day) =>
                day.sessions.map((session) => {
                  const full = session.is_full || !session.bookable;
                  // day + time on the main line (same format as the sidebar), availability underneath
                  const note = full ? "Full" : session.places_left != null ? `${session.places_left} left` : "Available";
                  return (
                    <div className="col-4" key={session.id}>
                      <span className={`slot${full ? " slot--full" : ""}`}>
                        {formatSession(day.date, session.start, session.end)}
                        <small>{note}</small>
                      </span>
                    </div>
                  );
                }),
              )}
            </div>
          </div>
          {i < activities.length - 1 && <hr className="divider-gradient" />}
        </div>
      ))}
    </section>
  );
}
