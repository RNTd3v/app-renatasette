import React, { useState, useEffect } from "react";

// Components
import Logo from "../Logo";
import Navigation from "../Navigation";
import SocialMedia from "../SocialMedia";
import Language from "../Language";
import MenuMobile from "../MenuMobile";

export default function Header(props) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  function handleScroll(e) {
    setScrolled(e.currentTarget.pageYOffset > window.outerHeight);
  }

  function checkIsMobile() {
    setIsMobile(window.outerWidth <= 1024);
  }

  useEffect(() => {
    checkIsMobile();
    window.addEventListener("scroll", e => handleScroll(e));
    return () => {
      window.removeEventListener("scroll", e => handleScroll(e));
    };
  }, []);

  const { language, pagePT, pageEN, isDynamic = null, asPT, asEN } = props;

  return (
    <header className={`header ${scrolled ? "-scrolled" : ""}`}>
      {isMobile ? <MenuMobile /> : null}
      <Logo isMobile={isMobile} language={language} />
      {!isMobile ? <Navigation language={language} /> : null}
      <div className="another">
        {!isMobile ? <SocialMedia /> : null}
        <Language
          pt={pagePT}
          en={pageEN}
          active={language}
          isDynamic={isDynamic}
          asPT={asPT}
          asEN={asEN}
        />
      </div>
    </header>
  );
}
