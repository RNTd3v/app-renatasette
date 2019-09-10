import React, { Component } from "react";
import Slider from "react-slick";

class Carousel extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: false,
      variableWidth: true
    };
    const { works } = this.props;
    return (
      <Slider {...settings}>
        {works.map((w, i) => (
          <div className="work" key={i}>
            <img src={w.picture} alt={w.namePT} />
            <div className="subtitle">{w.namePT}</div>
          </div>
        ))}
      </Slider>
    );
  }
}

export default Carousel;
