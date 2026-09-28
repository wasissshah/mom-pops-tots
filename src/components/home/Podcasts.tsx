import type { Settings } from "react-slick";
import CardsCarousel from "@/components/ui/CardsCarousel";
import DoodleSection from "@/components/ui/DoodleSection";
import { podcasts } from "@/data/home";

const settings: Settings = {
  slidesToShow: 4,
  infinite: false,
  responsive: [
    { breakpoint: 1400, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

export default function Podcasts() {
  return (
    <DoodleSection className="podcasts">
      <img className="doodle podcasts__doodle podcasts__doodle--camera" src="/assets/images/movie-camera.svg" alt="" />
      <img className="doodle podcasts__doodle podcasts__doodle--mic" src="/assets/images/mic-green.svg" alt="" />
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">Explore more tips and advice</span>
          <h2 className="section-title section-title--center">Featured &amp; Live Podcasts</h2>
        </div>

        <CardsCarousel
          settings={settings}
          slideCount={podcasts.length}
          sliderClassName="podcasts__slider"
          dotsClassName="podcasts__dots"
          prevClassName="podcasts__prev"
          nextClassName="podcasts__next"
        >
          {podcasts.map((p, i) => (
            <div className="podcasts__slide" key={i}>
              <a className="podcast-card" href="#">
                <img className="podcast-card__img" src={p.img} alt="" />
                <span className="tag tag--white podcast-card__cat">{p.cat}</span>
                <div className="podcast-card__body">
                  <div className="podcast-card__content">
                    <div className="podcast-card__meta">{p.episode} <span className="podcast-card__dot" /> {p.duration}</div>
                    <h3 className="podcast-card__title">{p.title}</h3>
                  </div>
                  <div className="podcast-card__side">
                    <span className="podcast-card__by text-truncate">By<br />{p.by}</span>
                    <span className="podcast-card__play"><img src="/assets/images/play-icon-outline.svg" alt="" width={14} height={14} /></span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </CardsCarousel>

        <div className="text-center mt-3 mt-md-4">
          <a className="btn btn-primary btn-primary--green" href="#">View more episodes</a>
        </div>
      </div>
    </DoodleSection>
  );
}
