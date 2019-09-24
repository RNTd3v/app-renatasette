import React from "react";
import Link from "next/link";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../../../../src/lib/apollo-auth";
import redirect from "../../../../src/lib/redirect";
import checkLoggedIn from "../../../../src/lib/checkLoggedIn";
import "../../../../src/styles/main.scss";

import AdminHeader from "../../../../src/components/AdminHeader";
import Loading from "../../../../src/components/Loading";

const GET_CATEGORIES = gql`
  query {
    categoriesAuth {
      namePT
      nameEN
      id
    }
  }
`;

const WorksAdminPage = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_CATEGORIES);
  if (data && data.categoriesAuth) {
    const categories = data.categoriesAuth;
    return (
      <section className="admin">
        <AdminHeader showButtonBack={true} route={"/admin"} />
        <main className="main">
          <h1 className="title">
            Lista dos trabalhos da categoria selecionada
          </h1>
        </main>
      </section>
    );
  }
  return <Loading />;
};

WorksAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(WorksAdminPage);
