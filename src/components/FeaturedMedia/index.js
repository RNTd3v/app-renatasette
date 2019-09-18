import React from "react";
import Link from "next/link";

const FeaturedMedia = ({
  src,
  link,
  text,
  title,
  hasVideo = true,
  language
}) => {
  return (
    <>
      {language === "en" ? (
        <Link href={link} href="/work/[workCode]" as={`/work/${link}`}>
          <div className="featured-media">
            <img src={src} alt={title} className="image" />
            <div className="titleWrapper">
              <h1 className="title">{title}</h1>
              {hasVideo ? <i className="far fa-play-circle"></i> : null}
            </div>
            <p className="text">{text}</p>
          </div>
        </Link>
      ) : (
        <Link href={link} href="/trabalho/[workCode]" as={`/trabalho/${link}`}>
          <div className="featured-media">
            <img src={src} alt={title} className="image" />
            <div className="titleWrapper">
              <h1 className="title">{title}</h1>
              {hasVideo ? <i className="far fa-play-circle"></i> : null}
            </div>
            <p className="text">{text}</p>
          </div>
        </Link>
      )}
    </>
  );
};

export default FeaturedMedia;
