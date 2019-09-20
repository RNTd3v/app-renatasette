import React from "react";
import Slider from "react-slick";
import Link from "next/link";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_SLIDER = gql`
  query {
    slider {
      titlePT
      titleEN
      linkPT
      linkEN
      picture
      id
    }
  }
`;

export default function SliderHome({ language }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  const { loading, error, data, fetchMore } = useQuery(GET_SLIDER);
  if (data && data.slider) {
    return (
      <Slider {...settings} className="mainSlider">
        {data.slider.map((s, i) => (
          <div className="work" key={i}>
            {language === "en" ? (
              <Link href="/work/[workCode]" as={`/work/${s.linkEN}`}>
                <figure>
                  <img src={s.picture} />
                  <div className="subtitle">
                    <span className="number">/ 0{i + 1}</span> {s.titleEN}
                  </div>
                </figure>
              </Link>
            ) : (
              <Link href="/trabalho/[workCode]" as={`/trabalho/${s.linkPT}`}>
                <figure>
                  <img src={s.picture} />
                  <div className="subtitle">
                    <span className="number">/ 0{i + 1}</span> {s.titlePT}
                  </div>
                </figure>
              </Link>
            )}
          </div>
        ))}
      </Slider>
    );
  }
  return <div>Loading...</div>;
}
