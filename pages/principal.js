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
import Slider from "../src/components/Slider";
import Categories from "../src/components/Categories";
import Footer from "../src/components/Footer";

const PrincipalPage = ({ isMobile }) => {
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
        <Header language="pt" pagePT="/principal" pageEN="/" />
        <main className="content">
          <Slider language="pt" />
          <Categories language="pt" isMobile={isMobile} />
        </main>
        <Footer language="pt" />
      </section>
    </>
  );
};

PrincipalPage.getInitialProps = async context => {
  let isMobile;
  if (context.req) {
    isMobile = detectMobile(context.req.headers["user-agent"]);
  } else {
    isMobile = detectMobile(window.navigator.userAgent);
  }
  return { isMobile };
};

export default withData(PrincipalPage);
