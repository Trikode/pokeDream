import React from "react";
import { useState, useEffect } from "react";
import "./BurgerModal.css";
import { Link} from "react-router-dom";

const BurgerModal = () => {
  // const navigate = useNavigate();
  const linkStyle = {
    textDecoration: "none",
    color: "var(--color-primary)",
  };
  const [isActive, setIsActive] = useState(false);
  const handleClick = (event) => {
    setIsActive((current) => !current);
  };
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = isActive ? "hidden" : "auto";
    }
  }, [isActive]);

  return (
    <>
      <div
        className={`toggle ${isActive ? "active" : ""}`}
        onClick={handleClick}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={`brg-bg ${isActive ? "active" : ""} `}
        onClick={handleClick}
      >
     
          <Link to={"/products"} style={linkStyle}>
            Our Products
          </Link>
   

          <li>About</li>
  
          <li>Support</li>
      
      </div>
    </>
  );
};
export default BurgerModal;
