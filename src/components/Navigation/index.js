import React from "react";
import ActiveLink from "../../utils/ActiveLink";

const Navigation = ({ language = "en", isMobile }) => (
  <div className={`nav ${isMobile ? "-mobile" : ""}`}>
    <nav className="menu">
      <ul>
        <li>
          {language === "pt" ? (
            <ActiveLink href="/" activeClassName="active">
              <a>Branded Content & Entertainment</a>
            </ActiveLink>
          ) : (
            <ActiveLink href="/" activeClassName="active">
              <a>Branded Content & Entertainment</a>
            </ActiveLink>
          )}
        </li>
        <li>
          {language === "pt" ? (
            <ActiveLink href="/" activeClassName="active">
              <a>Publicidade</a>
            </ActiveLink>
          ) : (
            <ActiveLink href="/" activeClassName="active">
              <a>Publicidade</a>
            </ActiveLink>
          )}
        </li>
        <li>
          {language === "pt" ? (
            <ActiveLink href="/" activeClassName="active">
              <a>Documentários</a>
            </ActiveLink>
          ) : (
            <ActiveLink href="/" activeClassName="active">
              <a>Documentários</a>
            </ActiveLink>
          )}
        </li>
        <li>
          {language === "pt" ? (
            <ActiveLink href="/" activeClassName="active">
              <a>Ficção</a>
            </ActiveLink>
          ) : (
            <ActiveLink href="/" activeClassName="active">
              <a>Ficção</a>
            </ActiveLink>
          )}
        </li>
        <li>
          {language === "pt" ? (
            <ActiveLink href="/" activeClassName="active">
              <a>Projetos</a>
            </ActiveLink>
          ) : (
            <ActiveLink href="/" activeClassName="active">
              <a>Projetos</a>
            </ActiveLink>
          )}
        </li>
        <li>
          {language === "pt" ? (
            <ActiveLink href="/" activeClassName="active">
              <a>Bio</a>
            </ActiveLink>
          ) : (
            <ActiveLink href="/" activeClassName="active">
              <a>Bio</a>
            </ActiveLink>
          )}
        </li>
      </ul>
    </nav>
  </div>
);

export default Navigation;
