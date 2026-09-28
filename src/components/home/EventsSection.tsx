import DoodleSection from "@/components/ui/DoodleSection";
import Select2 from "@/components/ui/Select2";
import { eventListItems, featuredEvent } from "@/data/home";

export default function EventsSection() {
  return (
    <DoodleSection className="events">
      <img className="doodle events__doodle events__doodle--clock" src="/assets/images/clock.svg" alt="" />
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">Upcoming</span>
          <h2 className="section-title section-title--center">Events &amp; Exhibitions</h2>
        </div>
        <div className="events__filters">
          <Select2 className="select-outline" data-placeholder="Select Type" aria-label="Select type" defaultValue="">
            <option />
            <option>Events</option>
            <option>Exhibitions</option>
          </Select2>
          <Select2 className="select-outline select-outline--filter" data-placeholder="Filter" aria-label="Filter" defaultValue="">
            <option />
            <option>This week</option>
            <option>This month</option>
          </Select2>
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <article className="event-feature">
              <div className="event-feature__card">
                <div className="event-feature__photo">
                  <img src={featuredEvent.img} alt="" />
                  <span className="tag">Event</span>
                </div>
                <div className="event-feature__bar">
                  <div className="event-date">
                    <strong>{featuredEvent.day}</strong>
                    <span dangerouslySetInnerHTML={{ __html: featuredEvent.date }} />
                  </div>
                  <a className="btn btn-primary" href="#">RSVP Now</a>
                </div>
              </div>
              <h3 className="event-feature__title">{featuredEvent.title}</h3>
              <p className="event-feature__text">{featuredEvent.text}</p>
              <hr className="divider-gradient" />
              <ul className="event-feature__meta">
                <li><img src="/assets/images/clock-icon.svg" alt="" width={16} height={16} /> {featuredEvent.time}</li>
                <li><img src="/assets/images/pin-icon.svg" alt="" width={16} height={16} /> {featuredEvent.place}</li>
              </ul>
            </article>
          </div>
          <div className="col-lg-6">
            <div className="events__list">
              {eventListItems.map((item, i) => (
                <a className="event-item" href="#" key={i}>
                  <div className="event-item__thumb"><img src={item.img} alt="" /><span className="tag">Event</span></div>
                  <div className="event-item__body">
                    <h4 className="event-item__title">{item.title}</h4>
                    <hr className="divider-gradient" />
                    <div className="event-item__foot">
                      <div className="event-date">
                        <strong>{item.day}</strong>
                        <span>
                          {item.date.split("\n").map((line, li, arr) => (
                            <span key={li}>
                              {line}
                              {li < arr.length - 1 && <br />}
                            </span>
                          ))}
                        </span>
                      </div>
                      <span className="link-arrow">Explore <img src="/assets/images/arrow-line-dark.svg" alt="" /></span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-3 mt-md-4">
          <a className="btn btn-primary btn-primary--green" href="#">View all events</a>
        </div>
      </div>
    </DoodleSection>
  );
}
