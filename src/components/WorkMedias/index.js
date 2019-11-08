import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

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
  const [wPlayVimeoTop, setwPlayVimeoTop] = useState(1000);
  const { data, loading, error } = useQuery(GET_MEDIA_FROM_WORK, {
    variables: { workID: work.id }
  });

  useEffect(() => {
    const windowWidth = window.outerWidth;
    if (windowWidth < 1000) {
      setwPlayVimeoTop(windowWidth - 20);
      setwPlayVimeoGallery(windowWidth / 2 - 20);
    }
  });

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data && data.mediasByWork && data.mediasByWork.length > 0) {
    const medias = data.mediasByWork;
    if (medias.length > 0) {
      return (
        <>
          <div className="top">
            <h1 className="title">
              {language === "en" ? work.nameEN : work.namePT}
            </h1>
            <SanitizedHTML
              html={language === "en" ? work.descriptionEN : work.descriptionPT}
              className="text"
            />
            {medias.map((m, i) => (
              <div className="video" key={i}>
                {m.isMovie ? (
                  <>
                    <Vimeo
                      video={m.url}
                      width={wPlayVimeoTop}
                      showByline={false}
                      showTitle={false}
                      showPortrait={false}
                    />
                    <span className="name">
                      {language === "en" ? m.titleEN : m.titlePT}
                    </span>
                  </>
                ) : null}
              </div>
            ))}
          </div>
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
