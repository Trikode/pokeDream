import React from "react";

const CartAddress = (props) => {
  const handleRadioChange = () => {
    props.onChange(props.id);
  };

  return (
    <div className="CartCredit-info-content">
      <input
        type="radio"
        id={props.id}
        name="opzione"
        value={props.id}
        onChange={handleRadioChange}
      />
      <label htmlFor={props.id}>Indirizzo fai che è incrementale</label>
      <p>Nome: {props.nome}</p>
      <p>Cognome: {props.cognome}</p>
      <p>Indirizzo: {props.indirizzo}</p>
      <p>Città: {props.città}</p>
      <p>CAP: {props.cap}</p>
    </div>
  );
};

export default CartAddress;
