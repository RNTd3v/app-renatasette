import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Vimeo from "@u-wave/react-vimeo";
import { Snackbar } from "@material/react-snackbar";

const ADD_CAPA = gql`
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

const UPDATE_CAPA = gql`
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

export default function AdminCapaMedia({ capa, workID }) {
  const [titleEN, setTitleEN] = useState("");
  const [titlePT, setTitlePT] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);

  const onCompleted = resposta => {
    console.log(resposta);
    setMessage("Capa salva com sucesso");
  };

  const onError = error => {
    console.error(error);
    setMessage(error);
  };

  const [updateCapa] = useMutation(UPDATE_CAPA, {
    onCompleted,
    onError
  });

  const [addCapa] = useMutation(ADD_CAPA, {
    onCompleted,
    onError
  });

  useEffect(() => {
    if (capa) {
      setTitleEN(capa.titleEN);
      setTitlePT(capa.titlePT);
      setUrl(capa.url);
    }
  });

  return (
    <>
      {url ? (
        <Vimeo
          video={url}
          width={300}
          showByline={false}
          showTitle={false}
          showPortrait={false}
        />
      ) : null}

      <form
        className="form -grid"
        onSubmit={e => {
          e.preventDefault();
          if (titleEN.length > 3 && titlePT.length > 3 && url.length > 3) {
            const variables = {
              workID,
              titlePT,
              titleEN,
              isMovie: true,
              url
            };
            work
              ? updateCapa({
                  variables: {
                    ...variables,
                    id: capa.id
                  }
                })
              : addCapa({
                  variables
                });
          } else {
            setMessage("Os campos com * são obrigatórios");
          }
        }}
      >
        <div className="col">
          <input
            type="text"
            id="titleEN"
            name="titleEN"
            className="input"
            placeholder="Title*"
            value={titleEN}
            onChange={event => {
              setTitleEN(event.target.value);
            }}
          />
          <input
            type="text"
            id="titlePT"
            name="titlePT"
            className="input"
            placeholder="Título*"
            value={titlePT}
            onChange={event => {
              setTitlePT(event.target.value);
            }}
          />
          <input
            type="text"
            id="url"
            name="title"
            className="input"
            placeholder="Código do vídeo no vimeo"
            value={url}
            onChange={event => {
              setUrl(event.target.value);
            }}
          />
        </div>
        <button type="submit" className={`button -center`}>
          Salvar capa
        </button>
        {message ? <Snackbar message={message} actionText="" /> : null}
      </form>
    </>
  );
}
