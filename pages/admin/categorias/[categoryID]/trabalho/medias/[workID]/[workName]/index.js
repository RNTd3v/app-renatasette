import React from "react";
import { useRouter } from "next/router";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../../../../../../../../src/lib/apollo-auth";
import redirect from "../../../../../../../../src/lib/redirect";
import checkLoggedIn from "../../../../../../../../src/lib/checkLoggedIn";
import "../../../../../../../../src/styles/main.scss";

import AdminHeader from "../../../../../../../../src/components/AdminHeader";
import AdminWorkForm from "../../../../../../../../src/components/AdminWorkForm";
import Loading from "../../../../../../../../src/components/Loading";

const GET_MEDIAS_BY_WORKID = gql`
  query mediasByWorkAuth($workID: ID!) {
    mediasByWorkAuth(workID: $workID) {
      id
      titlePT,
      titleEN,
      isMovie,
      url
    }
  }
`;

const MediasByWorkAdminPage = () => {
  const router = useRouter();
  const { workID, workName } = router.query;

  const { data, loading, error } = useQuery(GET_MEDIAS_BY_WORKID, {
    variables: { workID }
  });
  if (data && data.mediasByWorkAuth) {
    const medias = data.mediasByWorkAuth;
    return (
      <section className="admin">
        <AdminHeader showButtonBack={true} route={"/admin"} />
        <main className="main">
          <h1 className="title">{workName}</h1>
          <AdminWorkForm medias={medias} workID={workID} />
        </main>
      </section>
    );
  }
  return <Loading />;
};

MediasByWorkAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(MediasByWorkAdminPage);
