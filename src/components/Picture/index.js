import React from "react";
import Link from "next/link";

const Picture = ({ src, link, text, title }) => {
  return (
    <Link href={link} href="/work/[workCode]" as={`/work/${link}`}>
      <figure className="picture">
        <img src={src} alt={title} className="image" />
        <figcaption>
          <div className="textWrapper">
            <h2 className="title">{title}</h2>
            <p className="text">{text}</p>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
};

export default Picture;
