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

const WorksPageByCategory = () => {
  const router = useRouter();
  const { categoryCode } = router.query;
  const category = CategoryMock.filter(c => c.codeEN === categoryCode)[0];
  const works = Works.filter(w => w.categoryID === category.id);
  const featuredMedia = works[0];
  return (
    <div>
      <Head>
        <title>Renata Sette - {category.nameEN}</title>
      </Head>
      <section>
        <Header
          language="en"
          pagePT="/trabalhos/[categoryCode]"
          asPT={`/trabalhos/${category.codePT}`}
          pageEN="/works/[categoryCode]"
          asEN={`/works/${category.codeEN}`}
          isDynamic={true}
        />
        <main className="content">
          <FeaturedMedia
            src={featuredMedia.picture}
            link={featuredMedia.codeEN}
            text={featuredMedia.descriptionEN}
            title={category.nameEN}
            language="en"
          />
          <Gallery works={works} language="en" />
        </main>
        <Footer language="en" />
      </section>
    </div>
  );
};

export default WorksPageByCategory;
