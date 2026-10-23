import DoodleSection from "@/components/ui/DoodleSection";

export default function Knowledge() {
  return (
    <DoodleSection className="knowledge">
      <img className="doodle knowledge__doodle knowledge__doodle--calculator" src="/assets/images/calculator.svg" alt="" />
      <img className="doodle knowledge__doodle knowledge__doodle--bulb" src="/assets/images/bulb2.svg" alt="" />
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="text-center text-lg-start col-lg-5">
            <img className="knowledge__logo" src="/assets/images/logo-left.png" alt="Moms Pops Tots" />
            <span className="section-eyebrow d-block mb-3">Knowledge &amp; Growth Zone</span>
            <p className="knowledge__text">
              The <strong>Knowledge &amp; Growth Zone</strong> is your resource for trusted, expert-backed information
              on parenting, child development, and education. Explore our dedicated hubs for Homeschooling and
              Islamic learning, providing the insights you need to guide your family&apos;s journey.
            </p>
          </div>
          <div className="col-lg-7">
            <div className="row g-4">
              <div className="col-md-6">
                <a className="knowledge__item" href="#">
                  <div className="pebble-img pebble-img--green"><img src="/assets/images/hero1.jpg" alt="" /></div>
                  <span className="knowledge__title">Dedicated Homeschooling</span>
                  <span className="knowledge__subtitle">Dedicated Homeschooling &amp;<br /> Education Hub</span>
                </a>
              </div>
              <div className="col-md-6">
                <a className="knowledge__item" href="#">
                  <div className="pebble-img pebble-img--green">
                    <img src="/assets/images/hero3.jpg" alt="" />
                    <span className="knowledge__play"><img src="/assets/images/play-icon-outline.svg" alt="" width={14} height={14} /></span>
                  </div>
                  <span className="knowledge__title">The Little Momins</span>
                  <span className="knowledge__subtitle knowledge__subtitle--bold">Islamic Knowledge for Children</span>
                  <span className="knowledge__meta">A story for ages 4-7.</span>
                  <span className="knowledge__subtitle">The Kindness of the Prophet</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DoodleSection>
  );
}
