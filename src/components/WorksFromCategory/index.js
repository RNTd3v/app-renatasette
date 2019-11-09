import React from "react";

import Loading from "../Loading";

import FeaturedMedia from "../FeaturedMedia";
import Gallery from "../Gallery";

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
      order_by
    }
  }
`;

export default function WorksFromCategory({
  language,
  categoryID,
  categoryName
}) {
  const { data, loading, error } = useQuery(GET_WORKS_FROM_A_CATEGORY, {
    variables: { categoryID }
  });
  const category = {
    categoryID,
    categoryName
  };
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data && data.worksByCategory) {
    const worksOrder = data.worksByCategory.sort((a, b) => a.order_by - b.order_by);
    const work = worksOrder[0];
    const works = worksOrder.slice(1);
    return (
      <>
        <FeaturedMedia language={language} work={work} category={category} />
        <Gallery works={works} language={language} />
      </>
    );
  }
  return <Loading />;
}
