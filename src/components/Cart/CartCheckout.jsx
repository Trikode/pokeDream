import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

const CartCheckout = (props) => {
  return (
    <>
      <div className="cartMainConteiner">
        <div className="cartCheckoutConteiner">
          <div className="cartPara">
            <p className="cartRiepilogo">RIEPILOGO ORDINE</p>
            <p>Numero prodotti: 10</p>
            <p>Consegna simata: 3-4 Giorni lavorativi</p>
          </div>
          <div className="checkoutButton">
            <p>Checkout</p>
            <HiArrowNarrowRight />
          </div>
          <p></p>
        </div>
      </div>
    </>
  );
};

export default CartCheckout;
