import React from "react";
import { useRouter } from "next/router";

import { withApollo } from "../../../../src/lib/apollo-auth";
import redirect from "../../../../src/lib/redirect";
import checkLoggedIn from "../../../../src/lib/checkLoggedIn";
import "../../../../src/styles/main.scss";

import AdminHeader from "../../../../src/components/AdminHeader";
import AdminWorkForm from "../../../../src/components/AdminWorkForm";

const AddWorkAdminPage = () => {
  const router = useRouter();
  const { categoryID } = router.query;

  return (
    <section className="admin">
      <AdminHeader showButtonBack={true} route={"/admin"} />
      <main className="main">
        <h1 className="title">Adicionar Trabalho</h1>
        <AdminWorkForm categoryID={categoryID} />
      </main>
    </section>
  );
};

AddWorkAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(AddWorkAdminPage);
