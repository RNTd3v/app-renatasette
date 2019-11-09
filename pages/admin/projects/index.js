import React from "react";
import Link from "next/link";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../../../src/lib/apollo-auth";
import redirect from "../../../src/lib/redirect";
import checkLoggedIn from "../../../src/lib/checkLoggedIn";
import "../../../src/styles/main.scss";

import AdminHeader from "../../../src/components/AdminHeader";
import AdminListProjects from "../../../src/components/AdminListProjects";
import Loading from "../../../src/components/Loading";

const GET_PROJECTS = gql`
  query projectsAuth {
    projectsAuth {
      id
      namePT
      nameEN
      picture
      order_by
    }
  }
`;

const ProjectsAdminPage = () => {
  const { data, loading, error } = useQuery(GET_PROJECTS);
  
  if (data && data.projectsAuth) {
    const projects = data.projectsAuth.sort((a, b) => a.order_by - b.order_by);
    return (
      <section className="admin">
        <AdminHeader showButtonBack={true} route={"/admin"} />
        <main className="main">
          <h1 className="title">Projetos</h1>
          <Link href="/admin/projects/add" as={`/admin/projects/add`}>
            <button className="bt-add">Adicionar projeto</button>
          </Link>
          <AdminListProjects projects={projects} />
        </main>
      </section>
    );
  }
  return <Loading />;
};

ProjectsAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(ProjectsAdminPage);
