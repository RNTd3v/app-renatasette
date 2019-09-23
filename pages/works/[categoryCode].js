import React from "react";
import { useRouter } from "next/router";
import "../../src/styles/main.scss";
import withData from "../../src/lib/apollo";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Head from "next/head";

import Header from "../../src/components/Header";
import WorksFromCategory from "../../src/components/WorksFromCategory";
import Loading from "../../src/components/Loading";
import Footer from "../../src/components/Footer";

const GET_CATEGORIES_FROM_CODE = gql`
  query categoryByCodeEN($codeEN: String!) {
    categoryByCodeEN(codeEN: $codeEN) {
      id
      nameEN
      codePT
    }
  }
`;

export default withData(_ => {
  const router = useRouter();
  const { categoryCode } = router.query;

  const { data, loading, error } = useQuery(GET_CATEGORIES_FROM_CODE, {
    variables: { codeEN: categoryCode }
  });
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data && data.categoryByCodeEN) {
    const category = data.categoryByCodeEN;
    return (
      <>
        <Head>
          <title>Renata Sette - {category.nameEN}</title>
        </Head>
        <section>
          <Header
            language="en"
            pagePT="/trabalhos/[categoryCode]"
            asPT={`/trabalhos/${category.codePT}`}
            pageEN="/works/[categoryCode]"
            asEN={`/works/${category.codeEN}`}
            isDynamic={true}
          />
          <main className="content">
            <WorksFromCategory
              language="en"
              categoryID={category.id}
              categoryName={category.nameEN}
            />
          </main>
          <Footer language="en" />
        </section>
      </>
    );
  }
  return <Loading />;
});
