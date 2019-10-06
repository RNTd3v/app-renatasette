import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import gql from "graphql-tag";
import Vimeo from "@u-wave/react-vimeo";
import { Snackbar } from "@material/react-snackbar";
import UploadFile from "../../UploadFile";
import Router from "next/router";

const GET_URL_MEDIA = gql`
  {
    urlMedia @client
  }
`;

const ADD_MEDIA = gql`
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

const UPDATE_MEDIA = gql`
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

export default function AdminFormMedia({ media, workID, path, isFirst }) {
  const { data, client } = useQuery(GET_URL_MEDIA);
  const [message, setMessage] = useState(null);
  const [form, setValues] = useState({
    titleEN: "",
    titlePT: "",
    url: "",
    isMovie: true
  });

  const onCompleted = resposta => {
    console.log(resposta);
    setMessage("Media salva com sucesso");
    Router.push(path);
  };

  const onError = error => {
    console.error(error);
    setMessage(error);
  };

  const [updateMedia] = useMutation(UPDATE_MEDIA, {
    onCompleted,
    onError
  });

  const [addMedia] = useMutation(ADD_MEDIA, {
    onCompleted,
    onError
  });

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    });
  };

  useEffect(() => {
    if (media) {
      loadMedia();
    }
  }, [media]);

  function loadMedia() {
    setValues({
      titleEN: media.titleEN,
      titlePT: media.titlePT,
      url: media.url,
      isMovie: media.isMovie
    });
  }

  return (
    <>
      <form
        className="form -grid"
        onSubmit={e => {
          e.preventDefault();
          if (
            form.titleEN.length > 3 &&
            form.titlePT.length > 3 &&
            (form.url.length > 3 || (data && data.urlMedia))
          ) {
            const variables = {
              workID,
              titlePT: form.titlePT,
              titleEN: form.titleEN,
              isMovie: form.isMovie,
              url: data && data.urlMedia ? data.urlMedia : form.url
            };
            media
              ? updateMedia({
                  variables: {
                    ...variables,
                    id: media.id
                  }
                })
              : addMedia({
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
        {!isFirst ? (
          <label>
            É vídeo?:
            <input
              name="isMovie"
              type="checkbox"
              checked={form.isMovie}
              onChange={updateField}
            />
            Sim
          </label>
        ) : null}

        {form.isMovie ? (
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
        ) : (
          <UploadFile isMedia={true} />
        )}
        <button type="submit" className={`button -center`}>
          Salvar media
        </button>
        {form.isMovie && form.url ? (
          <Vimeo
            video={form.url}
            width={200}
            height={100}
            showByline={false}
            showTitle={false}
            showPortrait={false}
          />
        ) : (
          <img src={data && data.urlMedia ? data.urlMedia : form.url} />
        )}

        {message ? <Snackbar message={message} actionText="" /> : null}
      </form>
    </>
  );
}
