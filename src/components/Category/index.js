import React, { Component } from "react";
import Link from "next/link";

import Carousel from "../Carousel";

import Works from "../../mocks/works.js";

class Category extends Component {
  render() {
    const { name, id, theme } = this.props;
    const works = Works.filter(w => w.categoryID === id);
    return (
      <section className={`category -${theme}`}>
        <h1 className="title">
          <Link href="/">
            <a>{name}</a>
          </Link>
        </h1>
        <div className="category-slider">
          <Carousel works={works}></Carousel>
          <div className="line"></div>
          <Link href="/">
            <a className="link">ver mais</a>
          </Link>
        </div>
      </section>
    );
  }
}

export default Category;
