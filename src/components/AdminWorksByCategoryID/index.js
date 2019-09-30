import React, { useState } from "react";
import Router from "next/router";
import Modal from "react-responsive-modal";
import Link from "next/link";

import { useQuery, useMutation } from "@apollo/react-hooks";
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

const DELETE_WORK = gql`
  mutation deleteWork($id: String!) {
    deleteWork(id: $id) {
      id
    }
  }
`;

const AdminWorksByCategoryID = ({ categoryID }) => {
  const [deleteWork, setDeleteWork] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useQuery(GET_WORKS_BY_CATEGORYID, {
    variables: { categoryID }
  });

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onCompleted = resposta => {
    if (resposta.deleteWork.id) {
      setOpenModal(false);
      Router.push(`/admin/categorias/${categoryID}`);
    }
  };

  const onError = error => {
    console.error(error);
  };

  const [deleteConfirmWork] = useMutation(DELETE_WORK, {
    onCompleted,
    onError
  });

  if (data && data.worksByCategoryAuth && data.worksByCategoryAuth.length > 0) {
    const works = data.worksByCategoryAuth;
    return (
      <>
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
                <div
                  className="icon -delete  action"
                  onClick={() => {
                    setDeleteWork(work.id);
                    setOpenModal(true);
                  }}
                >
                  <i className="fas fa-eraser icon"></i>
                  <small className="text">Delete</small>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Modal open={openModal} onClose={onCloseModal} center>
          <p className="text-modal">
            Você tem certeza que deseja excluir este trabalho?
          </p>
          <button
            className="button-modal"
            onClick={() => {
              deleteConfirmWork({
                variables: {
                  id: deleteWork
                }
              });
            }}
          >
            Excluir
          </button>
        </Modal>
      </>
    );
  }
  return <Loading />;
};

export default AdminWorksByCategoryID;
