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
  const category = CategoryMock.filter(c => c.code === categoryCode)[0];
  const works = Works.filter(w => w.categoryID === category.id);
  const featuredMedia = works[0];
  return (
    <div>
      <Head>
        <title>Renata Sette - {category.nameEN}</title>
      </Head>
      <section>
        <Header />
        <main className="content">
          <FeaturedMedia
            src={featuredMedia.picture}
            link={featuredMedia.code}
            text={featuredMedia.descriptionPT}
            title={category.nameEN}
          />
          <Gallery works={works} />
        </main>
        <Footer />
      </section>
    </div>
  );
};

export default WorksPageByCategory;
