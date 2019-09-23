import React from "react";
import cookie from "cookie";
import { useApolloClient } from "@apollo/react-hooks";
import { withApollo } from "../../src/lib/apollo-auth";
import redirect from "../../src/lib/redirect";
import checkLoggedIn from "../../src/lib/checkLoggedIn";
import "../../src/styles/main.scss";

import Logo from "../../src/components/Logo";

const IndexAdminPage = ({ loggedInUser }) => {
  const apolloClient = useApolloClient();

  const signout = () => {
    document.cookie = cookie.serialize("token", "", {
      maxAge: -1 // Expire the cookie immediately
    });

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    apolloClient.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, "/admin/login");
    });
  };

  return (
    <div>
      Hello {loggedInUser.user.name}!<br />
      <button onClick={signout}>Sign out</button>
    </div>
  );
};

IndexAdminPage.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn;

  if (!loggedInUser) {
    // If not signed in, send them somewhere more useful
    redirect(context, "/admin/login");
  }

  return { loggedInUser };
};

export default withApollo(IndexAdminPage);
