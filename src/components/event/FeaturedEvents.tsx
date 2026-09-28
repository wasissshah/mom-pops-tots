import Select2 from "@/components/ui/Select2";
import { cardV2Items } from "@/data/home";

export default function FeaturedEvents() {
  return (
    <section className="events">
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">Upcoming Events</span>
          <h2 className="section-title section-title--center">Featured Events</h2>
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

        <div className="thumbnails">
          {cardV2Items.map((item, i) => (
            <a className="card-v2" href="#" key={i}>
              <div className="card-v2__media">
                <img src={item.img} alt="" />
                <span className="tag tag--green card-v2__status">{item.status}</span>
                <span className="card-v2__date"><strong>{item.date}</strong><small>Aug</small></span>
              </div>
              <span className="card-v2__cat">{item.cat}</span>
              <h3 className="card-v2__title">{item.title}</h3>
              <p className="card-v2__text">{item.text}</p>
              <p className="card-v2__place"><svg><use href="#i-pin" /></svg> {item.place}</p>
            </a>
          ))}
        </div>

        <div className="text-center mt-3 mt-md-4">
          <a className="btn btn-primary btn-primary--green" href="#">View all events</a>
        </div>
      </div>
    </section>
  );
}
