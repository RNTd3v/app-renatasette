import React from "react";

import { withApollo } from "../../../src/lib/apollo-auth";
import redirect from "../../../src/lib/redirect";
import checkLoggedIn from "../../../src/lib/checkLoggedIn";
import "../../../src/styles/main.scss";

import AdminHeader from "../../../src/components/AdminHeader";
import AdminSliderForm from "../../../src/components/AdminBannerForm";

const AddBannerAdminPage = () => {
  return (
    <section className="admin">
      <AdminHeader showButtonBack={true} route={"/admin"} />
      <main className="main">
        <h1 className="title">Adicionar Banner</h1>
        <AdminSliderForm />
      </main>
    </section>
  );
};

AddBannerAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(AddBannerAdminPage);
