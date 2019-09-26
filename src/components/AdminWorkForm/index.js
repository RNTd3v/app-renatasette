import React, { useState } from "react";
import { useUpload } from "react-use-upload";
import gql from "graphql-tag";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      path
    }
  }
`;

import { UploadFile } from "../UploadFile";

const AdminWorkForm = ({ work }) => {
  let [file, setFile] = useState();

  let { loading, progress } = useUpload(file, {
    mutation: UPLOAD_FILE,
    variables: { file: { file, name: "test" } }
  });
  /*const onSelectFile = e => {
    if (e && e.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        console.log(reader.result), false;
      });
      reader.readAsDataURL(e[0]);
    }
  };*/
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
      <UploadFile />
      <div className="picture">
        <label className="label">Picture*</label>
        <input
          type="file"
          id="picture"
          name="picture"
          className="input"
          placeholder="Picture"
          onChange={e => setFile(e.target.files[0])}
        />
        <img src={work.picture || ""} />
        <small className="required">*Campos obrigatorios</small>
      </div>
      <button className={`button -center`}>Save and Continue</button>
    </form>
  );
};

export default AdminWorkForm;
