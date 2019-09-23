import React from "react";
import "../src/styles/main.scss";

import withData from "../src/lib/apollo";

import Head from "next/head";

import Header from "../src/components/Header";
import Project from "../src/components/Projects";
import Footer from "../src/components/Footer";

export default withData(_ => {
  return (
    <>
      <Head>
        <title>Renata Sette - Projetos</title>
      </Head>
      <section>
        <Header language="pt" pagePT="/projetos" pageEN="/projects" />
        <main className="content project-list">
          <h1 className="title">Projetos</h1>
          <Project language="pt" />
        </main>
        <Footer language="pt" />
      </section>
    </>
  );
});
