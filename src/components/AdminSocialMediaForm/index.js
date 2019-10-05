import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Snackbar } from "@material/react-snackbar";

const UPDATE_SOCIALMEDIA = gql`
  mutation updateSocialMedia(
    $id: String!
    $name: String!
    $icon: String!
    $url: String!
  ) {
    updateSocialMedia(id: $id, name: $name, icon: $icon, url: $url) {
      id
    }
  }
`;

export default function AdminSocialMediaForm({ socialMedia }) {
  const [message, setMessage] = useState(null);
  const [form, setValues] = useState({
    ...socialMedia
  });

  const onCompleted = resposta => {
    console.log(resposta);
    setMessage(`${socialMedia.name} atualizado com sucesso`);
  };

  const onError = error => {
    console.error(error);
    setMessage(error);
  };

  const [updateSocialMedia] = useMutation(UPDATE_SOCIALMEDIA, {
    onCompleted,
    onError
  });

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <form
        className="form -grid -socialmedia-admin"
        onSubmit={e => {
          e.preventDefault();
          updateSocialMedia({
            variables: {
              ...form
            }
          });
        }}
      >
        <label>
          Link
          <input
            type="text"
            id="url"
            name="url"
            className="input"
            value={form.url}
            onChange={updateField}
          />
        </label>
        <button type="submit" className={`button -center`}>
          Salvar
        </button>
        {message ? <Snackbar message={message} actionText="" /> : null}
      </form>
    </>
  );
}
