import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_CAPA_WORK = gql`
  {
    capaWork @client
  }
`;

import { UploadFile } from "../UploadFile";

const AdminWorkForm = ({ work }) => {
  const { data, client } = useQuery(GET_CAPA_WORK);
  if (data && data.capaWork) {
    console.log("Comp Pai");
    console.log(data.capaWork);
  }
  return (
    <form className="form -grid" onSubmit={() => {}}>
      <div className="col">
        <small>English</small>
        <input
          type="text"
          id="title"
          name="title"
          className="input"
          value={work.nameEN || ""}
          placeholder="Title*"
          onChange={event => {}}
        />
        <textarea
          placeholder="Description"
          id="description"
          name="description"
          value={work.descriptionEN || ""}
          className="textarea"
          onChange={event => {}}
        ></textarea>
      </div>
      <div className="col">
        <small>Português</small>
        <input
          type="text"
          id="titulo"
          name="title_pt"
          className="input"
          value={work.namePT || ""}
          placeholder="Título*"
          onChange={event => {}}
        />
        <textarea
          placeholder="Descrição"
          id="descricao"
          name="description_pt"
          value={work.descriptionPT || ""}
          className="textarea"
          onChange={event => {}}
        ></textarea>
      </div>
      <div className="picture">
        <label className="label">Imagem principal do trabalho*</label>
        <div className="capa">
          <img src={work.picture || data.capaWork} />
          <UploadFile />
        </div>
        <small className="required">*Campos obrigatorios</small>
      </div>
      <button className={`button -center`}>Save and Continue</button>
    </form>
  );
};

export default AdminWorkForm;
