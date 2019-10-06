import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import gql from "graphql-tag";

import { Snackbar } from "@material/react-snackbar";

const GET_CAPA_PROJECT = gql`
  {
    capaWork @client
  }
`;

const ADD_PROJECT = gql`
  mutation createProject(
    $namePT: String!
    $nameEN: String!
    $descriptionPT: String
    $descriptionEN: String
    $picture: String!
  ) {
    createProject(
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

const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: String!
    $namePT: String!
    $nameEN: String!
    $descriptionPT: String
    $descriptionEN: String
    $picture: String!
  ) {
    updateProject(
      id: $id
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

export default function AdminProjectForm({ project }) {
  const { data, client } = useQuery(GET_CAPA_PROJECT);

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
    const id = project ? resposta.updateProject.id : resposta.createProject.id;
    const name = project
      ? resposta.updateProject.namePT
      : resposta.createProject.namePT;

    router.push(`/admin/projects/${id}/${name}/medias`);
  };

  const onError = error => {
    console.error(error);
    setMessage(error);
  };

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    onCompleted,
    onError
  });

  const [addProject] = useMutation(ADD_PROJECT, {
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
    if (project) {
      loadProject();
    }
  }, [project]);

  function loadProject() {
    setValues({
      nameEN: project.nameEN,
      namePT: project.namePT,
      descriptionEN: project.descriptionEN,
      descriptionPT: project.descriptionPT,
      picture: project.picture
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
            nameEN: form.nameEN,
            namePT: form.namePT,
            descriptionEN: form.descriptionEN,
            descriptionPT: form.descriptionPT,
            picture: data && data.capaWork ? data.capaWork : form.picture
          };
          project
            ? updateProject({
                variables: {
                  ...variables,
                  id: project.id
                }
              })
            : addProject({
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
        <label className="label">Imagem principal do projeto*</label>
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
