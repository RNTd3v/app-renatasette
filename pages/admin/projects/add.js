import React from "react";

import { withApollo } from "../../../src/lib/apollo-auth";
import redirect from "../../../src/lib/redirect";
import checkLoggedIn from "../../../src/lib/checkLoggedIn";
import "../../../src/styles/main.scss";

import AdminHeader from "../../../src/components/AdminHeader";
import AdminProjectForm from "../../../src/components/AdminProjectForm";

const AddProjectAdminPage = () => {
  return (
    <section className="admin">
      <AdminHeader showButtonBack={true} route={"/admin"} />
      <main className="main">
        <h1 className="title">Adicionar Projeto</h1>
        <AdminProjectForm />
      </main>
    </section>
  );
};

AddProjectAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(AddProjectAdminPage);
