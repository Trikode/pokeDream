import React from "react";
import { useState, useEffect } from "react";
import "../../pages/Shop/shop.css";
// import tShirt from "../../assets/t-shirt.jpg"
import { useNavigate } from "react-router";
import { useLiveItems } from "../../App";

import { MdLocalShipping } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
// import { func } from "prop-types";

const ShopCard = () => {
  const {
    currentProduct,
    currentColour,
    setCurrentColour,
    currentUser,
    isLogged,
  } = useLiveItems();
  const [products, setProducts] = useState([]);
  const [pName, setPName] = useState("");
  const [pImg, setPImg] = useState("");
  // const [pColour,setPColour] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [selectedSize, setSelectedSize] = useState("xs");
  const [quantity, setQuantity] = useState(1);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const uniqueColors = Array.from(
    new Set(
      products
        .filter((prd) => prd.name === currentProduct)
        .map((prod) => prod.color)
    )
  );

  let redirectToPage = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3308/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  useEffect(() => {
    let product = products.find(
      (prd) =>
        prd.name === currentProduct &&
        prd.color === currentColour &&
        prd?.size === selectedSize
    );
    setPName(product?.name);
    setPImg(product?.image);
    //   setPColour(product?.color);
    setPPrice(product?.price);
    setAvailableQuantity(product?.quantity || 0);
  }, [products, currentProduct, currentColour, selectedSize]);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    // Check if a size is selected
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    if (isLogged === false) {
      alert("You have to log first");
      return;
    }

    // Find the selected product in the products array
    const selectedProduct = products.find(
      (prod) =>
        prod.name === currentProduct &&
        prod.color === currentColour &&
        prod.size === selectedSize
    );

    // Check if the selected product exists
    if (!selectedProduct) {
      alert("Selected product not found");
      return;
    }

    if (quantity > availableQuantity) {
      alert(
        "We don't that much item for the quantity you selected please lower the quantity to proceed"
      );
      return;
    }

    // Prepare the data for the POST request
    const postData = {
      id_user: currentUser.id_user, // Replace with the actual user ID
      id_product: selectedProduct.id_product,
      quantity: quantity,
    };

    // Send the POST request to add the product to the cart
    fetch("http://localhost:3308/api/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Product added to cart successfully");
        redirectToPage("/products");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add product to cart");
      });
  };

  return (
    <>
      <section className="shopSection">
        <div className="shopContainerImg">
          <img src={pImg} alt="" />
        </div>
        <div className="shopRight">
          <p>{pName}</p>
          <p className="shopPrezzo">${pPrice}</p>
          <hr />
          <p className="shopColorTxt">Colore:</p>
          <div className="shopContainerColor">
            {uniqueColors.map((color, idx) => (
              <div
                key={idx}
                className="btnColorProduct"
                style={{ backgroundColor: color }}
                onClick={() => {
                  setCurrentColour(color);
                  setSelectedSize("xs");
                }}
              />
            ))}
          </div>

          <div className="shopContainerMisure">
            {["xs", "s", "m", "l", "xl"].map((size) => {
              const isDisabled = !products.some(
                (prod) =>
                  prod.name === currentProduct &&
                  prod.size === size &&
                  currentColour === prod.color &&
                  prod.quantity > 0
              );
              return (
                <div
                  key={size}
                  className={`shopTaglia ${
                    selectedSize === size ? (isDisabled ? "" : "selected") : ""
                  } ${isDisabled ? "disabledButton" : ""}`}
                  onClick={() => handleSizeClick(size)}
                  disabled={isDisabled}
                >
                  {size}
                </div>
              );
            })}
          </div>
          <div className="shopQuantity">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <p className="shopAvailableQuantity">
            Available Quantity: {availableQuantity}
          </p>

          <button className="shopAggiungi" onClick={handleAddToCart}>
            AGGIUNGI AL CARRELLO
          </button>

          <div className="shopContainerSpedizione">
            <div className="shopCardInfo">
              <MdLocalShipping size={30} />
              <p>Spedizione gratuita</p>
            </div>
            <p className="shopParSpedizione">
              Spedizione standard gratuita sugli ordini superiori a 9.00€ 8-12
              Giorni Lavorativi
            </p>

            <div className="shopCardInfo">
              <AiFillSafetyCertificate size={30} />
              <p>Politica di Ritorno</p>
            </div>
            <p className="shopParSpedizione">
              Resi grautiti in caso di difetto o altri problemi.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopCard;
