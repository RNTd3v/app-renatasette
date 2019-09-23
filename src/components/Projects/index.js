import React from "react";
import Link from "next/link";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Loading from "../Loading";

const GET_PROJECTS = gql`
  query {
    projects {
      namePT
      nameEN
      codePT
      codeEN
      descriptionPT
      descriptionEN
      picture
      id
    }
  }
`;

export default function Project({ language }) {
  const { loading, error, data, fetchMore } = useQuery(GET_PROJECTS);
  if (data && data.projects) {
    const projects = data.projects;
    return (
      <div className="list">
        {projects.map((p, i) => (
          <div className="item" key={i}>
            <div className="picture">
              <img src={p.picture} alt="Renata Sette" />
            </div>
            <div className="text">
              <h2 className="title">
                {language === "en" ? p.nameEN : p.namePT}
              </h2>
              <p className="description">
                {language === "en" ? p.descriptionEN : p.descriptionPT}
              </p>
              {language === "en" ? (
                <Link href="/project/[projectCode]" as={`/project/${p.codeEN}`}>
                  view more
                </Link>
              ) : (
                <Link href="/projeto/[projectCode]" as={`/projeto/${p.codePT}`}>
                  ver mais
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return <Loading />;
}
