import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import gql from "graphql-tag";

import { Snackbar } from "@material/react-snackbar";

const GET_CAPA_WORK = gql`
  {
    capaWork @client
  }
`;

const ADD_BANNER = gql`
  mutation createSlider(
    $linkPT: String
    $linkEN: String
    $titlePT: String!
    $titleEN: String!
    $picture: String
  ) {
    createSlider(
      linkPT: $linkPT
      linkEN: $linkEN
      titlePT: $titlePT
      titleEN: $titleEN
      picture: $picture
    ) {
      id
      titlePT
      picture
    }
  }
`;

const UPDATE_BANNER = gql`
  mutation updateSlider(
    $id: ID!
    $titlePT: String!
    $titleEN: String!
    $picture: String
    $linkPT: String
    $linkEN: String
  ) {
    updateSlider(
      id: $id
      titlePT: $titlePT
      titleEN: $titleEN
      picture: $picture
      linkPT: $linkPT
      linkEN: $linkEN
    ) {
      id
      titlePT
      picture
    }
  }
`;

import UploadFile from "../UploadFile";

export default function AdminSliderForm({ slider }) {
  const { data, client } = useQuery(GET_CAPA_WORK);

  const [form, setValues] = useState({
    titleEN: "",
    titlePT: "",
    linkEN: "",
    linkPT: "",
    picture: null
  });

  const [message, setMessage] = useState(null);
  const router = useRouter();

  const onCompleted = resposta => {
    setMessage("Banner Cadastrado com sucesso!");
    router.push(`/admin/banner/`);
  };

  const onError = error => {
    console.error(error);
    setMessage(error);
  };

  const [updateBanner] = useMutation(UPDATE_BANNER, {
    onCompleted,
    onError
  });

  const [addBanner] = useMutation(ADD_BANNER, {
    onCompleted,
    onError
  });

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (slider) {
      loadSlider();
    }
  }, [slider]);

  function loadSlider() {
    setValues({
      titleEN: slider.titleEN,
      titlePT: slider.titlePT,
      linkEN: slider.linkEN,
      linkPT: slider.linkPT,
      picture: slider.picture
    });
  }

  return (
    <form
      className="form -grid"
      onSubmit={e => {
        e.preventDefault();
        if (
          (form.titleEN.length > 3 &&
            form.titlePT.length > 3 &&
            form.picture) ||
          (data && data.capaWork)
        ) {
          const variables = {
            titleEN: form.titleEN,
            titlePT: form.titlePT,
            linkEN: form.linkEN,
            linkPT: form.linkPT,
            picture: data && data.capaWork ? data.capaWork : form.picture
          };
          slider
            ? updateBanner({
                variables: {
                  ...variables,
                  id: slider.id
                }
              })
            : addBanner({
                variables
              });
        } else {
          setMessage("Os campos com * são obrigatórios");
        }
      }}
    >
      <div className="col">
        <small>English</small>
        <input
          type="text"
          id="titleEN"
          name="titleEN"
          className="input"
          placeholder="Title*"
          value={form.titleEN}
          onChange={updateField}
        />
        <input
          type="text"
          id="linkEN"
          name="linkEN"
          className="input"
          placeholder="Link"
          value={form.linkEN}
          onChange={updateField}
        />
      </div>
      <div className="col">
        <small>Português</small>
        <input
          type="text"
          id="titlePT"
          name="titlePT"
          className="input"
          placeholder="Titulo"
          value={form.titlePT}
          onChange={updateField}
        />
        <input
          type="text"
          id="linkPT"
          name="linkPT"
          className="input"
          placeholder="Link"
          value={form.linkPT}
          onChange={updateField}
        />
      </div>
      <div className="picture">
        <label className="label">Imagem do banner*</label>
        <div className="capa">
          {(data && data.capaWork) || form.picture ? (
            <img src={data && data.capaWork ? data.capaWork : form.picture} />
          ) : null}

          <UploadFile />
        </div>
      </div>
      <button type="submit" className={`button -center`}>
        Salvar
      </button>
      {message ? <Snackbar message={message} actionText="" /> : null}
    </form>
  );
}
