import React, { Component } from "react";
import Slider from "react-slick";

import Picture from '../Picture';

class Carousel extends Component {
  render() {
    const settings = {
      dots: true,
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
            <Picture src={w.picture} title={w.namePT} text={w.descriptionPT} link="" />
          </div>
        ))}
      </Slider>
    );
  }
}

export default Carousel;
