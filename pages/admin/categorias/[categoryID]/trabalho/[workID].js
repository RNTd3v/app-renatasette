import React from "react";
import { useRouter } from "next/router";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../../../../../src/lib/apollo-auth";
import redirect from "../../../../../src/lib/redirect";
import checkLoggedIn from "../../../../../src/lib/checkLoggedIn";
import "../../../../../src/styles/main.scss";

import AdminHeader from "../../../../../src/components/AdminHeader";
import AdminWorkForm from "../../../../../src/components/AdminWorkForm";
import Loading from "../../../../../src/components/Loading";

const GET_WORK_BY_ID = gql`
  query workAuth($id: ID!) {
    workAuth(id: $id) {
      id
      namePT
      nameEN
      descriptionEN
      descriptionPT
      picture
    }
  }
`;

const WorkAdminPage = () => {
  const router = useRouter();
  const { workID, categoryID } = router.query;

  const { data, loading, error } = useQuery(GET_WORK_BY_ID, {
    variables: { id: workID }
  });
  if (data && data.workAuth) {
    const work = data.workAuth;
    return (
      <section className="admin">
        <AdminHeader showButtonBack={true} route={"/admin"} />
        <main className="main">
          <h1 className="title">{work.namePT}</h1>
          <AdminWorkForm work={work} categoryID={categoryID} />
        </main>
      </section>
    );
  }
  return <Loading />;
};

WorkAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(WorkAdminPage);
