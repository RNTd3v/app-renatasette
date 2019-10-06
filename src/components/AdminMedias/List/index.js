import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";

import gql from "graphql-tag";
import Vimeo from "@u-wave/react-vimeo";

import Modal from "react-responsive-modal";

import AdminFormMedia from "../Form";

const DELETE_MEDIA = gql`
  mutation deleteMedia($id: String!) {
    deleteMedia(id: $id) {
      id
    }
  }
`;

export default function AdminListMedias({ medias, workID, path }) {
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
      Router.push(
        `/admin/categorias/${path.categoryID}/trabalho/${path.workID}/${path.workName}/medias`
      );
    }
  };

  const onError = error => {
    console.error(error);
  };

  const [deleteConfirmMedia] = useMutation(DELETE_MEDIA, {
    onCompleted,
    onError
  });
  return (
    <>
      <div className="admin-medias">
        <AdminFormMedia
          media={selectedMedia}
          workID={workID}
          path={`/admin/categorias/${path.categoryID}/trabalho/${path.workID}/${path.workName}/medias`}
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
            Router.push(`/admin/categorias/`);
          }}
        >
          Cadastrar mais trabalhos
        </button>
        <button
          className="button"
          onClick={() => {
            Router.push(`/admin/categorias/${path.categoryID}/`);
          }}
        >
          Cadastrar mais trabalhos para a mesma categoria
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
  );
}
