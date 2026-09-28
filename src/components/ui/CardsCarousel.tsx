"use client";

import { useRef, useState, type ReactNode } from "react";
import SlickSlider from "react-slick";
import type { Settings } from "react-slick";
import { computeDotCount } from "@/lib/slider";

type CardsCarouselProps = {
  settings: Settings;
  slideCount: number;
  children: ReactNode;
  sliderClassName?: string;
  controlsVariant?: string;
  dotsClassName?: string;
  prevClassName: string;
  nextClassName: string;
  middleContent?: ReactNode;
};

export default function CardsCarousel({
  settings,
  slideCount,
  children,
  sliderClassName,
  controlsVariant = "slider-controls--yellow",
  dotsClassName,
  prevClassName,
  nextClassName,
  middleContent,
}: CardsCarouselProps) {
  const sliderRef = useRef<SlickSlider>(null);
  const [current, setCurrent] = useState(0);

  const slidesToShow = settings.slidesToShow ?? 1;
  const slidesToScroll = settings.slidesToScroll ?? 1;
  const dotCount = computeDotCount(slideCount, slidesToShow, slidesToScroll, settings.infinite);
  const activeDot = Math.min(dotCount - 1, Math.round(current / slidesToScroll));

  return (
    <>
      <div className={sliderClassName}>
        <SlickSlider
          ref={sliderRef}
          {...settings}
          arrows={false}
          dots={false}
          beforeChange={(_, next) => setCurrent(next)}
        >
          {children}
        </SlickSlider>
      </div>

      <div className={`slider-controls ${controlsVariant}`}>
        <button
          className={`slider-arrow ${prevClassName}`}
          type="button"
          aria-label="Previous"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <img src="/assets/images/arrow-prev.svg" alt="" />
        </button>

        <div className={dotsClassName}>
          <ul className="slick-dots">
            {Array.from({ length: dotCount }).map((_, i) => (
              <li key={i} className={i === activeDot ? "slick-active" : ""}>
                <button
                  type="button"
                  onClick={() => sliderRef.current?.slickGoTo(i * slidesToScroll)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {middleContent}

        <button
          className={`slider-arrow ${nextClassName}`}
          type="button"
          aria-label="Next"
          onClick={() => sliderRef.current?.slickNext()}
        >
          <img src="/assets/images/arrow-next.svg" alt="" />
        </button>
      </div>
    </>
  );
}
