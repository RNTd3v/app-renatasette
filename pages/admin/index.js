import React from "react";
import Router from "next/router";
import { withApollo } from "../../src/lib/apollo-auth";
import redirect from "../../src/lib/redirect";
import checkLoggedIn from "../../src/lib/checkLoggedIn";
import "../../src/styles/main.scss";

import AdminHeader from "../../src/components/AdminHeader";

const IndexAdminPage = ({ userName }) => {
  return (
    <section className="admin">
      <AdminHeader />
      <main className="main">
        <h1 className="title">
          Olá <strong className="name">{userName}</strong>, você está na área
          administrativa do website da Renata Sette.
        </h1>
        <div className="list -home">
          <div
            className="item"
            onClick={() => Router.push(`/admin/categorias`)}
          >
            <i className="fas fa-film icon"></i>
            <h2 className="title">Trabalhos</h2>
          </div>
          <div className="item" onClick={() => Router.push(`/admin/projects`)}>
            <i className="fas fa-folder-open icon"></i>
            <h2 className="title">Projetos</h2>
          </div>
          <div className="item" onClick={() => Router.push(`/admin/bio`)}>
            <i className="fas fa-user-circle icon"></i>
            <h2 className="title">Bio</h2>
          </div>
          <div className="item" onClick={() => Router.push(`/admin/contact`)}>
            <i className="fas fa-envelope icon"></i>
            <h2 className="title">Contatos</h2>
          </div>
        </div>
      </main>
    </section>
  );
};

IndexAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);

  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return { userName: loggedInUser.name };
};

export default withApollo(IndexAdminPage);
