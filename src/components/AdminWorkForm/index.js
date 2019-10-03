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

const ADD_WORK = gql`
  mutation createWork(
    $categoryID: String!
    $namePT: String!
    $nameEN: String!
    $descriptionPT: String
    $descriptionEN: String
    $picture: String!
  ) {
    createWork(
      categoryID: $categoryID
      namePT: $namePT
      nameEN: $nameEN
      descriptionPT: $descriptionPT
      descriptionEN: $descriptionEN
      picture: $picture
    ) {
      id
      namePT
      picture
    }
  }
`;

const UPDATE_WORK = gql`
  mutation updateWork(
    $id: String!
    $categoryID: String!
    $namePT: String!
    $nameEN: String!
    $descriptionPT: String
    $descriptionEN: String
    $picture: String!
  ) {
    updateWork(
      id: $id
      categoryID: $categoryID
      namePT: $namePT
      nameEN: $nameEN
      descriptionPT: $descriptionPT
      descriptionEN: $descriptionEN
      picture: $picture
    ) {
      id
      namePT
      picture
    }
  }
`;

import UploadFile from "../UploadFile";

export default function AdminWorkForm({ work, categoryID }) {
  const { data, client } = useQuery(GET_CAPA_WORK);
  const [nameEN, setNameEN] = useState("");
  const [namePT, setNamePT] = useState("");
  const [descriptionEN, setDescriptionEN] = useState("");
  const [descriptionPT, setDescriptionPT] = useState("");
  const [picture, setPicture] = useState(null);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const onCompleted = resposta => {
    console.log(resposta);
    router.push(
      `/admin/categorias/${categoryID}/trabalho/${resposta.createWork.id}/${resposta.createWork.namePT}/medias`
    );
  };

  const onError = error => {
    console.error(error);
    setMessage(error);
  };

  const [updateWork] = useMutation(UPDATE_WORK, {
    onCompleted,
    onError
  });

  const [addWork] = useMutation(ADD_WORK, {
    onCompleted,
    onError
  });

  useEffect(() => {
    if (work) {
      setNameEN(work.nameEN);
      setNamePT(work.namePT);
      setDescriptionEN(work.descriptionEN);
      setDescriptionPT(work.descriptionPT);
      setPicture(work.picture);
    }
  });

  return (
    <form
      className="form -grid"
      onSubmit={e => {
        e.preventDefault();
        if (
          (nameEN.length > 3 && namePT.length > 3 && picture) ||
          (data && data.capaWork)
        ) {
          const variables = {
            categoryID,
            nameEN,
            namePT,
            descriptionEN,
            descriptionPT,
            picture: data && data.capaWork ? data.capaWork : picture
          };
          work
            ? updateWork({
                variables: {
                  ...variables,
                  id: work.id
                }
              })
            : addWork({
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
          id="title"
          name="title"
          className="input"
          placeholder="Title*"
          value={nameEN}
          onChange={event => {
            setNameEN(event.target.value);
          }}
        />
        <textarea
          placeholder="Description"
          id="description"
          name="description"
          className="textarea"
          value={descriptionEN}
          onChange={event => {
            setDescriptionEN(event.target.value);
          }}
        ></textarea>
      </div>
      <div className="col">
        <small>Português</small>
        <input
          type="text"
          id="titulo"
          name="title_pt"
          className="input"
          placeholder="Título*"
          value={namePT}
          onChange={event => setNamePT(event.target.value)}
        />
        <textarea
          placeholder="Descrição"
          id="descricao"
          name="description_pt"
          className="textarea"
          value={descriptionPT}
          onChange={event => setDescriptionPT(event.target.value)}
        ></textarea>
      </div>
      <div className="picture">
        <label className="label">Imagem principal do trabalho*</label>
        <div className="capa">
          {(data && data.capaWork) || picture ? (
            <img src={data && data.capaWork ? data.capaWork : picture} />
          ) : null}

          <UploadFile />
        </div>
      </div>
      <button type="submit" className={`button -center`}>
        Salvar e continuar
      </button>
      {message ? <Snackbar message={message} actionText="" /> : null}
    </form>
  );
}
