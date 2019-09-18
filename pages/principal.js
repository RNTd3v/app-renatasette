import React from "react";
import "../src/styles/main.scss";

import Head from "next/head";

// Components
import Header from "../src/components/Header";
import Slider from "../src/components/Slider";
import Category from "../src/components/Category";
import Footer from "../src/components/Footer";

import CategoryMock from "../src/mocks/category.js";

const category = CategoryMock;

const Principal = () => (
  <div>
    <Head>
      <title>Renata Sette</title>
      <meta name="description" content="Website Renata Sette" />
      <meta property="og:image" content="" />
      <meta property="og:description" content="" />
      <meta property="og:title" content="Renata Sette" />
    </Head>
    <section>
      <Header language="pt" pagePT="/principal" pageEN="/" />
      <main className="content">
        <Slider language="pt" />
        {category.map((c, i) => (
          <Category name={c.namePT} id={c.id} key={i} />
        ))}
      </main>
      <Footer language="pt" />
    </section>
  </div>
);

export default Principal;
