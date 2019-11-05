import React from "react";

import { useRouter } from "next/router";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../../../../src/lib/apollo-auth";
import redirect from "../../../../src/lib/redirect";
import checkLoggedIn from "../../../../src/lib/checkLoggedIn";
import "../../../../src/styles/main.scss";

import AdminHeader from "../../../../src/components/AdminHeader";
import AdminSliderForm from "../../../../src/components/AdminBannerForm";
import Loading from "../../../../src/components/Loading";

const GET_BANNER_BY_ID = gql`
  query sliderAuthByID($id: ID!) {
    sliderAuthByID(id: $id) {
      id
      linkPT
      linkEN
      titlePT
      titleEN
      picture
    }
  }
`;

const EditBannerAdminPage = () => {
  const router = useRouter();
  const { bannerID } = router.query;
  const { data, loading, error } = useQuery(GET_BANNER_BY_ID, {
    variables: { id: bannerID }
  });
  if (data && data.sliderAuthByID) {
    const slider = data.sliderAuthByID;
    return (
      <section className="admin">
        <AdminHeader showButtonBack={true} route={"/admin"} />
        <main className="main">
          <h1 className="title">{slider.titlePT}</h1>
          <AdminSliderForm slider={slider} />
        </main>
      </section>
    );
  }
  return <Loading />;
};

EditBannerAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(EditBannerAdminPage);
