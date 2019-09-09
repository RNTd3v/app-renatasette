import React, { Component } from "react";
import Slider from "react-slick";

class SliderHome extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings} className="mainSlider">
        <div className="work">
          <img src="/static/img/renata-photo-1.jpg" />
          <div className="subtitle">
            <span className="number">/ 01</span> Legenda
          </div>
        </div>
        <div className="work">
          <img src="/static/img/renata-photo-2.jpg" />
          <div className="subtitle">
            <span className="number">/ 02</span> Legenda
          </div>
        </div>
        <div className="work">
          <img src="/static/img/renata-photo-3.jpg" />
          <div className="subtitle">
            <span className="number">/ 03</span> Legenda
          </div>
        </div>
      </Slider>
    );
  }
}

export default SliderHome;
