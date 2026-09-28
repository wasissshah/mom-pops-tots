"use client";

import { useState } from "react";
import type { Settings } from "react-slick";
import CardsCarousel from "@/components/ui/CardsCarousel";
import DoodleSection from "@/components/ui/DoodleSection";
import { recommendationFilters, recommendationsCards } from "@/data/home";

const settings: Settings = {
  slidesToShow: 4,
  infinite: false,
  responsive: [
    { breakpoint: 1400, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

export default function Recommendations() {
  const [active, setActive] = useState(recommendationFilters[0]);

  return (
    <DoodleSection className="recommendations">
      <img className="doodle recommendations__doodle recommendations__doodle--thumb" src="/assets/images/thumb.svg" alt="" />
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">Reviews</span>
          <h2 className="section-title section-title--center">Our Recommendations</h2>
          <div className="recommendations__filters mb-3">
            {recommendationFilters.map((filter) => (
              <button
                key={filter}
                className={`chip${active === filter ? " is-active" : ""}`}
                type="button"
                onClick={() => setActive(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <CardsCarousel
          settings={settings}
          slideCount={recommendationsCards.length}
          sliderClassName="recommendations__slider"
          dotsClassName="recommendations__dots"
          prevClassName="recommendations__prev"
          nextClassName="recommendations__next"
        >
          {recommendationsCards.map((item, i) => (
            <div className="recommendations__slide" key={i}>
              <a className="card-v1" href="#">
                <img className="article-img" src={item.img} alt="" />
                <div className="card-body">
                  <span className="tag">Highly Recommended</span>
                  <div className="article-meta"><span>News</span><span>5 min read</span></div>
                  <h3 className="article-title">{item.title}</h3>
                  <p className="article-text">{item.text}</p>
                  <hr className="divider-gradient" />
                  <span className="link-arrow">Read more <img src="/assets/images/arrow-line-dark.svg" alt="" /></span>
                </div>
              </a>
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
