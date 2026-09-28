import { featureItems } from "@/data/home";

export default function WhyEvents() {
  return (
    <section className="why-events">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <span className="section-eyebrow d-block">Why families love MPT Events Ayeda</span>
            <h2 className="why-events__title">
              Nurturing Young Hearts, Growing Little Explorers with <span>Big Dreams.</span>
            </h2>
            <p className="why-events__text">
              Our online classes are designed to make learning joyful, interactive, and engaging for young minds.
              Through playful activities, colorful visuals, and guided lessons, children learn at their own pace
              while building confidence and curiosity every day.
            </p>
            <a className="btn btn-primary" href="#">Learn more</a>
          </div>
          <div className="col-lg-6">
            <div className="row g-4">
              {featureItems.map((item) => (
                <div className="col-6" key={item.label}>
                  <div className="feature-item">
                    <span className="feature-item__icon"><img src={item.icon} alt="" /></span>
                    <span className="feature-item__label">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
