import React, { Component } from "react";
import Link from "next/link";

import Carousel from "../Carousel";
import Picture from "../Picture";
import Loading from "../Loading";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_WORKS_FROM_A_CATEGORY = gql`
  query worksByCategory($categoryID: ID!) {
    worksByCategory(categoryID: $categoryID) {
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

export default function Category({
  language,
  categoryID,
  categoryNamePT,
  categoryNameEN,
  categoryCodePT,
  categoryCodeEN
}) {
  const isMobile = window.outerWidth <= 1024;

  const { data, loading, error } = useQuery(GET_WORKS_FROM_A_CATEGORY, {
    variables: { categoryID }
  });
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data && data.worksByCategory) {
    const works = data.worksByCategory;
    return (
      <>
        <h1 className="title">
          {language === "en" ? (
            <Link href="/works/[categoryCode]" as={`/works/${categoryCodeEN}`}>
              <a>{categoryNameEN}</a>
            </Link>
          ) : (
            <Link
              href="/trabalhos/[categoryCode]"
              as={`/trabalhos/${categoryCodePT}`}
            >
              <a>{categoryNamePT}</a>
            </Link>
          )}
        </h1>
        <div className="category-slider">
          {isMobile ? (
            <>
              {works.slice(0, 2).map((w, i) => (
                <div className="work" key={i}>
                  {language === "en" ? (
                    <Picture
                      src={w.picture}
                      title={w.nameEN}
                      text={w.descriptionEN}
                      link={w.codeEN}
                    />
                  ) : (
                    <Picture
                      src={w.picture}
                      title={w.namePT}
                      text={w.descriptionPT}
                      link={w.codePT}
                    />
                  )}
                </div>
              ))}
            </>
          ) : (
            <Carousel works={works} language={language}></Carousel>
          )}
          <div className="line"></div>
          {language === "en" ? (
            <Link href="/works/[categoryCode]" as={`/works/${categoryCodeEN}`}>
              <a className="link">view more</a>
            </Link>
          ) : (
            <Link
              href="/trabalhos/[categoryCode]"
              as={`/trabalhos/${categoryCodePT}`}
            >
              <a className="link">ver mais</a>
            </Link>
          )}
        </div>
      </>
    );
  }
  return <Loading />;
}
