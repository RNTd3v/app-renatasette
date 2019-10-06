import React from "react";

import { useRouter } from "next/router";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../../../../src/lib/apollo-auth";
import redirect from "../../../../src/lib/redirect";
import checkLoggedIn from "../../../../src/lib/checkLoggedIn";
import "../../../../src/styles/main.scss";

import AdminHeader from "../../../../src/components/AdminHeader";
import AdminProjectForm from "../../../../src/components/AdminProjectForm";

import Loading from "../../../../src/components/Loading";

const GET_PROJECT_BY_ID = gql`
  query projectAuth($id: ID!) {
    projectAuth(id: $id) {
      id
      namePT
      nameEN
      descriptionEN
      descriptionPT
      picture
    }
  }
`;

const ProjectAdminPage = () => {
  const router = useRouter();
  const { projectID } = router.query;

  const { data, loading, error } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id: projectID }
  });
  if (data && data.projectAuth) {
    const project = data.projectAuth;
    return (
      <section className="admin">
        <AdminHeader showButtonBack={true} route={"/admin"} />
        <main className="main">
          <h1 className="title">{project.namePT}</h1>
          <AdminProjectForm project={project} />
        </main>
      </section>
    );
  }
  return <Loading />;
};

ProjectAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(ProjectAdminPage);
