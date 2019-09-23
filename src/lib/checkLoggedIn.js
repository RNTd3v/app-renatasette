import gql from "graphql-tag";
import cookie from "cookie";

export default function loggedInUser(context) {
  const cookies = cookie.parse(
    context.req ? context.req.headers.cookie || "" : document.cookie
  );

  console.log(cookies);

  const user = {
    id: cookies.userID,
    name: cookies.userName
  };

  return user;
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
