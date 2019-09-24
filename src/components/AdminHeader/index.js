import React from "react";
import Router from "next/router";
import cookie from "cookie";
import { useApolloClient } from "@apollo/react-hooks";
import redirect from "../../lib/redirect";

import Logo from "../Logo";

const AdminHeader = ({ showButtonBack = false, route }) => {
  const apolloClient = useApolloClient();

  const signout = () => {
    document.cookie = cookie.serialize("token", "", {
      maxAge: -1
    });
    document.cookie = cookie.serialize("userID", "", {
      maxAge: -1
    });
    document.cookie = cookie.serialize("userName", "", {
      maxAge: -1
    });

    apolloClient.cache.reset().then(() => {
      redirect({}, "/admin/login");
    });
  };

  return (
    <header className="header">
      {showButtonBack ? (
        <button className="bt-back" onClick={() => Router.push(route)}>
          <i className="fas fa-arrow-left icon"></i>
        </button>
      ) : null}
      <Logo />
      <button onClick={signout} className="bt-sair">
        Sair
      </button>
    </header>
  );
};

export default AdminHeader;
