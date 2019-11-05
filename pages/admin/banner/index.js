import React, { useState } from "react";
import Router from "next/router";

import { useRouter } from "next/router";
import Modal from "react-responsive-modal";
import Link from "next/link";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../../../src/lib/apollo-auth";
import redirect from "../../../src/lib/redirect";
import checkLoggedIn from "../../../src/lib/checkLoggedIn";
import "../../../src/styles/main.scss";

import AdminHeader from "../../../src/components/AdminHeader";
import Loading from "../../../src/components/Loading";

const GET_BANNER = gql`
  query sliderAuth {
    sliderAuth {
      id
      linkPT
      linkEN
      titlePT
      titleEN
      picture
    }
  }
`;

const DELETE_BANNER = gql`
  mutation deleteSlider($id: String!) {
    deleteSlider(id: $id) {
      id
    }
  }
`;

const BannerAdminPage = () => {
  const [deleteBanner, setDeleteBanner] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onCompleted = resposta => {
    console.log(resposta);
    if (resposta.deleteSlider.id) {
      router.push(`/admin/banner`);
      setOpenModal(false);
    }
  };

  const onError = error => {
    console.error(error);
  };

  const [deleteConfirmBanner] = useMutation(DELETE_BANNER, {
    onCompleted,
    onError
  });

  const { data, loading, error } = useQuery(GET_BANNER);
  if (data && data.sliderAuth) {
    const slider = data.sliderAuth;
    return (
      <section className="admin">
        <AdminHeader showButtonBack={true} route={"/admin"} />
        <main className="main">
          <h1 className="title">Banner</h1>
          <Link href="/admin/banner/add">
            <button className="bt-add">Adicionar banner</button>
          </Link>

          <ul className="table">
            <li className="row -head">
              <div className="col -img">Imagem</div>
              <div className="col -flex">Nome</div>
              <div className="col -act">Ação</div>
            </li>
            {slider.map((slider, i) => (
              <li className="row" key={i}>
                <div className="col -img">
                  <img src={slider.picture} className="picture" />
                </div>
                <div className="col -flex">{slider.titlePT}</div>
                <div className="col -act">
                  <div className="icon -editar action">
                    <Link
                      href="/admin/banner/[bannerID]"
                      as={`/admin/banner/${slider.id}`}
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
                      setDeleteBanner(slider.id);
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
              Você tem certeza que deseja excluir este banner?
            </p>
            <button
              className="button-modal"
              onClick={() => {
                deleteConfirmBanner({
                  variables: {
                    id: deleteBanner
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

BannerAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(BannerAdminPage);
