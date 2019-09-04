import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USER = gql`
  query user {
    user(id: "5d629ef22b28dc0d39ff5086") {
      name
      email
      id
    }
  }
`;

function User() {
  const { loading, error, data, fetchMore } = useQuery(GET_USER);
  if (data && data.user) {
    return (
      <div>
        <p>{data.user.name}</p>
      </div>
    );
  }
  return <div>Loading...</div>;
}

export default User;
