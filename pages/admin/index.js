import React from "react";
import cookie from "cookie";
import { useApolloClient } from "@apollo/react-hooks";
import { withApollo } from "../../src/lib/apollo-auth";
import redirect from "../../src/lib/redirect";
import checkLoggedIn from "../../src/lib/checkLoggedIn";
import "../../src/styles/main.scss";

import Logo from "../../src/components/Logo";

const IndexAdminPage = ({ userName }) => {
  const apolloClient = useApolloClient();

  const signout = () => {
    document.cookie = cookie.serialize("token", "", {
      maxAge: -1 // Expire the cookie immediately
    });
    document.cookie = cookie.serialize("userID", "", {
      maxAge: -1 // Expire the cookie immediately
    });
    document.cookie = cookie.serialize("userName", "", {
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
      Hello {userName}!<br />
      <button onClick={signout}>Sign out</button>
    </div>
  );
};

IndexAdminPage.getInitialProps = async context => {
  
  const loggedInUser = checkLoggedIn(context);

  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {userName: loggedInUser.name };
};

export default withApollo(IndexAdminPage);
