import React from "react";
import Slider from "react-slick";

import SliderMock from "../../mocks/slider";

export default function SliderHome(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  const slider = SliderMock;
  const { language } = props;
  return (
    <Slider {...settings} className="mainSlider">
      {slider.map((s, i) => (
        <div className="work" key={i}>
          <img src={s.picture} />
          <div className="subtitle">
            <span className="number">/ 0{i + 1}</span>{" "}
            {language === "en" ? s.titleEN : s.titlePT}
          </div>
        </div>
      ))}
    </Slider>
  );
}
