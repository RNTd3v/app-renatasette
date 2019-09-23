import React from "react";
import ActiveLink from "../../utils/ActiveLink";

import Loading from "../Loading";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_CATEGORIES = gql`
  query {
    categories {
      namePT
      nameEN
      codePT
      codeEN
      id
    }
  }
`;

export default function Navigation({ language = "en", isMobile }) {
  const { loading, error, data, fetchMore } = useQuery(GET_CATEGORIES);
  if (data && data.categories) {
    return (
      <div className={`nav ${isMobile ? "-mobile" : ""}`}>
        <nav className="menu">
          <ul>
            {data.categories.map((c, i) => (
              <li key={i}>
                {language === "en" ? (
                  <ActiveLink
                    href="/works/[categoryCode]"
                    as={`/works/${c.codeEN}`}
                    activeClassName="active"
                  >
                    <a>{c.nameEN}</a>
                  </ActiveLink>
                ) : (
                  <ActiveLink
                    href="/trabalhos/[categoryCode]"
                    as={`/trabalhos/${c.codePT}`}
                    activeClassName="active"
                  >
                    <a>{c.namePT}</a>
                  </ActiveLink>
                )}
              </li>
            ))}
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
  }
  return <Loading />;
}
