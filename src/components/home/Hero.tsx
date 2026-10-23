"use client";

import { Fragment, useRef, useState } from "react";
import SlickSlider from "react-slick";
import type { Settings } from "react-slick";
import type { ReactNode } from "react";
import { heroArticles, heroSlides } from "@/data/home";
import { getHomeBanners, type HomeBanner } from "@/api/home";
import { useApi } from "@/hooks/useApi";
import HeroSkeleton from "@/components/skeletons/HeroSkeleton";

type Slide = {
  image: string;
  video?: string;
  eyebrow: ReactNode;
  title: ReactNode;
  text: ReactNode;
  doodles: { src: string; className: string }[];
  showCards: boolean;
};

// Like the static design: two lines (break before the last two words) with the last word highlighted
// ("Stay Informed and <br>be <span>Inspired</span>").
// If the backend title already contains <br>, those breaks are used instead of the automatic one.
const BR = /<br\s*\/?>|&lt;br\s*\/?&gt;|\r?\n/i; // real <br>, HTML-escaped <br>, or a plain new line

function renderTitle(title: string): ReactNode {
  if (BR.test(title.trim())) {
    const lines = title.trim().split(new RegExp(BR.source, "gi")).map((l) => l.trim()).filter(Boolean);
    const lastLine = lines[lines.length - 1].split(/\s+/);
    const lastWord = lastLine.pop();
    return lines.map((line, i) =>
      i < lines.length - 1 ? (
        <Fragment key={i}>{line}<br /></Fragment>
      ) : (
        <Fragment key={i}>{lastLine.length ? `${lastLine.join(" ")} ` : ""}<span>{lastWord}</span></Fragment>
      ),
    );
  }

  const words = title.trim().split(/\s+/);
  if (words.length < 2) return title;
  const last = words.pop();
  const head = words.length > 1 ? words.slice(0, -1).join(" ") : "";
  const second = words.length > 1 ? words[words.length - 1] : words[0];
  return [
    head && <Fragment key="head">{head}<br /></Fragment>,
    `${second} `,
    <span key="sp">{last}</span>,
  ];
}

function bannerToSlide(banner: HomeBanner, i: number): Slide {
  const fallback = heroSlides[i % heroSlides.length];
  const isVideo = banner.media?.kind === "video";
  return {
    image: !isVideo && banner.media?.url ? banner.media.url : fallback.image,
    video: isVideo ? banner.media?.url : undefined,
    eyebrow: banner.subtitle ?? "",
    title: renderTitle(banner.title),
    text: banner.description ?? "",
    // API doodles are null for now -> keep design doodles
    doodles: fallback.doodles,
    showCards: fallback.showCards,
  };
}

const settings: Settings = {
  fade: true,
  dots: false,
  arrows: false,
};

export default function Hero() {
  const sliderRef = useRef<SlickSlider>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const { data: banners, loading } = useApi(getHomeBanners, "Hero banners");

  // API slides when loaded; on failure (error is logged by useApi) fall back to the static design
  const slides: Slide[] = banners?.length ? banners.map(bannerToSlide) : (heroSlides as Slide[]);

  if (loading) return <HeroSkeleton />;

  return (
    <section className="hero">
      <div className="hero__slider">
        <SlickSlider
          ref={sliderRef}
          {...settings}
          beforeChange={(_, next) => {
            setCurrent(next);
            setTick((t) => t + 1);
          }}
        >
          {slides.map((slide, i) => (
            <div key={i}>
            <div
              className={`hero__slide${slide.video ? " hero__slide--video" : ""} hero__slide__${i+1}`}
              style={{ backgroundImage: `url('${slide.image}')` }}
            >
              {slide.video && (
                <video className="hero__video" src={slide.video} poster={slide.image} autoPlay muted loop playsInline />
              )}
              {slide.doodles.map((doodle) => (
                <img className={`hero__doodle ${doodle.className}`} src={doodle.src} alt="" key={doodle.src} />
              ))}
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-xxl-6">
                    <span className="hero__eyebrow">{slide.eyebrow}</span>
                    <h1 className="hero__title">{slide.title}</h1>
                    <p className="hero__text">{slide.text}</p>
                  </div>
                </div>
                {slide.showCards && (
                  <div className="cards">
                    <div className="row">
                      {heroArticles.map((article, j) => (
                        <div
                          className={
                            j === 0
                              ? "col-md-6 col-lg-4 offset-lg-2 col-xxl-4 offset-xxl-2 mb-2 mb-md-0"
                              : "col-md-6 col-lg-4 col-xxl-4"
                          }
                          key={j}
                        >
                          <a className="article-card" href="#">
                            <div className="pebble-img article-card__img"><img src={article.img} alt="" /></div>
                            <div>
                              <div className="article-meta"><span>News</span><span>5 min read</span></div>
                              <h3 className="article-card__title">{article.title}</h3>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="text-center bottom-btn-area">
                  <button className="btn btn-primary" type="button">{['View all articles', 'View All Podcasts', 'Attend Event'][i]}</button>
                </div>
              </div>
            </div>
            </div>
          ))}
        </SlickSlider>
      </div>
      <div className="hero__controls slider-controls">
        <button
          className="slider-arrow hero__arrow--prev"
          type="button"
          aria-label="Previous slide"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <img src="/assets/images/arrow-prev.svg" alt="" />
        </button>
        <div className="hero__dots">
          <ul className="slick-dots">
            {slides.map((_, i) => (
              <li key={i} className={i === current ? "slick-active" : ""}>
                <button type="button" onClick={() => sliderRef.current?.slickGoTo(i)}>{i + 1}</button>
              </li>
            ))}
          </ul>
        </div>
        <button
          className={`hero__timer is-running${paused ? " is-paused" : ""}`}
          type="button"
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          onClick={() => setPaused((p) => !p)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle className="hero__timer-track" cx="10" cy="10" r="9" />
            <circle
              key={tick}
              className="hero__timer-progress"
              cx="10"
              cy="10"
              r="9"
              onAnimationEnd={() => {
                if (!paused) sliderRef.current?.slickNext();
              }}
            />
            <path className="hero__timer-pause" d="M7 6.5V13.5M13 6.5V13.5" />
            <path className="hero__timer-play" d="M8 6.5L13.5 10L8 13.5Z" />
          </svg>
        </button>
        <button
          className="slider-arrow hero__arrow--next"
          type="button"
          aria-label="Next slide"
          onClick={() => sliderRef.current?.slickNext()}
        >
          <img src="/assets/images/arrow-next.svg" alt="" />
        </button>
      </div>
    </section>
  );
}
