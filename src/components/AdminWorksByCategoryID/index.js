import React from "react";
import Link from "next/link";

import Loading from "../Loading";

const GET_WORKS_BY_CATEGORYID = gql`
  query worksByCategoryAuthh($categoryID: ID!) {
    worksByCategoryAuth(categoryID: $categoryID) {
      id
      namePT
      nameEN
      descriptionPT
      descriptionEN
      picture
    }
  }
`;

const AdminWorksByCategoryID = ({ categoryID }) => {
  const { data, loading, error } = useQuery(GET_WORKS_BY_CATEGORYID, {
    variables: { categoryID }
  });
  if (data && data.worksByCategoryAuth && data.worksByCategoryAuth.length > 0) {
    const works = data.worksByCategoryAuth;
    const workID = 0;
    return (
      <Link
        href="/admin/categorias/[categoryID]/trabalho/[workID]"
        as={`/admin/categorias/${categoryID}/trabalho/${workID}`}
      >
        <></>
      </Link>
    );
  }
  return <Loading />;
};

export default AdminWorksByCategoryID;
