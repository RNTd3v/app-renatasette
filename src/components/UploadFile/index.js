import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { storage } from "../../services/firebase";

export default function UploadFile() {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [sourceImage, setSourceImage] = useState("");
  const [progress, setProgress] = useState(0);
  const client = useApolloClient();

  function handleChange(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSourceImage(reader.result);
      });
      reader.readAsDataURL(image);
    }
  }
  function handleUpload(e) {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
            setSourceImage(null);
            setImage(null);
            client.writeData({ data: { capaWork: url } });
          });
      }
    );
  }
  return (
    <div className="uploadWrapper">
      <div className="input">
        <input type="file" onChange={handleChange} />
        <span className="texto">
          Arraste uma imagem ou clique para selecionar uma
        </span>
        {sourceImage ? (
          <>
            <img src={sourceImage} alt="Uploaded images" />
            <progress value={progress} max="100" />
          </>
        ) : null}
      </div>
      {image ? (
        <button onClick={handleUpload}>Salvar essa foto</button>
      ) : (
        <p className="message">
          {url
            ? "A imagem foi salva e estará no trabalho após clicar no botão abaixo"
            : ""}
        </p>
      )}
    </div>
  );
}
