import type { Settings } from "react-slick";
import CardsCarousel from "@/components/ui/CardsCarousel";
import DoodleSection from "@/components/ui/DoodleSection";
import { offers } from "@/data/home";

const settings: Settings = {
  slidesToShow: 2.2,
  infinite: false,
  responsive: [{ breakpoint: 992, settings: { slidesToShow: 1, slidesToScroll: 1 } }],
};

export default function Offers() {
  return (
    <DoodleSection className="offers">
      <img className="doodle offers__doodle offers__doodle--card" src="/assets/images/card.svg" alt="" />
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">Family Offers</span>
          <h2 className="section-title section-title--center">Family Savings &amp; Exclusive Perks</h2>
        </div>

        <CardsCarousel
          settings={settings}
          slideCount={offers.length}
          sliderClassName="offers__slider"
          dotsClassName="offers__dots"
          prevClassName="offers__prev"
          nextClassName="offers__next"
        >
          {offers.map((offer, i) => (
            <div className="offers__slide" key={i}>
              <div className="offer">
                <div className="offer__media">
                  <div className="pebble-img pebble-img--yellow"><img src={offer.img} alt="" /></div>
                  <span className="tag">Education</span>
                </div>
                <div className="offer__body">
                  <img className="offer__logo" src="/assets/images/ad-logo.png" alt="" />
                  <h3 className="offer__name">{offer.name}</h3>
                  <p className="offer__deal">{offer.deal}</p>
                  <a className="btn btn-primary" href="#"><img src="/assets/images/discount.svg" alt=""/>Click to <span>reveal discount code</span></a>
                </div>
              </div>
            </div>
          ))}
        </CardsCarousel>

        <div className="text-center mt-3 mt-md-4">
          <a className="btn btn-primary btn-primary--green" href="#">View more offers</a>
        </div>
      </div>
    </DoodleSection>
  );
}
