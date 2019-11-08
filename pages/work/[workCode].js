import React from "react";
import withData from "../../src/lib/apollo";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useRouter } from "next/router";
import "../../src/styles/main.scss";

import Head from "next/head";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../../src/components/Header"), {
  ssr: false
});
const WorkMedias = dynamic(() => import("../../src/components/WorkMedias"), {
  ssr: false
});
import Loading from "../../src/components/Loading";
import Footer from "../../src/components/Footer";

const GET_WORK_FROM_CODE = gql`
  query workByCodeEN($codeEN: String!) {
    workByCodeEN(codeEN: $codeEN) {
      id
      nameEN
      codePT
      codeEN
      descriptionEN
      picture
    }
  }
`;

export default withData(_ => {
  const router = useRouter();
  const { workCode } = router.query;

  const { data, loading, error } = useQuery(GET_WORK_FROM_CODE, {
    variables: { codeEN: workCode }
  });
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data && data.workByCodeEN) {
    const work = data.workByCodeEN;

    return (
      <div>
        <Head>
          <title>Renata Sette - {work.nameEN}</title>
          <meta name="description" content={work.descriptionEN} />
          <meta property="og:image" content={work.picture} />
          <meta property="og:description" content={work.descriptionEN} />
          <meta property="og:title" content={work.nameEN} />
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
            <WorkMedias work={work} language="en" />
          </main>
          <Footer language="en" />
        </section>
      </div>
    );
  }
  return <Loading />;
});
