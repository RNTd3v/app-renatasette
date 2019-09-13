import React, { Component } from "react";
import Link from "next/link";

import Carousel from "../Carousel";
import Picture from "../Picture";

import Works from "../../mocks/works.js";

class Category extends Component {
  constructor() {
    super();
    this.state = {
      isMobile: false
    };
  }
  componentDidMount() {
    if (window.outerWidth <= 1024) {
      this.setState({
        isMobile: true
      });
    }
  }
  render() {
    const { name, id } = this.props;
    const { isMobile } = this.state;
    const works = Works.filter(w => w.categoryID === id);
    return (
      <section className={`category`}>
        <h1 className="title">
          <Link href="/">
            <a>{name}</a>
          </Link>
        </h1>
        <div className="category-slider">
          {isMobile ? (
            <>
              {works.slice(0, 2).map((w, i) => (
                <div className="work" key={i}>
                  <Picture
                    src={w.picture}
                    title={w.namePT}
                    text={w.descriptionPT}
                    link=""
                  />
                </div>
              ))}
            </>
          ) : (
            <Carousel works={works}></Carousel>
          )}
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
