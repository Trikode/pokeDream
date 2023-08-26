import React from "react";

const CartItem = (props) => {
  return (
    <>
      <div class="CartLine"></div>
      <table class="CartOrder-table">
        <tbody>
          <tr>
            <td>
              <img src={props.img} alt="" class="CartFull-width"></img>
            </td>
            <td>
              <br /> <span class="CartThin">{props.name}</span>
              <br />
              Quantity: {props.quantity}
              <br />{" "}
              <span class="CartThin small">
                {" "}
                Color: {props.color}, Size: {props.size}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <div class="CartPrice">${props.price}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CartItem;
