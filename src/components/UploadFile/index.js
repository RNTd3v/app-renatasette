import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useApolloClient } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FirebaseSave } from "./FirebaseSave";

const GET_CAPA_WORK_FILE = gql`
  {
    tempCapaWorkFile @client
    tempCapaWorkBase64 @client
  }
`;

export const UploadFile = () => {
  const { data, client } = useQuery(GET_CAPA_WORK_FILE);

  const onDrop = useCallback(([file]) => {
    // client.writeData({ data: { tempCapaWorkFile: file } });
    console.log({ file });
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      console.log(reader.result);
      client.writeData({ data: { tempCapaWorkBase64: reader.result } });
    });
    reader.readAsDataURL(file);
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="upload-container">
      <input
        {...getInputProps()}
        type="file"
        id="picture"
        name="picture"
        className="input"
      />
      <div className="text">
        {isDragActive ? (
          <p>Arrastar o arquivo aqui ...</p>
        ) : (
          <p>Arrastar o arquivo ou clique para selecionar</p>
        )}
      </div>
      <img
        src={data && data.tempCapaWorkBase64 ? data.tempCapaWorkBase64 : ""}
      />
      <FirebaseSave
        file={data && data.tempCapaWorkFile ? data.tempCapaWorkFile : ""}
      />
    </div>
  );
};
