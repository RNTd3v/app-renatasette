import React from "react";

import Picture from "../Picture";

const Gallery = ({ works }) => {
  const oddWorks = works.filter((w, i) => i % 2 === 0);
  const evenWorks = works.filter((w, i) => i % 2 === 1);
  return (
    <div className="gallery">
      <div className="col-left">
        {oddWorks.map((w, i) => (
          <div className="work" key={i}>
            <Picture
              src={w.picture}
              title={w.namePT}
              text={w.descriptionPT}
              link={w.code}
            />
          </div>
        ))}
      </div>
      <div className="col-right">
        {evenWorks.map((w, i) => (
          <div className="work" key={i}>
            <Picture
              src={w.picture}
              title={w.namePT}
              text={w.descriptionPT}
              link={w.code}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
