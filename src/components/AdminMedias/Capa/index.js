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
    $url: String!
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
    $url: String!
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
  const [message, setMessage] = useState(null);
  const [form, setValues] = useState({
    titleEN: "",
    titlePT: "",
    url: ""
  });

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

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (capa) {
      setValues({
        titleEN: capa.titleEN,
        titlePT: capa.titlePT,
        url: capa.url
      });
    }
  }, []);

  return (
    <div className="capa-media">
      <div className="video">
        {form.url ? (
          <Vimeo
            video={form.url}
            width={300}
            showByline={false}
            showTitle={false}
            showPortrait={false}
          />
        ) : (
          <p className="text-none">Nenhum video de capa adicionado</p>
        )}
      </div>
      <form
        className="form -grid"
        onSubmit={e => {
          e.preventDefault();
          if (
            form.titleEN.length > 3 &&
            form.titlePT.length > 3 &&
            form.url.length > 3
          ) {
            const variables = {
              workID,
              titlePT: form.titlePT,
              titleEN: form.titleEN,
              isMovie: true,
              url: form.url
            };
            capa
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
        <label>
          Título (EN):
          <input
            type="text"
            id="titleEN"
            name="titleEN"
            className="input"
            placeholder="Title*"
            value={form.titleEN}
            onChange={updateField}
          />
        </label>
        <label>
          Título (PT):
          <input
            type="text"
            id="titlePT"
            name="titlePT"
            className="input"
            placeholder="Título*"
            value={form.titlePT}
            onChange={updateField}
          />
        </label>
        <label>
          Código do vídeo no Vimeo:
          <input
            type="text"
            id="url"
            name="url"
            className="input"
            placeholder="Código do vídeo no vimeo"
            value={form.url}
            onChange={updateField}
          />
        </label>
        <button type="submit" className={`button -center`}>
          Salvar capa
        </button>
        {message ? <Snackbar message={message} actionText="" /> : null}
      </form>
    </div>
  );
}
