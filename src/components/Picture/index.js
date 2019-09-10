import React, { Component } from "react";
import Link from "next/link";

class Picture extends Component {
  render() {
    const { src, link, text, title } = this.props;
    return (
      <figure className="picture">
        <img src={src} alt={title} className="image" />
        <figcaption>
          <div className="textWrapper">
            <h2 className="title">{title}</h2>
            <p className="text">{text}</p>
          </div>
          <Link href={link}>
            <a className="link">ver mais</a>
          </Link>
        </figcaption>
      </figure>
    );
  }
}

export default Picture;
