import React from "react";
import tshirt from "../../assets/t-shirt.jpg";

const CartProduct = (props) => {
  return (
    <>
      <div className="cartConteiner">
        <div className="cartSecondConteiner">
          <div className="cartProductLeftPart">
            <img src={tshirt} alt="" />
          </div>
          <div className="cartProductRightPart">
            <p>{props.nome}Nome Prodotto: T-Shirt Basic</p>
            <p>{props.colore}Colore: Rosso</p>
            <p>{props.taglia}Taglia: S</p>
            <p>{props.prezzo}390,00€</p>
            <div className="cartRemoveButton">Remove</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
