import React from "react";

import "../src/styles/main.scss";

import Head from "next/head";
import dynamic from "next/dynamic";

import withData from "../src/lib/apollo";

import detectMobile from "../src/utils/DetectMobile";

// Components
const Header = dynamic(() => import("../src/components/Header"), {
  ssr: false
});
// const Categories= dynamic(() => import("../src/components/Categories"), { ssr: false }) ;
import Categories from "../src/components/Categories";
import Slider from "../src/components/Slider";
import Footer from "../src/components/Footer";

import Logo from "../src/components/Logo";

const IndexPage = ({ isMobile }) => {
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
        <div className="emBreve">
          <Logo isMobile={false} language={null} />
          Em Breve</div>
        {/*
        <Header language="en" pagePT="/principal" pageEN="/" />
        <main className="content">
          <Slider language="en" />
          <Categories language="en" isMobile={isMobile} />
        </main>
        <Footer language="en" />*/}
      </section>
    </>
  );
};

IndexPage.getInitialProps = async context => {
  let isMobile;
  if (context.req) {
    isMobile = detectMobile(context.req.headers["user-agent"]);
  } else {
    isMobile = detectMobile(window.navigator.userAgent);
  }
  return { isMobile };
};

export default withData(IndexPage);
