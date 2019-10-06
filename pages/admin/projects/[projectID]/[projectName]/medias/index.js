import React, { useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";

import { useQuery, useMutation } from "@apollo/react-hooks";

import gql from "graphql-tag";
import Vimeo from "@u-wave/react-vimeo";

import Modal from "react-responsive-modal";

import { withApollo } from "../../../../../../src/lib/apollo-auth";
import redirect from "../../../../../../src/lib/redirect";
import checkLoggedIn from "../../../../../../src/lib/checkLoggedIn";
import "../../../../../../src/styles/main.scss";

import AdminHeader from "../../../../../../src/components/AdminHeader";
import AdminFormMedia from "../../../../../../src/components/AdminMedias/Form";
import Loading from "../../../../../../src/components/Loading";

const DELETE_MEDIA = gql`
  mutation deleteMedia($id: String!) {
    deleteMedia(id: $id) {
      id
    }
  }
`;

const GET_MEDIAS_BY_PROJECTID = gql`
  query mediasByWorkAuth($workID: ID!) {
    mediasByWorkAuth(workID: $workID) {
      id
      titlePT
      titleEN
      isMovie
      url
    }
  }
`;

const MediasByProjectAdminPage = () => {
  const router = useRouter();
  const { projectID, projectName } = router.query;
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [deleteMedia, setDeleteMedia] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onCompleted = resposta => {
    if (resposta.deleteMedia.id) {
      setOpenModal(false);
      Router.push(`/admin/projects/${projectID}/${projectName}/medias`);
    }
  };

  const onError = error => {
    console.error(error);
  };

  const [deleteConfirmMedia] = useMutation(DELETE_MEDIA, {
    onCompleted,
    onError
  });

  const { data, loading, error } = useQuery(GET_MEDIAS_BY_PROJECTID, {
    variables: { workID: projectID }
  });
  if (data && data.mediasByWorkAuth) {
    const medias = data.mediasByWorkAuth;
    return (
      <section className="admin">
        <AdminHeader showButtonBack={true} route={"/admin"} />
        <main className="main">
          <h1 className="title">{projectName}</h1>
          <>
            <div className="admin-medias">
              <AdminFormMedia
                media={selectedMedia}
                workID={projectID}
                path={`/admin/projects/${projectID}/${projectName}/medias`}
                isFirst={medias.length === 0}
              />
              <div className="list">
                {medias.map((m, i) => (
                  <div className="item" key={i}>
                    {m.isMovie ? (
                      <Vimeo
                        video={m.url}
                        width={300}
                        height={200}
                        showByline={false}
                        showTitle={false}
                        showPortrait={false}
                      />
                    ) : (
                      <img src={m.url} />
                    )}
                    <div className="action">
                      <button
                        className="bt-add"
                        onClick={() => {
                          setSelectedMedia(m);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="bt-excluir"
                        onClick={() => {
                          setDeleteMedia(m.id);
                          setOpenModal(true);
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="buttons">
              <button
                className="button"
                onClick={() => {
                  Router.push(`/admin/projects/`);
                }}
              >
                Cadastrar mais projetos
              </button>
            </div>
            <Modal open={openModal} onClose={onCloseModal} center>
              <p className="text-modal">
                Você tem certeza que deseja excluir esta media?
              </p>
              <button
                className="button-modal"
                onClick={() => {
                  deleteConfirmMedia({
                    variables: {
                      id: deleteMedia
                    }
                  });
                }}
              >
                Excluir
              </button>
            </Modal>
          </>
        </main>
      </section>
    );
  }
  return <Loading />;
};

MediasByProjectAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(MediasByProjectAdminPage);
