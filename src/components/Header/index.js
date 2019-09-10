import React, { Component } from "react";

// Components
import Logo from "../Logo";
import Navigation from "../Navigation";
import SocialMedia from "../SocialMedia";
import Language from "../Language";

class Header extends Component {

  constructor() {
    super()
    this.state = { scrolled: false }
  }

  componentDidMount() {
    window.addEventListener("scroll", e => {
      this.setState({
        scrolled: e.currentTarget.pageYOffset > window.outerHeight
      })
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll");
  }
  render() {
    const { scrolled } = this.state;
    return (
      <header className={`header ${scrolled ? '-scrolled' : ''}`}>
        <Logo />
        <Navigation language="en" />
        <div className="another">
          <SocialMedia />
          <Language pt="/" en="/" active="en" />
        </div>
      </header>
    );
  }
}

export default Header;
