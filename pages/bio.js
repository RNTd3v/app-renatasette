import React from "react";
import "../src/styles/main.scss";

import withData from "../src/lib/apollo";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import SanitizedHTML from "react-sanitized-html";
import Head from "next/head";

import Header from "../src/components/Header";
import Loading from "../src/components/Loading";
import Footer from "../src/components/Footer";

const GET_BIO = gql`
  query bios {
    bios {
      id
      titlePT
      titleEN
      contentPT
      contentEN
    }
  }
`;

export default withData(_ => {
  const { data, loading, error } = useQuery(GET_BIO);
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data && data.bios) {
    const bio = data.bios[0];
    return (
      <>
        <Head>
          <title>Renata Sette - Bio</title>
        </Head>
        <section>
          <Header language="en" pagePT="/biografia" pageEN="/bio" bgHeaderDark={true} />
          <main className="content project-list">
            <h1 className="title">Bio</h1>
            <div className="bio">
              <SanitizedHTML html={bio.contentEN} className="biografia" />
              <img src={bio.picture} />
            </div>
          </main>
          <Footer language="en" />
        </section>
      </>
    );
  }
  return <Loading />;
});
