import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import FsLightbox from "fslightbox-react";
import Vimeo from "@u-wave/react-vimeo";
import SanitizedHTML from "react-sanitized-html";

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
  const [wPlayVimeoTop, setwPlayVimeoTop] = useState(860);
  const [wPlayVimeoGallery, setwPlayVimeoGallery] = useState(400);
  const { data, loading, error } = useQuery(GET_MEDIA_FROM_WORK, {
    variables: { workID: work.id }
  });
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1
  });

  const galleryRef = useRef();

  useEffect(() => {
    if (typeof window !== "undefined" && galleryRef.current) {
      const wGallery = galleryRef.current.offsetWidth;
      setwPlayVimeoTop(wGallery);
      if (window.outerWidth > 600) {
        setwPlayVimeoGallery(wGallery / 2 - 10);
      } else {
        setwPlayVimeoGallery(wGallery);
      }
    }
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data && data.mediasByWork && data.mediasByWork.length > 0) {
    const medias = data.mediasByWork;
    if (medias.length > 0) {
      const video = medias[0];

      let oddMedias = medias.filter((w, i) => i % 2 === 0);
      let evenMedias = medias.filter((w, i) => i % 2 === 1);

      if(oddMedias.length <= 1) {
        oddMedias = oddMedias.slice(1)
      }

      if(evenMedias.length === 1) {
        oddMedias = evenMedias
        evenMedias = []
      }

      const onlyMedias = medias
        .map(m => (m.isMovie ? null : m.url))
        .filter(m => m !== null);

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
            <SanitizedHTML
              html={language === "en" ? work.descriptionEN : work.descriptionPT}
              className="text"
            />
          </div>
          <div className="gallery" ref={galleryRef}>
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
                    /*<a onClick={() => openLightboxOnSlide(m)}>
                        <img src={m.url} />
                    </a>*/
                    <img src={m.url} />
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
                    /*<a onClick={() => openLightboxOnSlide(m)}>
                        <img src={m.url} />
                    </a>*/
                    <img src={m.url} />
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
