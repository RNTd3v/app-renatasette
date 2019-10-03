import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Vimeo from "@u-wave/react-vimeo";
import { Snackbar } from "@material/react-snackbar";
import UploadFile from "../../UploadFile";

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

export default function AdminFormMedia({ media, workID }) {
  const { data, client } = useQuery(GET_URL_MEDIA);
  const [titleEN, setTitleEN] = useState("");
  const [titlePT, setTitlePT] = useState("");
  const [url, setUrl] = useState("");
  const [isMovie, setIsMovie] = useState(false);
  const [message, setMessage] = useState(null);

  const onCompleted = resposta => {
    console.log(resposta);
    setMessage("Media salva com sucesso");
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

  useEffect(() => {
    if (media) {
      setTitleEN(media.titleEN);
      setTitlePT(media.titlePT);
      setUrl(media.url);
      setIsMovie(media.isMovie);
    }
  });

  return (
    <>
      <form
        className="form -grid"
        onSubmit={e => {
          e.preventDefault();
          if (titleEN.length > 3 && titlePT.length > 3 && url.length > 3) {
            const variables = {
              workID,
              titlePT,
              titleEN,
              isMovie,
              url
            };
            work
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
          {isMovie ? (
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
          ) : (
            <UploadFile isMedia={true} />
          )}
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
        {isMovie ? (
          <Vimeo
            video={url}
            width={300}
            showByline={false}
            showTitle={false}
            showPortrait={false}
          />
        ) : (
          <img src={data && data.urlMedia ? data.urlMedia : url} />
        )}
        <button type="submit" className={`button -center`}>
          Salvar media
        </button>
        {message ? <Snackbar message={message} actionText="" /> : null}
      </form>
    </>
  );
}
