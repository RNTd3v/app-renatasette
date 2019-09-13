import React, { Component } from "react";
import Link from "next/link";

class Logo extends Component {
  render() {
    const { isMobile } = this.props;
    return (
      <h1 className={`logo ${isMobile ? "-isMobile" : ""}`}>
        <Link href="/">
          <a>
            <span>
              Renata <strong>Sette</strong>
            </span>
          </a>
        </Link>
      </h1>
    );
  }
}

export default Logo;
