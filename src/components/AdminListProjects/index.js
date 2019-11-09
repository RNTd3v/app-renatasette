import React, { useState, useEffect } from "react";
import Router from "next/router";
import Modal from "react-responsive-modal";
import Link from "next/link";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const DELETE_PROJECT = gql`
  mutation deleteProject($id: String!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const UPDATE_ORDER_PROJECT = gql`
  mutation updateOrderProject($id: String!, $order_by: Float) {
    updateOrderProject(id: $id, order_by: $order_by) {
      id
      namePT
    }
  }
`;

const AdminListProjects = ({ projects }) => {
  const [deleteProject, setDeleteProject] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [changeTheOrder, setChangeTheOrder] = useState(false);
  const [listProjects, setListProjects] = useState([]);
  const [draggedProject, setDraggedProject] = useState({});
  const [draggedIdx, setDraggedIdx] = useState(null);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onCompleted = resposta => {
    if (resposta.deleteProject.id || resposta.updateOrderProject) {
      setOpenModal(false);
      Router.push(`/admin/projects`);
    }
  };

  const onError = error => {
    console.error(error);
  };

  const saveOrderProject = () => {
    setChangeTheOrder(false);
    listProjects.forEach((project, index) => {
      updateOrderProjects({
        variables: {
          id: project.id,
          order_by: index
        }
      });
    });
  };

  const onDragStart = (e, index) => {
    setDraggedProject(listProjects[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const onDragOver = index => {
    const draggedOverProject = listProjects[index];
    // if the item is dragged over itself, ignore
    if (draggedProject === draggedOverProject) {
      return;
    }

    // filter out the currently dragged item
    let projects = listProjects.filter(project => project !== draggedProject);

    // add the dragged item after the dragged over item
    projects.splice(index, 0, draggedProject);

    setListProjects(projects);
    setChangeTheOrder(true);
  };

  const onDragEnd = () => {
    setDraggedIdx(null);
  };

  const goMedias = (projectID, projectName) => {
    Router.push(`/admin/projects/${projectID}/${projectName}/medias`);
  };

  const [deleteConfirmProject] = useMutation(DELETE_PROJECT, {
    onCompleted,
    onError
  });

  const [updateOrderProjects] = useMutation(UPDATE_ORDER_PROJECT, {
    onCompleted,
    onError
  });

  useEffect(() => {
    if (projects) {
      setListProjects(projects);
    }
  }, [projects]);

  return (
    <>
      <ul className="table">
        <li className="row -head">
          <div className="col -img">Imagem</div>
          <div className="col -flex">Nome</div>
          <div className="col -act">Ação</div>
        </li>
        {listProjects.map((project, i) => (
          <li className="row" key={i} onDragOver={() => onDragOver(i)}>
            {listProjects.length > 1 ? (
              <i
                className="fas fa-bars icon"
                draggable
                onDragStart={e => onDragStart(e, i)}
                onDragEnd={onDragEnd}
              ></i>
            ) : null}
            <div className="col -img">
              <img src={project.picture} className="picture" />
            </div>
            <div className="col -flex">{project.namePT}</div>
            <div className="col -act">
              <div className="icon -editar action">
                <Link
                  href="/admin/projects/[projectID]"
                  as={`/admin/projects/${project.id}`}
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
                  setDeleteProject(project.id);
                  setOpenModal(true);
                }}
              >
                <i className="fas fa-eraser icon"></i>
                <small className="text">Delete</small>
              </div>
              <div
                className="icon -medias action"
                onClick={() => {
                  goMedias(project.id, project.namePT);
                }}
              >
                <i class="fas fa-images icon"></i>
                <small className="text">Medias</small>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {listProjects.length > 1 ? (
        <button
          className={`button -center ${!changeTheOrder ? "-disabled" : ""}`}
          disabled={!changeTheOrder}
          onClick={() => saveOrderProject()}
        >
          Salvar a ordem
        </button>
      ) : null}
      <Modal open={openModal} onClose={onCloseModal} center>
        <p className="text-modal">
          Você tem certeza que deseja excluir este projeto?
        </p>
        <button
          className="button-modal"
          onClick={() => {
            deleteConfirmProject({
              variables: {
                id: deleteProject
              }
            });
          }}
        >
          Excluir
        </button>
      </Modal>
    </>
  );
};

export default AdminListProjects;
