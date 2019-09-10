import React, { Component } from "react";
import Link from "next/link";

class Picture extends Component {
  render() {
    const { src, link, text, title } = this.props;
    return (
      <Link href={link}>
        <figure className="picture">
          <img src={src} alt={title} className="image" />
          <figcaption>
            <div className="textWrapper">
              <h2 className="title">{title}</h2>
              <p className="text">{text}</p>
            </div>
          </figcaption>
        </figure>
      </Link>
    );
  }
}

export default Picture;
