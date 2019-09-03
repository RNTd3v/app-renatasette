import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import gql from "graphql-tag";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4004/",
  fetch: fetch
});

const client = new ApolloClient({
  cache,
  link
});

const Index = () => (
  <div>
    <p>Hello Next.js</p>
  </div>
);

client
  .query({
    query: gql`
      {
        user(id: "5d629ef22b28dc0d39ff5086") {
          name
          email
          id
        }
      }
    `
  })
  .then(result => console.log(result));

Index.getInitialProps = () => {
  return {};
};

export default Index;
