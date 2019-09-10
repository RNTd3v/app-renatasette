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
    </Head>
    <section>
      <Header />
      <main className="content">
        <Slider />
        {category.map((c, i) => (
          <Category name={c.namePT} id={c.id} key={i} />
        ))}
      </main>
      <Footer />
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
