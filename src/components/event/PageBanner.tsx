import Link from "next/link";

type PageBannerProps = {
  sm?: boolean;
  showBar?: boolean;
};

export default function PageBanner({ sm, showBar }: PageBannerProps) {
  return (
    <section className={`page-banner${sm ? " sm" : ""}`}>
      <div className="left">
        <h3 className="title">Learning, Art, Sport &amp; Adventure</h3>
      </div>
      <div className="right">
        <h3 className="title month">August</h3>
        <h3 className="title date">26-29</h3>
        <p className="location text-uppercase">Manrat Al Saadiyat, Abu Dhabi</p>
      </div>

      <div className="page-banner__wrapper" style={{ backgroundImage: "url('/assets/images/event-banner.jpg')" }}>
        <h1 className="page-banner__title"><span>Kids Fun Day</span> Program</h1>
        {showBar && (
          <div className="page-banner__bar">
            <div className="container">
              <div className="d-md-flex align-items-center">
                <span className="page-banner__date"><strong>26 - 27</strong><small>Aug</small></span>
                <div className="page-banner__info">
                  <h2>Kids Fun Day Program</h2>
                  <p><svg><use href="#i-pin" /></svg> Manrat Al Saadiyat, Abu Dhabi</p>
                </div>
                <Link className="btn btn-primary" href="/event-detail">Buy tickets</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
