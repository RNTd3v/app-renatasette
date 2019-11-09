import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Snackbar } from "@material/react-snackbar";
import dynamic from "next/dynamic";

const CKEditor = dynamic(() => import("../../../src/components/CKEditor"), {
  ssr: false
});

const GET_CAPA_WORK = gql`
  {
    capaWork @client
  }
`;

const UPDATE_BIO = gql`
  mutation updateBio(
    $id: String!
    $titlePT: String!
    $titleEN: String!
    $contentEN: String
    $contentPT: String
    $picture: String
  ) {
    updateBio(
      id: $id
      titlePT: $titlePT
      titleEN: $titleEN
      contentEN: $contentEN
      contentPT: $contentPT
      picture: $picture
    ) {
      id
    }
  }
`;

import UploadFile from "../UploadFile";

export default function AdminBio({ bio }) {
  const { data, client } = useQuery(GET_CAPA_WORK);
  const [message, setMessage] = useState(null);
  const [form, setValues] = useState({
    contentEN: "",
    contentPT: "",
    titlePT: "",
    titleEN: "",
    id: "",
    picture: ""
  });

  const onCompleted = resposta => {
    console.log(resposta);
    setMessage("Bio salvo com sucesso");
  };

  const onError = error => {
    console.error(error);
    setMessage(error);
  };

  const [updateBio] = useMutation(UPDATE_BIO, {
    onCompleted,
    onError
  });

  useEffect(() => {
    if (bio) {
      setValues({
        ...bio
      });
    }
  }, [bio]);

  return (
    <form
      className="form -grid"
      onSubmit={e => {
        e.preventDefault();
        updateBio({
          variables: {
            id: form.id,
            titleEN: form.titleEN,
            titlePT: form.titlePT,
            contentEN: form.contentEN,
            contentPT: form.contentPT,
            picture: data && data.capaWork ? data.capaWork : form.picture
          }
        });
      }}
    >
      <div className="col">
       <div className="editor">
          <h3 className="title">Content (En)</h3>
          <CKEditor
            data={form.contentEN}
            onChange={(event, editor) => {
              const data = editor.getData();
              setValues({
                ...form,
                contentEN: data
              });
            }}
          />
        </div>
      </div>
      <div className="col">
        <div className="editor">
          <h3 className="title">Contéudo (Pt)</h3>
          <CKEditor
            data={form.contentPT}
            onChange={(event, editor) => {
              const data = editor.getData();
              setValues({
                ...form,
                contentPT: data
              });
            }}
          />
        </div>
      </div>
      <div className="picture">
        <label className="label">Imagem</label>
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
