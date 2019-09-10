import React from "react";
import "../src/styles/main.scss";

import Head from "next/head";

// Components
import Header from "../src/components/Header";
import Slider from "../src/components/Slider";
import Category from "../src/components/Category";
import Footer from "../src/components/Footer";

const Home = () => (
  <div>
    <Head>
      <title>Renata Sette</title>
    </Head>
    <section>
      <Header />
      <main className="content">
        <Slider />
        <Category
          name="Branded Content & Entertainment"
          id="1"
          theme="default"
        />
        <Category name="Publicidade" id="2" theme="light" />
        <Category name="Documentários" id="3" theme="default" />
        <Category name="Ficção" id="4" theme="light" />
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
