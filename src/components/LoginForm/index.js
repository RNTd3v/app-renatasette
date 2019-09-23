import React, { useRef } from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import cookie from "cookie";
import redirect from "../../lib/redirect";

const LOGIN_USER = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      token
      name
      id
    }
  }
`;

export default function LoginForm() {
  const client = useApolloClient();

  const onCompleted = data => {
    // Store the token in cookie
    document.cookie = cookie.serialize("token", data.authenticate.token, {
      sameSite: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });
    document.cookie = cookie.serialize("userID", data.authenticate.id, {
      sameSite: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });
    document.cookie = cookie.serialize("userName", data.authenticate.name, {
      sameSite: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });
    // Force a reload of all the current queries now that the user is
    // logged in
    client.cache.reset().then(() => {
      redirect({}, "/admin");
    });
  };

  const onError = error => {
    // If you want to send error to external service?
    console.error(error);
  };

  const email = useRef(null);
  const password = useRef(null);

  const [login, { data }] = useMutation(LOGIN_USER, {
    onCompleted,
    onError
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        login({
          variables: {
            email: email.current.value,
            password: password.current.value
          }
        });
        email.current.value = password.current.value = "";
      }}
      className="form"
    >
      <input
        type="text"
        className="input"
        name="email"
        placeholder="Email"
        ref={email}
      />
      <input
        type="password"
        className="input"
        name="password"
        placeholder="Senha"
        ref={password}
      />
      <button className="link">Esqueci minha senha</button>
      <button type="submit" className="button">
        {" "}
        Entrar
      </button>
    </form>
  );
}
