import type { Settings } from "react-slick";
import CardsCarousel from "@/components/ui/CardsCarousel";
import DoodleSection from "@/components/ui/DoodleSection";
import { businesses } from "@/data/home";

const settings: Settings = {
  slidesToShow: 5,
  infinite: false,
  responsive: [
    { breakpoint: 1400, settings: { slidesToShow: 4, slidesToScroll: 4 } },
    { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

export default function Directory() {
  return (
    <DoodleSection className="directory">
      <img className="doodle directory__doodle directory__doodle--bird" src="/assets/images/bird.svg" alt="" />
      <img className="doodle directory__doodle directory__doodle--book" src="/assets/images/book.svg" alt="" />
      <img className="doodle directory__doodle directory__doodle--pencil" src="/assets/images/pencil.svg" alt="" />
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">Directory</span>
          <h2 className="section-title section-title--center">Business Directory</h2>
        </div>

        <CardsCarousel
          settings={settings}
          slideCount={businesses.length}
          sliderClassName="directory__slider"
          dotsClassName="directory__dots"
          prevClassName="directory__prev"
          nextClassName="directory__next"
        >
          {businesses.map((biz, i) => (
            <div className="directory__slide" key={i}>
              <article className="business-card">
                <span className="tag business-card__featured"><svg><use href="#i-star" /></svg> Featured</span>
                <img className="business-card__logo" src="/assets/images/ad-logo.png" alt="" />
                <h3 className="business-card__name">{biz.name}</h3>
                <p className={`business-card__category category--${biz.categoryColor}`}>{biz.category}</p>
                <p className="business-card__location">Oman<br />Muscat</p>
                <div className="business-card__links">
                  <a className="social-pebble social-pebble--blue" href="#" aria-label="Website"><img src="/assets/images/icon-globe.svg" alt="" width={20} height={20} /></a>
                  <a className="social-pebble social-pebble--instagram" href="#" aria-label="Instagram"><img src="/assets/images/instagram.svg" alt="" width={20} height={20} /></a>
                </div>
              </article>
            </div>
          ))}
        </CardsCarousel>

        <div className="text-center mt-3 mt-md-4">
          <a className="btn btn-primary btn-primary--green" href="#">View all candidates</a>
        </div>
      </div>
    </DoodleSection>
  );
}
