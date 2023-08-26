import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./cart.css";
import { useState, useEffect } from "react";
import { useLiveItems } from "../../App";
import TopReminder from "../../components/TopReminder/TopReminder";
import CartAddress from "../../components/Cart/CartAdress";
import CartItem from "../../components/Cart/CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { currentUser, isLogged } = useLiveItems();
  const [deliveries, setDeliveries] = useState([]);
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartOverlay, setCartOverlay] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");

  let redirectToPage = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3308/api/carts?userId=${currentUser.id_user}`)
      .then((response) => response.json())
      .then((data) => {
        setCarts(data);
        // Calculate the total price
        const totalPrice = data.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(totalPrice);
      })
      .catch((error) => console.error("Error:", error));
  }, [currentUser.id_user]);

  const handleDeliverySelection = (deliveryId) => {
    console.log("Delivery ID:", deliveryId.id_delivery);
    setSelectedDelivery(deliveryId);
  };

  useEffect(() => {
    fetch("http://localhost:3308/api/deliveries")
      .then((response) => response.json())
      .then((data) => setDeliveries(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleAddAddress = () => {
    const newAddress = {
      id_user: currentUser.id_user,
      first_name: firstName,
      last_name: lastName,
      address: address,
      city: city,
      cap: zip,
    };

    fetch("http://localhost:3308/api/deliveries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddress),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Address added successfully:", data);
        // Reset form fields
        setFirstName("");
        setLastName("");
        setAddress("");
        setCity("");
        setProvince("");
        setZip("");
        setCartOverlay(false);
      })
      .catch((error) => {
        console.error("Error adding address:", error);
      });
  };

  const handleCheckout = async () => {
    if (isLogged === false) {
      alert("you have to log first");
      redirectToPage("/account");
    }
    if (selectedDelivery) {
      try {
        const orderResponse = await fetch("http://localhost:3308/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_user: currentUser.id_user,
            order_date: new Date().toISOString().split("T")[0],
            id_delivery: selectedDelivery,
            total_price: totalPrice,
          }),
        });

        const orderData = await orderResponse.json();
        const orderId = orderData.insertId;

        const orderProductRequests = carts.map((item) =>
          fetch("http://localhost:3308/api/order_products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_order: orderId,
              id_product: item.id_product,
              quantity: item.quantity,
            }),
          })
        );

        await Promise.all(orderProductRequests);

        console.log("Order placed successfully!");
        redirectToPage("/");
        await fetch("http://localhost:3308/api/carts", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_user: currentUser.id_user,
          }),
        });

        console.log("Carts deleted successfully!");
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please select a delivery option.");
    }
  };

  // const user = deliveries.find((user) => user.id_user === currentUser.id_user);
  return (
    <>
      <TopReminder />
      <Navbar />
      {cartOverlay ? (
        <div className="addressForm">
          <div className="containerAddressForm">
            <input
              type="text"
              className="Cart-form-control adressInput"
              id="cartInputCounty"
              placeholder="Nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              className="Cart-form-control adressInput"
              id="cartInputCountry"
              placeholder="Cognome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <input
              type="text"
              className="Cart-form-control adressInput"
              id="autocomplete"
              placeholder="Indirizzo"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              type="text"
              className="Cart-form-control adressInput"
              id="cartInputCity"
              placeholder="Città"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              type="text"
              className="Cart-form-control adressInput"
              id="cartInputState"
              placeholder="Provincia"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />

            <input
              type="text"
              className="Cart-form-control adressInput"
              id="cartInputZip"
              placeholder="CAP"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />

            <button className="CartPay-btn" onClick={handleAddAddress}>
              Add Address
            </button>
          </div>
        </div>
      ) : (
        <div className="CartContainer">
          <div className="CartWindow">
            <div className="CartOrder-info">
              <div className="CartOrder-info-content">
                <h2>Riepilogo Ordine</h2>
                <div className="CartItemsContainer">
                  {carts.map((item) => (
                    <CartItem
                      key={item.id_product}
                      img={item.image_url}
                      name={item.name}
                      size={item.size}
                      color={item.color}
                      price={item.price}
                      quantity={item.quantity}
                    />
                  ))}
                </div>
                <div className="CartLine"></div>
                <div className="CartTotal">
                  <span className="CartFloatLeft">
                    <div className="CartThin dense">VAT 19%</div>
                    <div className="CartThin dense">Delivery</div>
                    TOTAL
                  </span>
                  <span className="CartFloatRight">
                    <div className="CartThin dense">$68.75</div>
                    <div className="CartThin dense">$4.95</div>${totalPrice}
                  </span>
                </div>
              </div>
            </div>
            <div className="CartCredit-info">
              <div className="CartCredit-info-content">
                <form>
                  {deliveries
                    .filter((del) => del.id_user === currentUser.id_user)
                    .map((delivery) => {
                      console.log("Delivery ID:", delivery.id_delivery);
                      return (
                        <CartAddress
                          key={delivery.id_delivery}
                          id={delivery.id_delivery}
                          nome={delivery.first_name}
                          cognome={delivery.last_name}
                          indirizzo={delivery.adress}
                          città={delivery.city}
                          cap={delivery.cap}
                          checked={selectedDelivery === delivery.id_delivery}
                          onChange={handleDeliverySelection}
                        />
                      );
                    })}
                </form>
                <button className="CartPay-btn" onClick={handleCheckout}>
                  Checkout
                </button>
                <button
                  className="add-adress CartPay-btn"
                  onClick={() => setCartOverlay(true)}
                >
                  Add Address
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart;
