import React, { Component } from "react";
import Link from "next/link";

import Logo from "../Logo";
import Navigation from "../Navigation";
import SocialMedia from "../SocialMedia";

class MenuMobile extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  }

  render() {
    const { isOpen } = this.state;
    return (
      <div className={`menu-mobile ${isOpen ? "-open" : ""}`}>
        <button className="bt-toggle" onClick={this.handleClick}>
          {isOpen ? (
            <i className="fas fa-times icon"></i>
          ) : (
            <i className="fas fa-bars icon"></i>
          )}
        </button>
        <div className="navigation-mobile">
          <Logo isMobile={true} />
          <Navigation language="en" isMobile={true} />
        </div>
      </div>
    );
  }
}

export default MenuMobile;
