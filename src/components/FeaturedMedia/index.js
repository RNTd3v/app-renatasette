import React from "react";
import Link from "next/link";

export default function FeaturedMedia({ language, work, category }) {
  return (
    <>
      {language === "en" ? (
        <Link href="/work/[workCode]" as={`/work/${work.codeEN}`}>
          <div className="featured-media">
            <img src={work.picture} alt={work.nameEN} className="image" />
            <div className="titleWrapper">
              <h1 className="title">{category.categoryName}</h1>
              <i className="far fa-play-circle"></i>
            </div>
            <p className="text">{work.descriptionEN}</p>
          </div>
        </Link>
      ) : (
        <Link href="/trabalho/[workCode]" as={`/trabalho/${work.codePT}`}>
          <div className="featured-media">
            <img src={work.picture} alt={work.namePT} className="image" />
            <div className="titleWrapper">
              <h1 className="title">{category.categoryName}</h1>
              <i className="far fa-play-circle"></i>
            </div>
            <p className="text">{work.descriptionPT}</p>
          </div>
        </Link>
      )}
    </>
  );
}
