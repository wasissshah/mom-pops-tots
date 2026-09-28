"use client";

import type { Settings } from "react-slick";
import CardsCarousel from "@/components/ui/CardsCarousel";
import DoodleSection from "@/components/ui/DoodleSection";
import Select2 from "@/components/ui/Select2";
import type { TribeItem } from "@/data/home";

type Doodle = { src: string; className: string };

type TribeSectionProps = {
  eyebrow?: string;
  title?: string;
  items: TribeItem[];
  variant?: "s2";
  doodles?: Doodle[];
  filterPlaceholder?: string;
  cta?: { label: string; href?: string };
  showMeta?: boolean;
};

const settings: Settings = {
  slidesToShow: 4,
  infinite: false,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};

export default function TribeSection({
  eyebrow,
  title,
  items,
  variant,
  doodles,
  filterPlaceholder,
  cta,
  showMeta,
}: TribeSectionProps) {
  const sectionClassName = `tribe${variant ? ` ${variant}` : ""}`;

  const body = (
    <>
      {doodles?.map((d) => (
        <img className={`doodle tribe__doodle ${d.className}`} src={d.src} alt="" key={d.src} />
      ))}
      <div className="container">
        {(eyebrow || title) && (
          <div className="text-center">
            {eyebrow && <span className="section-eyebrow d-block">{eyebrow}</span>}
            {title && <h2 className="section-title section-title--center">{title}</h2>}
          </div>
        )}
        {filterPlaceholder && (
          <div className="events__filters">
            <Select2 className="select-outline" data-placeholder={filterPlaceholder} aria-label={filterPlaceholder} defaultValue="">
              <option />
            </Select2>
          </div>
        )}
      </div>
      <div className="container">
        <CardsCarousel
          settings={settings}
          slideCount={items.length}
          sliderClassName="tribe__slider"
          dotsClassName="tribe__dots"
          prevClassName="tribe__prev"
          nextClassName="tribe__next"
        >
          {items.map((item, i) => (
            <a className="tribe__item" href="#" key={i}>
              <div className={`pebble-img pebble-img--${item.variant}`}><img src={item.img} alt="" /></div>
              <h3 className="tribe__title">{item.title}</h3>
              {showMeta && <h5 className="tribe__title date">Saturday, 18 2026</h5>}
              {showMeta && (
                <p className="tribe__text d-flex justify-content-center align-items-center gap-1">
                  <img src="/assets/images/pin-icon.svg" alt="" /> Jumeirah Beach Park
                </p>
              )}
              {showMeta && <span className="tag tag--green">Deira</span>}
              {!showMeta && item.text && <p className="tribe__text">{item.text}</p>}
            </a>
          ))}
        </CardsCarousel>
        {cta && (
          <div className="text-center mt-3 mt-md-4">
            <a className="btn btn-primary btn-primary--green" href={cta.href ?? "#"}>{cta.label}</a>
          </div>
        )}
      </div>
    </>
  );

  if (doodles) {
    return <DoodleSection className={sectionClassName}>{body}</DoodleSection>;
  }

  return <section className={sectionClassName}>{body}</section>;
}
