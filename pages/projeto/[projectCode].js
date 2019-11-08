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

const GET_PROJECT_FROM_CODE = gql`
  query projectByCodePT($codePT: String!) {
    projectByCodePT(codePT: $codePT) {
      id
      namePT
      codePT
      codeEN
      descriptionPT
      picture
    }
  }
`;

export default withData(_ => {
  const router = useRouter();
  const { projectCode } = router.query;

  const { data, loading, error } = useQuery(GET_PROJECT_FROM_CODE, {
    variables: { codePT: projectCode }
  });
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data && data.projectByCodePT) {
    const project = data.projectByCodePT;
    return (
      <div>
        <Head>
          <title>Renata Sette - {project.namePT}</title>
          <meta name="description" content={project.descriptionPT} />
          <meta property="og:image" content={project.picture} />
          <meta property="og:description" content={project.descriptionPT} />
          <meta property="og:title" content={project.namePT} />
        </Head>
        <section>
          <Header
            language="pt"
            pagePT="/projeto/[projectCode]"
            asPT={`/projeto/${project.codePT}`}
            pageEN="/project/[projectCode]"
            asEN={`/project/${project.codeEN}`}
            isDynamic={true}
            bgHeaderDark={true}
          />
          <main className="content work-detail">
            <WorkMedias work={project} language="pt" />
          </main>
          <Footer language="pt" />
        </section>
      </div>
    );
  }
  return <Loading />;
});
