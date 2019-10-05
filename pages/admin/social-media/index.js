import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../../../src/lib/apollo-auth";
import redirect from "../../../src/lib/redirect";
import checkLoggedIn from "../../../src/lib/checkLoggedIn";
import "../../../src/styles/main.scss";

import AdminHeader from "../../../src/components/AdminHeader";
import AdminSocialMediaForm from "../../../src/components/AdminSocialMediaForm";
import Loading from "../../../src/components/Loading";

const GET_SOCIALMEDIA = gql`
  query {
    socialMediaAuth {
      id
      name
      url
      icon
    }
  }
`;

const SocialMediaAdminPage = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_SOCIALMEDIA);
  if (data && data.socialMediaAuth) {
    const socialMedia = data.socialMediaAuth;
    return (
      <section className="admin">
        <AdminHeader showButtonBack={true} route={"/admin"} />
        <main className="main">
          <h1 className="title">SocialMedia</h1>
          <div className="socialmedia-admin">
            {socialMedia.map((s, i) => (
              <div className="item" key={i}>
                <i className={s.icon}></i>
                <div className="name">{s.name}</div>
                <AdminSocialMediaForm socialMedia={s} />
              </div>
            ))}
          </div>
        </main>
      </section>
    );
  }
  return <Loading />;
};

SocialMediaAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(SocialMediaAdminPage);
