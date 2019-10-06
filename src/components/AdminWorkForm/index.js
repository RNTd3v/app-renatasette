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

  const [form, setValues] = useState({
    nameEN: "",
    namePT: "",
    descriptionEN: "",
    descriptionPT: "",
    picture: null
  });

  const [message, setMessage] = useState(null);
  const router = useRouter();

  const onCompleted = resposta => {
    console.log(resposta);
    const id = work ? resposta.updateWork.id : resposta.createWork.id;
    const name = work ? resposta.updateWork.namePT : resposta.createWork.namePT;

    router.push(
      `/admin/categorias/${categoryID}/trabalho/${id}/${name}/medias`
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

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (work) {
      loadWork();
    }
  }, [work]);

  function loadWork() {
    setValues({
      nameEN: work.nameEN,
      namePT: work.namePT,
      descriptionEN: work.descriptionEN,
      descriptionPT: work.descriptionPT,
      picture: work.picture
    });
  }

  return (
    <form
      className="form -grid"
      onSubmit={e => {
        e.preventDefault();
        if (
          (form.nameEN.length > 3 && form.namePT.length > 3 && form.picture) ||
          (data && data.capaWork)
        ) {
          const variables = {
            categoryID,
            nameEN: form.nameEN,
            namePT: form.namePT,
            descriptionEN: form.descriptionEN,
            descriptionPT: form.descriptionPT,
            picture: data && data.capaWork ? data.capaWork : form.picture
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
          id="nameEN"
          name="nameEN"
          className="input"
          placeholder="Title*"
          value={form.nameEN}
          onChange={updateField}
        />
        <textarea
          placeholder="Description"
          id="descriptionEN"
          name="descriptionEN"
          className="textarea"
          value={form.descriptionEN}
          onChange={updateField}
        ></textarea>
      </div>
      <div className="col">
        <small>Português</small>
        <input
          type="text"
          id="namePT"
          name="namePT"
          className="input"
          placeholder="Título*"
          value={form.namePT}
          onChange={updateField}
        />
        <textarea
          placeholder="Descrição"
          id="descriptionPT"
          name="descriptionPT"
          className="textarea"
          value={form.descriptionPT}
          onChange={updateField}
        ></textarea>
      </div>
      <div className="picture">
        <label className="label">Imagem principal do trabalho*</label>
        <div className="capa">
          {(data && data.capaWork) || form.picture ? (
            <img src={data && data.capaWork ? data.capaWork : form.picture} />
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
