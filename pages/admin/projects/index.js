import React, { useState } from "react";
import Link from "next/link";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../../../src/lib/apollo-auth";
import redirect from "../../../src/lib/redirect";
import checkLoggedIn from "../../../src/lib/checkLoggedIn";
import "../../../src/styles/main.scss";

import Modal from "react-responsive-modal";

import AdminHeader from "../../../src/components/AdminHeader";
import Loading from "../../../src/components/Loading";

import Router from "next/router";

const GET_PROJECTS = gql`
  query projectsAuth {
    projectsAuth {
      id
      namePT
      nameEN
      picture
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($id: String!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const ProjectsAdminPage = () => {
  const [deleteProject, setDeleteProject] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useQuery(GET_PROJECTS);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onCompleted = resposta => {
    if (resposta.deleteProject.id) {
      setOpenModal(false);
      Router.push(`/admin/projects`);
    }
  };

  const onError = error => {
    console.error(error);
  };

  const [deleteConfirmProject] = useMutation(DELETE_PROJECT, {
    onCompleted,
    onError
  });
  if (data && data.projectsAuth) {
    const projects = data.projectsAuth;
    return (
      <section className="admin">
        <AdminHeader showButtonBack={true} route={"/admin"} />
        <main className="main">
          <h1 className="title">{projects.namePT}</h1>
          <Link href="/admin/projects/add" as={`/admin/projects/add`}>
            <button className="bt-add">Adicionar projeto</button>
          </Link>
          <ul className="table">
            <li className="row -head">
              <div className="col -img">Imagem</div>
              <div className="col -flex">Nome</div>
              <div className="col -act">Ação</div>
            </li>

            {projects.length === 0 ? (
              <p className="no-data">Nenhum projeto foi adicionado</p>
            ) : (
              <>
                {projects.map((project, i) => (
                  <li className="row" key={i}>
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
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>
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
        </main>
      </section>
    );
  }
  return <Loading />;
};

ProjectsAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(ProjectsAdminPage);
