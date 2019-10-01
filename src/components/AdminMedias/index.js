import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Snackbar } from "@material/react-snackbar";

const GET_CAPA_WORK = gql`
  {
    capaWork @client
  }
`;

const ADD_MEDIA = gql`
  mutation createMedia(
    $workID: String!
    $titlePT: String!
    $titleEN: String!
    $isMovie: Boolean
    $url: String
  ) {
    createMedia(
      workID: $workID
      titlePT: $titlePT
      titleEN: $titleEN
      isMovie: $isMovie
      url: $url
    ) {
      id
      workID
      titlePT
      titleEN
      isMovie
      url
    }
  }
`;

const UPDATE_MEDIA = gql`
  mutation updateMedia(
    $id: String!
    $workID: String!
    $titlePT: String!
    $titleEN: String!
    $isMovie: Boolean
    $url: String
  ) {
    updateMedia(
      id: $id
      workID: $workID
      titlePT: $titlePT
      titleEN: $titleEN
      isMovie: $isMovie
      url: $url
    ) {
      id
      workID
      titlePT
      titleEN
      isMovie
      url
    }
  }
`;

import UploadFile from "../UploadFile";

export default function AdminMedias({ medias, workID }) {
  const { data, client } = useQuery(GET_CAPA_WORK);
  const [nameEN, setNameEN] = useState("");
  const [namePT, setNamePT] = useState("");
  const [descriptionEN, setDescriptionEN] = useState("");
  const [descriptionPT, setDescriptionPT] = useState("");
  const [picture, setPicture] = useState(null);
  const [message, setMessage] = useState(null);

  const onCompleted = resposta => {
    console.log(resposta);
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
    <>
      <AdminCapaMedia capa={medias[0]} workID={workID} />

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
    </>
  );
}
