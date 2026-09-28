"use client";

import { useState } from "react";
import type { Settings } from "react-slick";
import CardsCarousel from "@/components/ui/CardsCarousel";
import DoodleSection from "@/components/ui/DoodleSection";
import { communityCards } from "@/data/home";

const settings: Settings = {
  slidesToShow: 4,
  infinite: false,
  responsive: [
    { breakpoint: 1400, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 767, settings: { slidesToShow: 1 } },
  ],
};

export default function Community() {
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const items = filter === "featured" ? communityCards.filter((c) => c.featured) : communityCards;

  return (
    <DoodleSection className="community">
      <img className="doodle community__doodle community__doodle--jellyfish" src="/assets/images/jellyfish.svg" alt="" />
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">Community</span>
          <h2 className="section-title section-title--center">Find Your People. Raise Your Village.</h2>
          <div className="community__filters mb-4">
            <button className={`chip${filter === "all" ? " is-active" : ""}`} type="button" onClick={() => setFilter("all")}>All tribes</button>
            <button className={`chip${filter === "featured" ? " is-active" : ""}`} type="button" onClick={() => setFilter("featured")}>Featured</button>
          </div>
        </div>

        <CardsCarousel
          key={filter}
          settings={settings}
          slideCount={items.length}
          sliderClassName="community__slider"
          dotsClassName="community__dots"
          prevClassName="community__prev"
          nextClassName="community__next"
        >
          {items.map((card, i) => (
            <div
              className={`community__slide${i === 0 ? " community__slide--first" : ""}${
                i === items.length - 1 ? " community__slide--last" : ""
              }`}
              key={i}
            >
              <article
                className={`tribe-card tribe-card--${card.variant}`}
                style={{ zIndex: items.length - i }}
              >
                <div className="tribe-card__photo">
                  <img src="/assets/images/img1.jpg" alt="" />
                  {card.featured && (
                    <span className="tribe-card__featured"><svg><use href="#i-star" /></svg> Featured</span>
                  )}
                  <span className="tribe-card__cat">Culture &amp; Heritage</span>
                </div>
                <h3 className="tribe-card__title">British Mums Dubai</h3>
                <p className="tribe-card__text">
                  A cozy community for British mums living in Dubai. Share tips on schooling, expat life, and
                  everything in between &mdash; with a proper cuppa in hand.
                </p>
                <ul className="tribe-card__meta">
                  <li><svg><use href="#i-pin" /></svg> Dubai</li>
                  <li><svg><use href="#i-shield" /></svg> Validated group</li>
                </ul>
                <ul className="tribe-card__ages">
                  <li>0-2 years</li>
                  <li>3-5 years</li>
                  <li>6-10 years</li>
                </ul>
                <p className="tribe-card__members"><svg><use href="#i-users" /></svg> 1,240 members</p>
                <div className="tribe-card__actions">
                  <div>
                    <a className="social-pebble social-pebble--whatsapp" href="#" aria-label="WhatsApp"><img src="/assets/images/whatsapp.svg" alt="" width={20} height={20} /></a>
                    <a className="social-pebble social-pebble--facebook" href="#" aria-label="Facebook"><img src="/assets/images/facebook.svg" alt="" width={20} height={20} /></a>
                  </div>
                  <a className={`btn btn-primary btn-primary--${card.variant === "green" ? "green" : card.variant === "blue" ? "blue" : card.variant === "yellow" ? "yellow" : ""}`} href="#">Join this tribe</a>
                </div>
              </article>
            </div>
          ))}
        </CardsCarousel>

        <div className="text-center mt-3 mt-md-4">
          <a className="btn btn-primary btn-primary--green" href="#">Explore all tribes</a>
        </div>
      </div>
    </DoodleSection>
  );
}
