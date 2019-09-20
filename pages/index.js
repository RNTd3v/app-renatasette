import React from "react";
import "../src/styles/main.scss";

import Head from "next/head";

import withData from "../src/lib/apollo";

// Components
import Header from "../src/components/Header";
import Slider from "../src/components/Slider";
import Categories from "../src/components/Categories";
import Footer from "../src/components/Footer";

export default withData(_ => {
  return (
    <>
      <Head>
        <title>Renata Sette</title>
        <meta name="description" content="Website Renata Sette" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="" />
        <meta property="og:title" content="Renata Sette" />
      </Head>
      <section>
        <Header language="en" pagePT="/principal" pageEN="/" />
        <main className="content">
          <Slider language="en" />
          <Categories language="en" />
        </main>
        <Footer language="en" />
      </section>
    </>
  );
});
