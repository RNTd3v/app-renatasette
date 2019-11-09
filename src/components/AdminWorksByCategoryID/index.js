import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import AdminListWorks from "../AdminListWorks";

import Loading from "../Loading";

const GET_WORKS_BY_CATEGORYID = gql`
  query worksByCategoryAuth($categoryID: ID!) {
    worksByCategoryAuth(categoryID: $categoryID) {
      id
      categoryID
      namePT
      nameEN
      descriptionPT
      descriptionEN
      picture
      order_by
    }
  }
`;

const AdminWorksByCategoryID = ({ categoryID }) => {
  const { data } = useQuery(GET_WORKS_BY_CATEGORYID, {
    variables: { categoryID }
  });

  if (data && data.worksByCategoryAuth && data.worksByCategoryAuth.length > 0) {
    const works = data.worksByCategoryAuth.sort((a, b) => a.order_by - b.order_by);
    return (
     <AdminListWorks works={works} />
    );
  }
  return <Loading />;
};

export default AdminWorksByCategoryID;
