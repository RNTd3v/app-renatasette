import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../../../src/lib/apollo-auth";
import redirect from "../../../src/lib/redirect";
import checkLoggedIn from "../../../src/lib/checkLoggedIn";
import "../../../src/styles/main.scss";

import Loading from "../../../src/components/Loading";
import AdminHeader from "../../../src/components/AdminHeader";
import AdminFormContact from "../../../src/components/AdminContactForm";

const GET_CONTACT = gql`
  query {
    contactsAuth {
      id
      phone
      cellPhone
      email
      email2
      street
      number
      district
      city
      state
      cep
    }
  }
`;

const ContactAdminPage = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_CONTACT);
  if (data && data.contactsAuth) {
    const contact = data.contactsAuth[0];
    return (
      <section className="admin">
        <AdminHeader showButtonBack={true} route={"/admin"} />
        <main className="main">
          <h1 className="title">Dados de contato</h1>
          <AdminFormContact contact={contact} />
        </main>
      </section>
    );
  }
  return <Loading />;
};

ContactAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(ContactAdminPage);
