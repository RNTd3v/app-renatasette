import React, { Component } from "react";

// Components
import Logo from "../Logo";
import Navigation from "../Navigation";
import SocialMedia from "../SocialMedia";
import Language from "../Language";
import MenuMobile from "../MenuMobile";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      scrolled: false,
      isMobile: false
    };
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", e => this.onScroll(e), false);
    if (window.outerWidth <= 1024) {
      this.setState({
        isMobile: true
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", e => this.onScroll(e), false);
  }

  onScroll = e => {
    this.setState({
      scrolled: e.currentTarget.pageYOffset > window.outerHeight
    });
  };

  render() {
    const { scrolled, isMobile } = this.state;
    return (
      <header className={`header ${scrolled ? "-scrolled" : ""}`}>
        {isMobile ? <MenuMobile /> : null}
        <Logo isMobile={isMobile} />
        {!isMobile ? <Navigation language="en" /> : null}
        <div className="another">
          {!isMobile ? <SocialMedia /> : null}
          <Language pt="/" en="/" active="en" />
        </div>
      </header>
    );
  }
}

export default Header;
