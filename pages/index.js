import React from "react";
import "../src/styles/main.scss";

import Head from "next/head";

// Components
import Header from "../src/components/Header";
import Carousel from "../src/components/Carousel";
import Footer from "../src/components/footer";

const Home = () => (
  <div>
    <Head>
      <title>Renata Sette</title>
    </Head>
    <section>
      <Header />
      <main className="content">
        <Carousel />
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
