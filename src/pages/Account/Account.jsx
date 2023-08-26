import React from "react";
import { useState, useEffect } from "react";
import "./account.css";
import LoginForm from "../../components/Account/LoginForm";
import RegistrationForm from "../../components/Account/RegistrationForm";
import Navbar from "../../components/Navbar/Navbar";
import { useLiveItems } from "../../App";
import { useNavigate } from "react-router-dom";
// import UserList from "../../components/Account/Testaccount";

const Account = () => {
  const { isLogged, setIsLogged, currentUser, isActive, setIsActive } =
    useLiveItems();
  const [users, setUsers] = useState([]);
  const [uF_name, setUF_name] = useState("");
  const [uL_name, setUL_name] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [uRole, setURole] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3308/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  useEffect(() => {
    const user = users.find((user) => user.id_user === currentUser.id_user);
    setUF_name(user?.f_name);
    setUL_name(user?.l_name);
    setUEmail(user?.email);
    setURole(user?.role_id);
  }, [users, currentUser]);
  useEffect(() => {
    fetch(`http://localhost:3308/api/orders?userId=${currentUser.id_user}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.error("Error:", error));
  }, [currentUser.id_user]);

  let redirectToPage = useNavigate();
  return (
    <>
      <Navbar />
      {isLogged && uRole === 1 ? (
        redirectToPage("/admin")
      ) : isLogged ? (
        <div className="AccountContainerLogged">
          <div className="AloggedSidebar">
            <button
              onClick={() => {
                setIsLogged(false);
              }}
            >
              Log out
            </button>
          </div>
          <div className="AoptionsAccount">
            <div className="AcontainerLogged">
              <div className="AavatarImg">
                <img src="" alt="" />
              </div>
              <div className="Adesc">
                <div>
                  Name: <b>{uF_name}</b>
                </div>
                <div>
                  Surname: <b>{uL_name}</b>
                </div>
                <div>
                  Email: <b>{uEmail}</b>
                </div>
              </div>
            </div>
            <div className="AcontainerLogged">
              {Object.values(
                orders.reduce((acc, order) => {
                  if (!acc[order.id_order]) {
                    acc[order.id_order] = [order];
                  } else {
                    acc[order.id_order].push(order);
                  }
                  return acc;
                }, {})
              ).map((orderGroup) => (
                <div key={orderGroup[0].id_order}>
                  <h3>Order ID: {orderGroup[0].id_order}</h3>
                  {orderGroup.map((order) => (
                    <div key={order.id_order_product}>
                      <p>Name: {order.name}</p>
                      <p>Size: {order.size}</p>
                      <p>Color: {order.color}</p>
                      <p>Quantity: {order.quantity}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="AccountContainer">
          <div className="Acontainer">
            <div className="Alabels">
              <button
                onClick={() => setIsActive(true)}
                className={`loginL ${isActive ? "active" : ""}`}
              >
                <h2>Login</h2>
              </button>
              <button
                onClick={() => setIsActive(false)}
                className={`regL ${isActive ? "" : "active"}`}
              >
                <h2>Register</h2>
              </button>
            </div>

            <div className="AccountForms">
              {isActive ? <LoginForm /> : <RegistrationForm />}
            </div>
            <div>
              {/* <h1>Users</h1>
      <ul>
        {users.map((user,Uidx) =>{ 
            return <UserList key={Uidx} email={user.email} psw={user.password}/>
        })}
      </ul> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
