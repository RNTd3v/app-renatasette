import React from "react";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_SOCIAL_MEDIA = gql`
  query {
    socialMedia {
      id
      name
      url
      icon
    }
  }
`;

export default function SocialMedia() {
  const { loading, error, data, fetchMore } = useQuery(GET_SOCIAL_MEDIA);
  if (data && data.socialMedia) {
    return (
      <div className="socialmedia">
        {data.socialMedia.map((s, i) => (
          <span key={i}>
            {s.url ? (
              <a
                className="item"
                href={s.url}
                target="_blank"
                title={`Renata Sette - ${s.name}`}
              >
                <i className={s.icon}></i>
              </a>
            ) : null}{" "}
          </span>
        ))}
      </div>
    );
  }
  return <></>;
}
