import gql from "graphql-tag";
import cookie from "cookie";

export default function loggedInUser(context) {

  if(context.res) {
    context.res.setHeader('Set-Cookie', cookie.serialize('name', 'renata-sette', {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'none',
      segure: true
    }));
  }

  const cookies = cookie.parse(
    context.req ? context.req.headers.cookie || "" : document.cookie
  );

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
