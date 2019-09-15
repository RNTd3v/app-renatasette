import React from "react";
import Vimeo from "@u-wave/react-vimeo";
import { useRouter } from "next/router";
import "../../src/styles/main.scss";

import Head from "next/head";

import Header from "../../src/components/Header";
import FeaturedMedia from "../../src/components/FeaturedMedia";
import Gallery from "../../src/components/Gallery";
import Footer from "../../src/components/Footer";

import Works from "../../src/mocks/works.js";
import Media from "../../src/mocks/media.js";

const WorkPage = () => {
  const router = useRouter();
  const { workCode } = router.query;
  const work = Works.filter(w => w.code === workCode)[0];
  const medias = Media.filter(m => m.workID === work.id);
  const video = medias[0];
  return (
    <div>
      <Head>
        <title>Renata Sette - {work.nameEN}</title>
        <meta name="description" content={work.descriptionPT} />
        <meta property="og:image" content={work.picture} />
        <meta property="og:description" content={work.descriptionPT} />
        <meta property="og:title" content={work.nameEN} />
      </Head>
      <section>
        <Header />
        <main className="content work-detail">
          <div className="top">
            <h1 className="title">{work.namePT}</h1>
            <Vimeo
              video={video.url}
              width={860}
              showByline={false}
              showTitle={false}
              showPortrait={false}
            />
            <p className="text">{work.descriptionPT}</p>
          </div>
          {/*<Gallery works={works} /> */}
        </main>
        <Footer />
      </section>
    </div>
  );
};

export default WorkPage;
