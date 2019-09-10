import React from "react";

const Footer = () => (
  <footer className="footer">
    <div className="contacts">
      <div className="item -address">
        <h2 className="title">Studio</h2>
        <p className="text">Rua nome da rua, 123</p>
      </div>
      <div className="item -address">
        <h2 className="title">E-mail</h2>
        <a href="mailto:sette.renata@gmail.com" className="link">
          sette.renata@gmail.com
        </a>
      </div>
      <div className="item -address">
        <h2 className="title">Telefone</h2>
        <p className="text">(11) 11111-1111</p>
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
