import React from "react";
import Link from "next/link";
import SanitizedHTML from "react-sanitized-html";

const Picture = ({ src, link, text, title }) => {
  return (
    <Link href={link} href="/work/[workCode]" as={`/work/${link}`}>
      <figure className="picture">
        <img src={src} alt={title} className="image" />
        <figcaption>
          <div className="textWrapper">
            <h2 className="title">{title}</h2>
            <SanitizedHTML html={text} className="text" />
          </div>
        </figcaption>
      </figure>
    </Link>
  );
};

export default Picture;
