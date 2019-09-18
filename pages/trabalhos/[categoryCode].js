import React from "react";
import { useRouter } from "next/router";
import "../../src/styles/main.scss";

import Head from "next/head";

import Header from "../../src/components/Header";
import FeaturedMedia from "../../src/components/FeaturedMedia";
import Gallery from "../../src/components/Gallery";
import Footer from "../../src/components/Footer";

import CategoryMock from "../../src/mocks/category.js";
import Works from "../../src/mocks/works.js";

const TrabalhosPageByCategory = () => {
  const router = useRouter();
  const { categoryCode } = router.query;
  const category = CategoryMock.filter(c => c.codePT === categoryCode)[0];
  const works = Works.filter(w => w.categoryID === category.id);
  const featuredMedia = works[0];
  return (
    <div>
      <Head>
        <title>Renata Sette - {category.namePT}</title>
      </Head>
      <section>
        <Header
          language="pt"
          pagePT="/trabalhos/[categoryCode]"
          asPT={`/trabalhos/${category.codePT}`}
          pageEN="/works/[categoryCode]"
          asEN={`/works/${category.codeEN}`}
          isDynamic={true}
        />
        <main className="content">
          <FeaturedMedia
            src={featuredMedia.picture}
            link={featuredMedia.codePT}
            text={featuredMedia.descriptionPT}
            title={category.namePT}
            language="pt"
          />
          <Gallery works={works} language="pt" />
        </main>
        <Footer language="pt" />
      </section>
    </div>
  );
};

export default TrabalhosPageByCategory;
