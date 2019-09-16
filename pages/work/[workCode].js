import React, { useState } from "react";
import FsLightbox from "fslightbox-react";
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

  const oddMedias = medias.filter((w, i) => i % 2 === 0).slice(1);
  const evenMedias = medias.filter((w, i) => i % 2 === 1);

  let wPlayVimeoTop = 860;
  let wPlayVimeoGallery = 400;

  // Setando a largura do iframe do player video na galeria
  if (typeof window !== "undefined") {
    const gallery = document.getElementsByClassName("gallery");
    const wGallery = gallery[0].offsetWidth;
    wPlayVimeoTop = wGallery;
    if (window.outerWidth > 600) {
      wPlayVimeoGallery = wGallery / 2 - 10;
    } else {
      wPlayVimeoGallery = wGallery;
    }
  }

  const onlyMedias = medias
    .map(m => (m.isMovie ? null : m.url))
    .filter(m => m !== null);

  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1
  });

  function openLightboxOnSlide(slide) {
    let item;
    onlyMedias.forEach((m, i) => {
      if (m === slide.url) {
        item = i + 1;
      }
    });
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: item
    });
  }

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
              width={wPlayVimeoTop}
              showByline={false}
              showTitle={false}
              showPortrait={false}
            />
            <p className="text">{work.descriptionPT}</p>
          </div>
          <div className="gallery">
            <div className="col-left">
              {oddMedias.map((m, i) => (
                <div className="work" key={i}>
                  {m.isMovie ? (
                    <Vimeo
                      video={m.url}
                      width={wPlayVimeoGallery}
                      showByline={false}
                      showTitle={false}
                      showPortrait={false}
                    />
                  ) : (
                    <a onClick={() => openLightboxOnSlide(m)}>
                      <img src={m.url} />
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div className="col-right">
              {evenMedias.map((m, i) => (
                <div className="work" key={i}>
                  {m.isMovie ? (
                    <Vimeo
                      video={m.url}
                      width={wPlayVimeoGallery}
                      showByline={false}
                      showTitle={false}
                      showPortrait={false}
                    />
                  ) : (
                    <a onClick={() => openLightboxOnSlide(m)}>
                      <img src={m.url} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
          <FsLightbox
            toggler={lightboxController.toggler}
            slide={lightboxController.slide}
            sources={onlyMedias}
          />
        </main>
        <Footer />
      </section>
    </div>
  );
};

export default WorkPage;
