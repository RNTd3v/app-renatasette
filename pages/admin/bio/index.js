import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../../../src/lib/apollo-auth";
import redirect from "../../../src/lib/redirect";
import checkLoggedIn from "../../../src/lib/checkLoggedIn";
import "../../../src/styles/main.scss";

import { Snackbar } from "@material/react-snackbar";
import AdminHeader from "../../../src/components/AdminHeader";

import dynamic from "next/dynamic";

const GET_BIO = gql`
  query {
    biosAuth {
      titlePT
      titleEN
      contentPT
      contentEN
      id
    }
  }
`;

const UPDATE_BIO = gql`
  mutation updateBio(
    $id: String!
    $titlePT: String!
    $titleEN: String!
    $contentEN: String
    $contentPT: String
  ) {
    updateBio(
      id: $id
      titlePT: $titlePT
      titleEN: $titleEN
      contentEN: $contentEN
      contentPT: $contentPT
    ) {
      id
    }
  }
`;

const CKEditor = dynamic(() => import("../../../src/components/CKEditor"), {
  ssr: false
});

const BioAdminPage = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_BIO);
  const [message, setMessage] = useState(null);
  const [form, setValues] = useState({
    contentEN: "",
    contentPT: "",
    titlePT: "",
    titleEN: "",
    id: ""
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
    if (data && data.biosAuth) {
      const { contentEN, contentPT, id, titlePT, titleEN } = data.biosAuth[0];
      setValues({
        contentEN,
        contentPT,
        titleEN,
        titlePT,
        id
      });
    }
  }, []);

  return (
    <section className="admin">
      <AdminHeader showButtonBack={true} route={"/admin"} />
      <main className="main">
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
        <button
          className="button -center"
          onClick={e => {
            e.preventDefault();
            updateBio({
              variables: {
                id: form.id,
                titleEN: form.titleEN,
                titlePT: form.titlePT,
                contentEN: form.contentEN,
                contentPT: form.contentPT
              }
            });
          }}
        >
          Salvar
        </button>
        {message ? <Snackbar message={message} actionText="" /> : null}
      </main>
    </section>
  );
};

BioAdminPage.getInitialProps = async context => {
  const loggedInUser = checkLoggedIn(context);
  if (!loggedInUser.id) {
    redirect(context, "/admin/login");
  }

  return {};
};

export default withApollo(BioAdminPage);
