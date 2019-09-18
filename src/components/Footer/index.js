import React from "react";

const Footer = ({ language }) => (
  <footer className="footer">
    <div className="contacts">
      <div className="item -address">
        <h2 className="title">{language === "en" ? "Address" : "Endereço"}</h2>
        <p className="text">Rua nome da rua, 123</p>
      </div>
      <div className="item -address">
        <h2 className="title">E-mail</h2>
        <a href="mailto:sette.renata@gmail.com" className="link">
          sette.renata@gmail.com
        </a>
      </div>
      <div className="item -address">
        <h2 className="title">{language === "en" ? "Phone" : "Telefone"}</h2>
        <p className="text">{language === "en" ? "+55" : ""} (11) 11111-1111</p>
      </div>
    </div>
    <div className="bottom">
      <p className="text">
        © 2019 Renata Sette / Website by{" "}
        <a href="http://rntdesign.com.br" target="_blank" className="author">
          rntdesign
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
