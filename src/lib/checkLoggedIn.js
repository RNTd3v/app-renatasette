import gql from "graphql-tag";
import cookie from "cookie";

export default function loggedInUser() {
  const cookies = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  );

  console.log(document.cookie);

  const user = {
    id: cookies.userID,
    name: cookies.userName
  };

  return cookies.userID;
}
/*apolloClient
    .query({
      query: gql`
        query {
          user {
            id
            name
            email
          }
        }
      `
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });*/
