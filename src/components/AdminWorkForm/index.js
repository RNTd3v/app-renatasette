import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

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
      picture
    }
  }
`;

import UploadFile from "../UploadFile";

export default function AdminWorkForm({ work, categoryID }) {
  const { data, client } = useQuery(GET_CAPA_WORK);

  const onCompleted = resposta => {
    console.log(resposta);
  };

  const onError = error => {
    console.error(error);
  };

  const [nameEN, setNameEN] = useState("");
  const [namePT, setNamePT] = useState("");
  const [descriptionEN, setDescriptionEN] = useState("");
  const [descriptionPT, setDescriptionPT] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);

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
      setDisabledButton(false);
    }
  });

  function checkDisabledButton() {
    if (
      (nameEN.length > 3 && namePT.length > 3 && (data && data.capaWork)) ||
      (work && work.picture)
    ) {
      setDisabledButton(false);
    }
  }

  return (
    <form
      className="form -grid"
      onSubmit={e => {
        e.preventDefault();
        work
          ? updateWork({
              variables: {
                id: work.id,
                categoryID,
                nameEN,
                namePT,
                descriptionEN,
                descriptionPT,
                picture: data && data.capaWork ? data.capaWork : work.picture
              }
            })
          : addWork({
              variables: {
                categoryID,
                nameEN,
                namePT,
                descriptionEN,
                descriptionPT,
                picture: data && data.capaWork ? data.capaWork : work.picture
              }
            });
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
          {(data && data.capaWork) || (work && work.picture) ? (
            <img src={data && data.capaWork ? data.capaWork : work.picture} />
          ) : null}

          <UploadFile />
        </div>
      </div>
      <button
        type="submit"
        className={`button -center`}
        disabled={
          (nameEN.length < 3 &&
            namePT.length < 3 &&
            !(data && data.capaWork)) ||
          !(work && work.picture)
        }
      >
        Salvar e continuar
      </button>
    </form>
  );
}
