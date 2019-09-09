import React from "react";

// Components
import Logo from "../Logo";
import Navigation from "../Navigation";
import SocialMedia from "../SocialMedia";
import Language from "../Language";

const Header = () => (
  <header className="header">
    <Logo />
    <Navigation language="en" />
    <div className="another">
      <SocialMedia />
      <Language pt="/" en="/" active="en" />
    </div>
  </header>
);

export default Header;
