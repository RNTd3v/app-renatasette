import React from "react";
import Link from "next/link";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

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
    console.log(works);
    return (
      <ul className="table">
        <li className="row -head">
          <div className="col -img">Imagem</div>
          <div className="col -flex">Nome</div>
          <div className="col -act">Ação</div>
        </li>
        {works.map((work, i) => (
          <li className="row" key={i}>
            <div className="col -img">
              <img src={work.picture} className="picture" />
            </div>
            <div className="col -flex">{work.namePT}</div>
            <div className="col -act">
              <div className="icon -editar action">
                <Link
                  href="/admin/categorias/[categoryID]/trabalho/[workID]"
                  as={`/admin/categorias/${categoryID}/trabalho/${work.id}`}
                >
                  <a>
                    <i className="far fa-edit icon"></i>
                    <small className="text">Edit</small>
                  </a>
                </Link>
              </div>
              <div className="icon -delete  action">
                <i className="fas fa-eraser icon"></i>
                <small className="text">Delete</small>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return <Loading />;
};

export default AdminWorksByCategoryID;
