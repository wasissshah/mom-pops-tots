import type { Settings } from "react-slick";
import CardsCarousel from "@/components/ui/CardsCarousel";
import DoodleSection from "@/components/ui/DoodleSection";
import { tools } from "@/data/home";

const settings: Settings = {
  slidesToShow: 7,
  slidesToScroll: 7,
  infinite: false,
  responsive: [
    { breakpoint: 1400, settings: { slidesToShow: 5, slidesToScroll: 5 } },
    { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    { breakpoint: 576, settings: { slidesToShow: 2, slidesToScroll: 2 } },
  ],
};

export default function Tools() {
  return (
    <DoodleSection className="tools">
      <img className="doodle tools__doodle tools__doodle--mobile" src="/assets/images/mobile.svg" alt="" />
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">Tools</span>
          <h2 className="section-title section-title--center">Popular Tools</h2>
        </div>

        <CardsCarousel
          settings={settings}
          slideCount={tools.length}
          sliderClassName="tools__grid tools__slider"
          dotsClassName="tools__dots"
          prevClassName="tools__prev"
          nextClassName="tools__next"
        >
          {tools.map((tool, i) => (
            <a className="tool-item" href="#" key={i}>
              <span className="tool-item__pebble"><img src={tool.icon} alt="" /></span>
              <span className="tool-item__label">{tool.label}</span>
            </a>
          ))}
        </CardsCarousel>

        <div className="text-center mt-3 mt-md-4">
          <a className="btn btn-primary btn-primary--green" href="#">View all tools</a>
        </div>
      </div>
    </DoodleSection>
  );
}
