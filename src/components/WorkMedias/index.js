import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import FsLightbox from "fslightbox-react";
import Vimeo from "@u-wave/react-vimeo";

import Loading from "../Loading";

const GET_MEDIA_FROM_WORK = gql`
  query mediasByWork($workID: ID!) {
    mediasByWork(workID: $workID) {
      id
      titlePT
      titleEN
      isMovie
      url
    }
  }
`;

export default function WorkMedias({ work, language }) {
  const { data, loading, error } = useQuery(GET_MEDIA_FROM_WORK, {
    variables: { workID: work.id }
  });
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data && data.mediasByWork) {
    const medias = data.mediasByWork;
    if (medias.length > 0) {
      console.log(medias);
      const video = medias[0];

      const oddMedias = medias.filter((w, i) => i % 2 === 0).slice(1);
      const evenMedias = medias.filter((w, i) => i % 2 === 1);

      let wPlayVimeoTop = 860;
      let wPlayVimeoGallery = 400;

      // Setando a largura do iframe do player video na galeria
      if (typeof window !== "undefined") {
        const gallery = document.getElementsByClassName("gallery");
        console.log(gallery);
        /*const wGallery = gallery[0].offsetWidth;
      wPlayVimeoTop = wGallery;
      if (window.outerWidth > 600) {
        wPlayVimeoGallery = wGallery / 2 - 10;
      } else {
        wPlayVimeoGallery = wGallery;
      }*/
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
        <>
          <div className="top">
            <h1 className="title">
              {language === "en" ? work.nameEN : work.namePT}
            </h1>
            <Vimeo
              video={video.url}
              width={wPlayVimeoTop}
              showByline={false}
              showTitle={false}
              showPortrait={false}
            />
            <p className="text">
              {language === "en" ? work.descriptionEN : work.descriptionPT}
            </p>
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
        </>
      );
    }
    return (
      <div className="no-content">
        {language === "en" ? "Not content" : "Nenhum conteúdo"}
      </div>
    );
  }
  return <Loading />;
}
