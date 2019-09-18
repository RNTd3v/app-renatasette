import React from "react";
import ActiveLink from "../../utils/ActiveLink";

const Navigation = ({ language = "en", isMobile }) => (
  <div className={`nav ${isMobile ? "-mobile" : ""}`}>
    <nav className="menu">
      <ul>
        <li>
          {language === "pt" ? (
            <ActiveLink
              href="/trabalhos/[categoryCode]"
              as={`/trabalhos/conteudo-de-marca-e-entretenimento`}
              activeClassName="active"
            >
              <a>Conteúdo de marcas & Entretenimento</a>
            </ActiveLink>
          ) : (
            <ActiveLink
              href="/works/[categoryCode]"
              as={`/works/branded-content-and-entertainment`}
              activeClassName="active"
            >
              <a>Branded Content & Entertainment</a>
            </ActiveLink>
          )}
        </li>
        <li>
          {language === "pt" ? (
            <ActiveLink
              href="/trabalhos/[categoryCode]"
              as={`/trabalhos/publicidade`}
              activeClassName="active"
            >
              <a>Publicidade</a>
            </ActiveLink>
          ) : (
            <ActiveLink
              href="/works/[categoryCode]"
              as={`/works/publicity`}
              activeClassName="active"
            >
              <a>Publicity</a>
            </ActiveLink>
          )}
        </li>
        <li>
          {language === "pt" ? (
            <ActiveLink
              href="/trabalhos/[categoryCode]"
              as={`/trabalhos/documentarios`}
              activeClassName="active"
            >
              <a>Documentários</a>
            </ActiveLink>
          ) : (
            <ActiveLink
              href="/works/[categoryCode]"
              as={`/works/documentaries`}
              activeClassName="active"
            >
              <a>Documentaries</a>
            </ActiveLink>
          )}
        </li>
        <li>
          {language === "pt" ? (
            <ActiveLink
              href="/trabalhos/[categoryCode]"
              as={`/trabalhos/ficcao`}
              activeClassName="active"
            >
              <a>Ficção</a>
            </ActiveLink>
          ) : (
            <ActiveLink
              href="/works/[categoryCode]"
              as={`/works/fiction`}
              activeClassName="active"
            >
              <a>Fiction</a>
            </ActiveLink>
          )}
        </li>
        <li>
          {language === "pt" ? (
            <ActiveLink href="/projetos" activeClassName="active">
              <a>Projetos</a>
            </ActiveLink>
          ) : (
            <ActiveLink href="/projects" activeClassName="active">
              <a>Projects</a>
            </ActiveLink>
          )}
        </li>
        <li>
          {language === "pt" ? (
            <ActiveLink href="/biografia" activeClassName="active">
              <a>Bio</a>
            </ActiveLink>
          ) : (
            <ActiveLink href="/bio" activeClassName="active">
              <a>Bio</a>
            </ActiveLink>
          )}
        </li>
      </ul>
    </nav>
  </div>
);

export default Navigation;
