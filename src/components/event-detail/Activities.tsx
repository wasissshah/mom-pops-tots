import { activities } from "@/data/eventDetail";

export default function Activities() {
  return (
    <section className="event-detail__block">
      <div className="text-center"><h2 className="section-title section-title--center">Activities</h2></div>
      {activities.map((activity, i) => (
        <div key={activity.title}>
          <div className="activity">
            <h3 className="activity__title">{activity.title}</h3>
            <p className="activity__text">{activity.text}</p>
            <p className="activity__meta">Instructor: <strong>{activity.instructor}</strong> Duration: <strong>{activity.duration}</strong></p>
            <span className="activity__label">Available Slots</span>
            <div className="row g-2">
              {activity.slots.map((slot) => (
                <div className="col-4" key={slot.time}>
                  <span className={`slot${slot.full ? " slot--full" : ""}`}>{slot.time}<small>{slot.note}</small></span>
                </div>
              ))}
            </div>
          </div>
          {i < activities.length - 1 && <hr className="divider-gradient" />}
        </div>
      ))}
    </section>
  );
}
