import React, { useState, useEffect } from "react";
import Router from "next/router";
import Modal from "react-responsive-modal";
import Link from "next/link";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const DELETE_WORK = gql`
  mutation deleteWork($id: String!) {
    deleteWork(id: $id) {
      id
    }
  }
`;

const UPDATE_ORDER_WORK = gql`
  mutation updateOrderWork(
    $id: String!
    $order_by: Float
  ) {
    updateOrderWork(
      id: $id
      order_by: $order_by
    ) {
      id
      namePT
    }
  }
`;

const AdminListWorks = ({ works }) => {
  const [deleteWork, setDeleteWork] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [changeTheOrder, setChangeTheOrder] = useState(false);
  const [listWorks, setListWorks] = useState([]);
  const [draggedWork, setDraggedWork] = useState({});
  const [draggedIdx, setDraggedIdx] = useState(null);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const saveOrderWork = () => {
    setChangeTheOrder(false);
    listWorks.forEach((work, index) => {
      updateOrderWorks({
        variables: {
          id: work.id,
          order_by: index
        }
      })
    });
  };

  const onCompleted = resposta => {
    if (resposta.deleteWork.id || resposta.updateOrderWork) {
      setOpenModal(false);
      Router.push(`/admin/categorias/${work.categoryID}`);
    }
  };

  const onError = error => {
    console.error(error);
  };

  const onDragStart = (e, index) => {
    setDraggedWork(listWorks[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const onDragOver = index => {
    const draggedOverWork = listWorks[index];
    // if the item is dragged over itself, ignore
    if (draggedWork === draggedOverWork) {
      return;
    }

    // filter out the currently dragged item
    let works = listWorks.filter(work => work !== draggedWork);

    // add the dragged item after the dragged over item
    works.splice(index, 0, draggedWork);

    setListWorks(works);
    setChangeTheOrder(true);
  };

  const onDragEnd = () => {
    setDraggedIdx(null);
  };

  const goMedias = (categoryID, workID, workName) => {
    Router.push(
      `/admin/categorias/${categoryID}/trabalho/${workID}/${workName}/medias`
    );
  };

  const [deleteConfirmWork] = useMutation(DELETE_WORK, {
    onCompleted,
    onError
  });

  const [updateOrderWorks] = useMutation(UPDATE_ORDER_WORK, {
    onCompleted,
    onError
  });

  useEffect(() => {
    if (works) {
      setListWorks(works);
    }
  }, [works]);

  return (
    <>
      <ul className="table">
        <li className="row -head">
          <div className="col -img">Imagem</div>
          <div className="col -flex">Nome</div>
          <div className="col -act">Ação</div>
        </li>
        {listWorks.map((work, i) => (
          <li className="row" key={i} onDragOver={() => onDragOver(i)}>
            <i
              className="fas fa-bars icon"
              draggable
              onDragStart={e => onDragStart(e, i)}
              onDragEnd={onDragEnd}
            ></i>
            <div className="col -img">
              <img src={work.picture} className="picture" />
            </div>
            <div className="col -flex">{work.namePT}</div>
            <div className="col -act">
              <div className="icon -editar action">
                <Link
                  href="/admin/categorias/[categoryID]/trabalho/[workID]"
                  as={`/admin/categorias/${work.categoryID}/trabalho/${work.id}`}
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
              <div
                className="icon -medias action"
                onClick={() => {
                  goMedias(work.categoryID, work.id, work.namePT);
                }}
              >
                <i class="fas fa-images icon"></i>
                <small className="text">Medias</small>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        className={`button -center ${!changeTheOrder ? "-disabled" : ""}`}
        disabled={!changeTheOrder}
        onClick={() => saveOrderWork()}
      >
        Salvar a ordem
      </button>
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
};

export default AdminListWorks;
