import React from "react";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Loading from "../Loading";

const GET_CONTACT = gql`
  query {
    contacts {
      cellPhone
      email
      email2
      street
      number
      district
      city
      state
      phone
      cep
      id
    }
  }
`;

export default function Footer({ language }) {
  const { data, loading, error } = useQuery(GET_CONTACT);
  if (data && data.contacts && data.contacts.length > 0) {
    const contact = data.contacts[0];
    return (
      <footer className="footer">
        <div className="contacts">
          <div className="item -address">
            <h2 className="title">
              {language === "en" ? "Address" : "Endereço"}
            </h2>
            <p className="text">
              {contact.street}, {contact.number} - {contact.district} -{" "}
              {contact.city}/{contact.state} - {contact.cep}
            </p>
          </div>
          <div className="item -address">
            <h2 className="title">E-mail</h2>
            <a href={`mailto:${contact.email}`} className="link">
              {contact.email}
            </a>
            {contact.email2 ? (
              <a href={`mailto:${contact.email2}`} className="link">
                {contact.email2}
              </a>
            ) : null}
          </div>
          <div className="item -address">
            <h2 className="title">
              {language === "en" ? "Phone" : "Telefone"}
            </h2>
            {contact.phone ? (
              <p className="text">
                {language === "en" ? "+55" : ""} {contact.phone}
              </p>
            ) : null}

            {contact.cellPhone ? (
              <p className="text">
                {language === "en" ? "+55" : ""} {contact.cellPhone}
              </p>
            ) : null}
          </div>
        </div>
        <div className="bottom">
          <p className="text">
            © 2019 Renata Sette / Website by{" "}
            <a
              href="http://rntdesign.com.br"
              target="_blank"
              className="author"
            >
              rntdesign
            </a>
          </p>
        </div>
      </footer>
    );
  }
  return <Loading />;
}
