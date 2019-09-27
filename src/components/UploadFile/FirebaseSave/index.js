import React from "react";
import { useApolloClient } from "@apollo/react-hooks";

import { storage } from "../../../services/firebase";

export const FirebaseSave = ({ file }) => {
  const client = useApolloClient();
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      error => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            client.writeData({ data: { capaWork: url } });
          });
      }
    );
  };

  return (
    <button className="button-save" onClick={handleUpload}>
      Salvar imagem
    </button>
  );
};
