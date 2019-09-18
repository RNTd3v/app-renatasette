import React, { Component } from "react";
import Slider from "react-slick";

import Picture from "../Picture";

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
    const { works, language } = this.props;
    return (
      <Slider {...settings}>
        {works.map((w, i) => (
          <div className="work" key={i}>
            {language === "en" ? (
              <Picture
                src={w.picture}
                title={w.nameEN}
                text={w.descriptionEN}
                link={w.codeEN}
              />
            ) : (
              <Picture
                src={w.picture}
                title={w.namePT}
                text={w.descriptionPT}
                link={w.codePT}
              />
            )}
          </div>
        ))}
      </Slider>
    );
  }
}

export default Carousel;
