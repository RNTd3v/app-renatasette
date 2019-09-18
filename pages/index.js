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

const Home = () => (
  <div>
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
        {category.map((c, i) => (
          <Category name={c.nameEN} id={c.id} key={i} language="en" code={c.codeEN} />
        ))}
      </main>
      <Footer language="en" />
    </section>
  </div>
);

export default Home;

/*

import withData from "../lib/apollo";
import User from "../components/Users";

export default withData(props => {
  return (
    <div>
      <User />
    </div>
  );
});
 
*/
