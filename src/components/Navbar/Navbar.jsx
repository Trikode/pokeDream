import React from "react";
import { useState, useEffect } from "react";
import "./navbar.css";
import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import BurgerModal from "./BurgerModal";
import Logo from "../../assets/logo2.svg";
import { useLiveItems } from "../../App";

const Navbar = () => {
  const { isLogged, liveItems, currentUser, setSearchQuery, searchQuery } =
    useLiveItems();
  const [users, setUsers] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3308/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (isLogged) {
      const user = users.find((user) => user.id_user === currentUser.id_user);
      setDisplayName(user?.f_name);
    }
  }, [currentUser, users, isLogged]);

  const linkStyle = {
    textDecoration: "none",
    color: "aliceblue",
  };
  const cartStyle = {
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const handleSearch = () => {
    navigate("/products");
  };

  return (
    <nav className="navbar">
      <div className="burger">
        <BurgerModal className="burger-icon" />
      </div>
      <div className="nav-left">
        <Link to={"/"}>
          <img src={Logo} alt="" className="nav-logo" />
        </Link>
      </div>
      <div className="center">
        <ul>
          <li>
            <Link to={"/products"} style={linkStyle}>
              Our Products
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSubmit={handleSearch}
          />

          <div className="searchicon" onClick={() => handleSearch()}>
            <BsSearch />
          </div>
        </div>
        <div className="Naccount-container">
          <p>{isLogged ? `Ciao,${displayName}!` : ""}</p>
          <Link to={"/account"}>
            <RiAccountCircleLine className="accountIcon" />
          </Link>
        </div>
        <div className="cart-container">
          {liveItems > 0 ? (
            <div className="cart-notification">
              <p>{liveItems}</p>
            </div>
          ) : (
            ""
          )}
          <Link to={"/cart"} style={cartStyle}>
            <AiOutlineShoppingCart className="cart" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
