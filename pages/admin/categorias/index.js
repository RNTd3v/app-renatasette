import React from "react";
import Link from "next/link";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../../../src/lib/apollo-auth";
import redirect from "../../../src/lib/redirect";
import checkLoggedIn from "../../../src/lib/checkLoggedIn";
import "../../../src/styles/main.scss";

import AdminHeader from "../../../src/components/AdminHeader";
import Loading from "../../../src/components/Loading";

const GET_CATEGORIES = gql`
  query {
    categoriesAuth {
      namePT
      nameEN
      id
    }
  }
`;

const CategoryAdminPage = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_CATEGORIES);
  if (data && data.categoriesAuth) {
    const categories = data.categoriesAuth;
    return (
      <section className="admin">
        <AdminHeader showButtonBack={true} route={"/admin"} />
        <main className="main">
          <h1 className="title">Categorias</h1>
          <div className="list">
            {categories.map(category => (
              <article className="item" key={category.id}>
                <Link
                  href="/admin/categorias/[categoryID]"
                  as={`/admin/categorias/${category.id}`}
                >
                  <a>
                    {category.namePT} <small>{category.nameEN}</small>
                  </a>
                </Link>
              </article>
            ))}
          </div>
        </main>
      </section>
    );
  }
  return <Loading />;
};

CategoryAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(CategoryAdminPage);
