import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

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

export default function AdminListMedias({ medias, workID }) {
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
      Router.push(`/admin/categorias/${categoryID}`);
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
        <AdminFormMedia media={selectedMedia} workID={workID} />
        <div className="list">
          {medias.slice(1).map((m, i) => (
            <div className="item" key={i}>
              {m.isMovie ? (
                <Vimeo
                  video={m.url}
                  width={300}
                  showByline={false}
                  showTitle={false}
                  showPortrait={false}
                />
              ) : (
                <img src={m.url} />
              )}
              <div className="action">
                <button
                  className="bt-edit"
                  onClick={() => {
                    setSelectedMedia(m);
                  }}
                >
                  Editar
                </button>
                <button
                  className="bt-delete"
                  onClick={() => {
                    setDeleteMedia(m.id);
                    setOpenModal(true);
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
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
