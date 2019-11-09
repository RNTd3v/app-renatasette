import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../../../src/lib/apollo-auth";
import redirect from "../../../src/lib/redirect";
import checkLoggedIn from "../../../src/lib/checkLoggedIn";
import "../../../src/styles/main.scss";

import AdminHeader from "../../../src/components/AdminHeader";
import AdminBio from "../../../src/components/AdminBio";
import Loading from "../../../src/components/Loading";

const GET_BIO = gql`
  query {
    biosAuth {
      titlePT
      titleEN
      contentPT
      contentEN
      id
      picture
    }
  }
`;

const BioAdminPage = () => {
  const { data } = useQuery(GET_BIO);
  if (data && data.biosAuth) {
    return (
      <section className="admin">
        <AdminHeader showButtonBack={true} route={"/admin"} />
        <main className="main">
          <h1 className="title">Bio</h1>
          <AdminBio bio={data.biosAuth[0]} />
        </main>
      </section>
    );
  }
  return <Loading />;
};

BioAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(BioAdminPage);
