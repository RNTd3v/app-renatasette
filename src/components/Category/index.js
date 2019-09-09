import React, { Component } from "react";
import Slider from "react-slick";
import Link from "next/link";

class Category extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true
    };
    const { name } = this.props;
    return (
      <section className="category">
        <h1 className="title">
          <Link href="/">
            <a>{name}</a>
          </Link>
        </h1>
        <Slider {...settings} className="category-slider">
          <div className="work">
            <img src="/static/img/photo1.jpg" />
            <div className="subtitle">Legenda da foto</div>
          </div>
          <div className="work">
            <img src="/static/img/photo2.jpg" />
            <div className="subtitle">Legenda da foto</div>
          </div>
          <div className="work">
            <img src="/static/img/photo3.jpg" />
            <div className="subtitle">Legenda da foto</div>
          </div>
          <div className="work">
            <img src="/static/img/photo4.jpg" />
            <div className="subtitle">Legenda da foto</div>
          </div>
          <div className="work">
            <img src="/static/img/photo5.jpg" />
            <div className="subtitle">Legenda da foto</div>
          </div>
        </Slider>
      </section>
    );
  }
}

export default Category;
