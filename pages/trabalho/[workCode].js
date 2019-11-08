import React from "react";
import withData from "../../src/lib/apollo";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useRouter } from "next/router";
import "../../src/styles/main.scss";

import Head from "next/head";

import Header from "../../src/components/Header";
import WorkMedias from "../../src/components/WorkMedias";
import Loading from "../../src/components/Loading";
import Footer from "../../src/components/Footer";

const GET_WORK_FROM_CODE = gql`
  query workByCodePT($codePT: String!) {
    workByCodePT(codePT: $codePT) {
      id
      namePT
      codeEN
      codePT
      descriptionPT
      picture
    }
  }
`;

export default withData(_ => {
  const router = useRouter();
  const { workCode } = router.query;

  const { data, loading, error } = useQuery(GET_WORK_FROM_CODE, {
    variables: { codePT: workCode }
  });
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data && data.workByCodePT) {
    const work = data.workByCodePT;

    return (
      <div>
        <Head>
          <title>Renata Sette - {work.namePT}</title>
          <meta name="description" content={work.descriptionPT} />
          <meta property="og:image" content={work.picture} />
          <meta property="og:description" content={work.descriptionPT} />
          <meta property="og:title" content={work.namePT} />
        </Head>
        <section>
          <Header
            language="en"
            pagePT="/trabalho/[workCode]"
            asPT={`/trabalho/${work.codePT}`}
            pageEN="/work/[workCode]"
            asEN={`/work/${work.codeEN}`}
            isDynamic={true}
            bgHeaderDark={true}
          />
          <main className="content work-detail">
            <WorkMedias work={work} language="pt" />
          </main>
          <Footer language="pt" />
        </section>
      </div>
    );
  }
  return <Loading />;
});
