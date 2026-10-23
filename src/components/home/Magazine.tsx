import type { Settings } from "react-slick";
import CardsCarousel from "@/components/ui/CardsCarousel";
import DoodleSection from "@/components/ui/DoodleSection";
import { magazineFeatured, magazineMore } from "@/data/home";

const settings: Settings = {
  slidesToShow: 4,
  infinite: false,
  responsive: [
    { breakpoint: 1400, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

export default function Magazine() {
  return (
    <DoodleSection className="magazine">
      <img className="doodle magazine__doodle magazine__doodle--paper" src="/assets/images/paper-green.svg" alt="" />
      <img className="doodle magazine__doodle magazine__doodle--camera" src="/assets/images/camera.svg" alt="" />
      <img className="doodle magazine__doodle magazine__doodle--globe" src="/assets/images/globe.svg" alt="" />
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">E-Magazine</span>
          <h2 className="section-title section-title--center">Stay Informed and be Inspired</h2>
        </div>

        <p className="magazine__label">Featured articles</p>
        <div className="row g-4 mb-5 pb-4">
          {magazineFeatured.map((item, i) => (
            <div className={i === 1 ? "d-none d-lg-flex col-lg-6" : "col-lg-6"} key={i}>
              <article className="magazine__featured">
                <img className="article-img article-img--pink" src={item.img} alt="" />
                <div className="magazine__body">
                  <div className="article-meta"><span>News</span><span>5 min read</span></div>
                  <h3 className="article-title">{item.title}</h3>
                  <p className="article-text">{item.text}</p>
                  <hr className="divider-gradient" />
                  <a className="link-arrow" href="#">Read more <img src="/assets/images/arrow-line-dark.svg" alt="" /></a>
                </div>
              </article>
            </div>
          ))}
        </div>
        <p className="magazine__label">More articles</p>
        <CardsCarousel
          settings={settings}
          slideCount={magazineMore.length}
          sliderClassName="magazine__slider"
          dotsClassName="magazine__dots"
          prevClassName="magazine__prev"
          nextClassName="magazine__next"
        >
          {magazineMore.map((item, i) => (
            <div className="magazine__slide" key={i}>
              <a className="card-v1" href="#">
                <img className="article-img" src={item.img} alt="" />
                <div className="card-body">
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
          <a className="btn btn-primary btn-primary--green" href="#">View all articles</a>
        </div>
      </div>
    </DoodleSection>
  );
}
