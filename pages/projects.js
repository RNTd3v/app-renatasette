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
        <title>Renata Sette - Projects</title>
      </Head>
      <section>
        <Header language="en" pagePT="/projetos" pageEN="/projects" />
        <main className="content project-list">
          <h1 className="title">Projects</h1>
          <Project language="en" />
        </main>
        <Footer language="en" />
      </section>
    </>
  );
});
