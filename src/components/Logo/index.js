import React, { Component } from "react";
import Link from "next/link";

class Logo extends Component {
  render() {
    const { isMobile, language } = this.props;
    return (
      <h1 className={`logo ${isMobile ? "-isMobile" : ""}`}>
        {language === "en" ? (
          <Link href="/">
            <a>
              <span>
                Renata <strong>Sette</strong>
              </span>
              <small>
                Director
              </small>
            </a>
          </Link>
        ) : (
          <Link href="/principal">
            <a>
              <span>
                Renata <strong>Sette</strong>
              </span>
              <small>
                Diretora
              </small>
            </a>
          </Link>
        )}
      </h1>
    );
  }
}

export default Logo;
