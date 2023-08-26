import React from "react";
import {  useEffect } from "react";
import "./AdminBurgerModal.css";
import { useLiveItems } from "../../App";




const AdminBurgerModal = () => {
    const { aBurger,setABurger } = useLiveItems();
  
  const handleClick = (event) => {

    setABurger((current) => !current);
  };
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = aBurger ? "hidden" : "auto";
    }
  }, [aBurger]);

  return (
    <>
      <div
        className={`atoggle ${aBurger ? "active" : ""}`}
        onClick={handleClick}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
     
    </>
  );
};
export default AdminBurgerModal;
