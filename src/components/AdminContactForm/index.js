import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Snackbar } from "@material/react-snackbar";

const UPDATE_CONTACT = gql`
  mutation updateContact(
    $id: String!
    $phone: String
    $cellPhone: String
    $email: String
    $email2: String
    $street: String
    $number: String
    $district: String
    $city: String
    $state: String
    $cep: String
  ) {
    updateContact(
      id: $id
      phone: $phone
      cellPhone: $cellPhone
      email: $email
      email2: $email2
      street: $street
      number: $number
      district: $district
      city: $city
      state: $state
      cep: $cep
    ) {
      id
    }
  }
`;

export default function AdminFormContact({ contact }) {
  const [message, setMessage] = useState(null);
  const [form, setValues] = useState({
    ...contact
  });

  const onCompleted = resposta => {
    console.log(resposta);
    setMessage("Dados de contato salvo com sucesso");
  };

  const onError = error => {
    console.error(error);
    setMessage(error);
  };

  const [updateContact] = useMutation(UPDATE_CONTACT, {
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
        className="form -grid -contact-admin"
        onSubmit={e => {
          e.preventDefault();
          updateContact({
            variables: {
              ...form
            }
          });
        }}
      >
        <label>
          Telefone
          <input
            type="text"
            id="phone"
            name="phone"
            className="input"
            value={form.phone}
            onChange={updateField}
          />
        </label>
        <label>
          Celular
          <input
            type="text"
            id="cellPhone"
            name="cellPhone"
            className="input"
            value={form.cellPhone}
            onChange={updateField}
          />
        </label>
        <label>
          E-mail
          <input
            type="text"
            id="email"
            name="email"
            className="input"
            value={form.email}
            onChange={updateField}
          />
        </label>
        <label>
          E-mail 2
          <input
            type="text"
            id="email2"
            name="email2"
            className="input"
            value={form.email2}
            onChange={updateField}
          />
        </label>
        <div className="address">
          <h2>Endereço</h2>
          <label>
            Logradouro
            <input
              type="text"
              id="street"
              name="street"
              className="input"
              value={form.street}
              onChange={updateField}
            />
          </label>
          <label>
            Número
            <input
              type="text"
              id="number"
              name="number"
              className="input"
              value={form.number}
              onChange={updateField}
            />
          </label>
          <label>
            Bairro
            <input
              type="text"
              id="district"
              name="district"
              className="input"
              value={form.district}
              onChange={updateField}
            />
          </label>
          <label>
            Cidade
            <input
              type="text"
              id="city"
              name="city"
              className="input"
              value={form.city}
              onChange={updateField}
            />
          </label>
          <label>
            UF
            <input
              type="text"
              id="state"
              name="state"
              className="input"
              value={form.state}
              onChange={updateField}
            />
          </label>
          <label>
            CEP
            <input
              type="text"
              id="cep"
              name="cep"
              className="input"
              value={form.cep}
              onChange={updateField}
            />
          </label>
        </div>

        <button type="submit" className={`button -center`}>
          Salvar Dados de contato
        </button>
        {message ? <Snackbar message={message} actionText="" /> : null}
      </form>
    </>
  );
}
