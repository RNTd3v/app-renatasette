import React from "react";
import Link from "next/link";

const Language = ({ pt, en, active, isDynamic = null, asPT, asEN }) => (
  <nav className="language">
    <ul className="container">
      <li className="item">
        {isDynamic ? (
          <Link href={en} as={asEN}>
            <a className={"link " + (active === "en" ? "-active" : "")}>EN</a>
          </Link>
        ) : (
          <Link href={en}>
            <a className={"link " + (active === "en" ? "-active" : "")}>EN</a>
          </Link>
        )}
      </li>
      <li className="item">
        {isDynamic ? (
          <Link href={pt} as={asPT}>
            <a className={"link " + (active === "pt" ? "-active" : "")}>PT</a>
          </Link>
        ) : (
          <Link href={pt}>
            <a className={"link " + (active === "pt" ? "-active" : "")}>PT</a>
          </Link>
        )}
      </li>
    </ul>
  </nav>
);

export default Language;
