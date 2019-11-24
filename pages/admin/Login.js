import React from "react";
import "../../src/styles/main.scss";

import Head from "next/head";

import cookie from "cookie";
import { withApollo } from "../../src/lib/apollo-auth";
import redirect from "../../src/lib/redirect";
import checkLoggedIn from "../../src/lib/checkLoggedIn";

import LoginForm from "../../src/components/LoginForm";
import Logo from "../../src/components/Logo";

const LoginAdminPage = () => {
  return (
    <>
      <Head>
        <title>Admin | Renata Sette</title>
        <meta name="description" content="Website Renata Sette" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="" />
        <meta property="og:title" content="Renata Sette" />
      </Head>
      <section>
        <div className="login">
          <div className="content">
            <Logo />
            <h1 className="title">
              Entre com o seu login e senha para acessar a área administrativa:
            </h1>
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
};

LoginAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);

  if (loggedInUser.id) {
    redirect(context, "/admin");
  }

  return {};
};

export default withApollo(LoginAdminPage);
