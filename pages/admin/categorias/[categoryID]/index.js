import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../../../../src/lib/apollo-auth";
import redirect from "../../../../src/lib/redirect";
import checkLoggedIn from "../../../../src/lib/checkLoggedIn";
import "../../../../src/styles/main.scss";

import AdminHeader from "../../../../src/components/AdminHeader";
import AdminWorksByCategoryID from "../../../../src/components/AdminWorksByCategoryID";
import Loading from "../../../../src/components/Loading";

const GET_CATEGORY_BY_ID = gql`
  query categoryAuth($id: ID!) {
    categoryAuth(id: $id) {
      id
      namePT
      nameEN
    }
  }
`;

const WorksAdminPage = () => {
  const router = useRouter();
  const { categoryID } = router.query;

  const { data, loading, error } = useQuery(GET_CATEGORY_BY_ID, {
    variables: { id: categoryID }
  });
  if (data && data.categoryAuth) {
    const category = data.categoryAuth;
    return (
      <section className="admin">
        <AdminHeader showButtonBack={true} route={"/admin"} />
        <main className="main">
          <h1 className="title">{category.namePT}</h1>
          <Link
            href="/admin/categorias/[categoryID]/add"
            as={`/admin/categorias/${categoryID}/add`}
          >
            <button className="bt-add">Adicionar trabalho</button>
          </Link>

          <AdminWorksByCategoryID categoryID={categoryID} />
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
