"use client";

import { useState } from "react";
import type { Settings } from "react-slick";
import CardsCarousel from "@/components/ui/CardsCarousel";
import DoodleSection from "@/components/ui/DoodleSection";
import { voteCards, voteFilters } from "@/data/home";
import { useCountdown } from "@/hooks/useCountdown";

const settings: Settings = {
  slidesToShow: 2.5,
  infinite: false,
  responsive: [
    { breakpoint: 1400, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 992, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

export default function Vote() {
  const [active, setActive] = useState(voteFilters[0]);
  const countdown = useCountdown(10, 16, 34, 10);

  return (
    <DoodleSection className="vote">
      <img className="doodle vote__doodle vote__doodle--sun" src="/assets/images/sun.svg" alt="" />
      <img className="doodle vote__doodle vote__doodle--star" src="/assets/images/star.svg" alt="" />
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">Annual MPT Awards</span>
          <h2 className="section-title section-title--center">Cast Your Vote Now</h2>
        </div>

        <div className="vote__countdown">
          <span className="vote__countdown-label">Voting Ends In</span>
          <div className="vote__timer">
            <div className="vote__timer-unit">
              <span className="vote__timer-pebble"><strong>{countdown.days}</strong></span>
              <small>Days</small>
            </div>
            <span className="vote__timer-sep">:</span>
            <div className="vote__timer-unit">
              <span className="vote__timer-pebble"><strong>{countdown.hours}</strong></span>
              <small>Hrs</small>
            </div>
            <span className="vote__timer-sep">:</span>
            <div className="vote__timer-unit">
              <span className="vote__timer-pebble"><strong>{countdown.minutes}</strong></span>
              <small>Mins</small>
            </div>
            <span className="vote__timer-sep">:</span>
            <div className="vote__timer-unit">
              <span className="vote__timer-pebble"><strong>{countdown.seconds}</strong></span>
              <small>Sec</small>
            </div>
          </div>
        </div>

        <div className="vote__filters">
          {voteFilters.map((filter) => (
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

        <CardsCarousel
          settings={settings}
          slideCount={voteCards.length}
          sliderClassName="vote__slider"
          dotsClassName="vote__dots"
          prevClassName="vote__prev"
          nextClassName="vote__next"
        >
          {voteCards.map((card, i) => (
            <div className="vote__slide" key={i}>
              <div className={`vote-card vote-card--${card.variant}`}>
                <div className={`pebble-img pebble-img--${card.variant} vote-card__img`}><img src={card.img} alt="" /></div>
                <div className="vote-card__body">
                  <span className="tag vote-card__featured"><img src="/assets/images/star-fill.svg" alt="" width={12} height={12}/> Featured</span>
                  <h3 className="vote-card__title">{card.title}</h3>
                  <p className="vote-card__text">{card.text}</p>
                  <a
                    className={`btn btn-primary vote-card__vote${card.variant === "green" ? " btn-primary--green" : ""}`}
                    href="#"
                  >
                    Vote now <img src="/assets/images/arrow-line.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </CardsCarousel>

        <div className="text-center mt-3 mt-md-4">
          <a className="btn btn-primary btn-primary--green" href="#">View more</a>
        </div>
      </div>
    </DoodleSection>
  );
}
