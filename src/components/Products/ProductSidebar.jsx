import React, { useState } from "react";
import "../../pages/Products/products.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const ProductSidebar = () => {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  function handleClick1() {
    setToggle1(!toggle1);
  }

  function handleClick2() {
    setToggle2(!toggle2);
  }

  function handleClick3() {
    setToggle3(!toggle3);
  }

  function handleClick4() {
    setToggle4(!toggle4);
  }

  function handleGenderSelection(gender) {
    setSelectedGender(gender);
  }

  function handleTypeSelection(type) {
    const index = selectedTypes.indexOf(type);
    if (index > -1) {
      // Type already selected, remove it from the list
      setSelectedTypes((prevSelectedTypes) => [
        ...prevSelectedTypes.slice(0, index),
        ...prevSelectedTypes.slice(index + 1),
      ]);
    } else {
      // Type not selected, add it to the list
      setSelectedTypes((prevSelectedTypes) => [...prevSelectedTypes, type]);
    }
  }

  function handlePriceRangeSelection(priceRange) {
    const index = selectedPriceRange.indexOf(priceRange);
    if (index > -1) {
      // Price range already selected, remove it from the list
      setSelectedPriceRange((prevSelectedPriceRange) => [
        ...prevSelectedPriceRange.slice(0, index),
        ...prevSelectedPriceRange.slice(index + 1),
      ]);
    } else {
      // Price range not selected, add it to the list
      setSelectedPriceRange((prevSelectedPriceRange) => [
        ...prevSelectedPriceRange,
        priceRange,
      ]);
    }
  }

  function handleColorSelection(color) {
    const index = selectedColors.indexOf(color);
    if (index > -1) {
      // Color already selected, remove it from the list
      setSelectedColors((prevSelectedColors) => [
        ...prevSelectedColors.slice(0, index),
        ...prevSelectedColors.slice(index + 1),
      ]);
    } else {
      // Color not selected, add it to the list
      setSelectedColors((prevSelectedColors) => [...prevSelectedColors, color]);
    }
  }

  return (
    <section className="productSidebar">
      <div className="containerCardProductMenu" onClick={handleClick1}>
        <p>Gender</p>
        {toggle1 ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </div>
      <div className={`sidebarCard1 ${toggle1 ? "active" : ""}`}>
        <p onClick={() => handleGenderSelection("Man")}>Man</p>
        <p onClick={() => handleGenderSelection("Woman")}>Woman</p>
        <p onClick={() => handleGenderSelection("Kid")}>Kid</p>
      </div>
      <hr />
      <div className="containerCardProductMenu" onClick={handleClick2}>
        <p>Types</p>
        {toggle2 ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </div>
      <div className={`sidebarCard1 ${toggle2 ? "active" : ""}`}>
        <p onClick={() => handleTypeSelection("T-shirt")}>T-shirt</p>
        <p onClick={() => handleTypeSelection("Polo")}>Polo</p>
        <p onClick={() => handleTypeSelection("Shirt")}>Shirt</p>
        <p onClick={() => handleTypeSelection("Hoodies")}>Hoodies</p>
        <p onClick={() => handleTypeSelection("Tank-top")}>Tank-top</p>
      </div>
      <hr />
      <div className="containerCardProductMenu" onClick={handleClick3}>
        <p>Shop by Price</p>
        {toggle3 ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </div>
      <div className={`sidebarCard1 ${toggle3 ? "active" : ""}`}>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="checkbox1"
            className="checkedboxSidebar"
            onChange={() => handlePriceRangeSelection("$5 - $10")}
          />
          <label htmlFor="checkbox1" className="checkbox-label">
            $5 - $10
          </label>
        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            id="checkbox2"
            className="checkedboxSidebar"
            onChange={() => handlePriceRangeSelection("$10 - $20")}
          />
          <label htmlFor="checkbox2" className="checkbox-label">
            $10 - $20
          </label>
        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            id="checkbox3"
            className="checkedboxSidebar"
            onChange={() => handlePriceRangeSelection("$20 - $35")}
          />
          <label htmlFor="checkbox3" className="checkbox-label">
            $20 - $35
          </label>
        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            id="checkbox4"
            className="checkedboxSidebar"
            onChange={() => handlePriceRangeSelection("$35 - $100")}
          />
          <label htmlFor="checkbox4" className="checkbox-label">
            $35 - $100
          </label>
        </div>
      </div>
      <hr />
      <div className="containerCardProductMenu" onClick={handleClick4}>
        <p>Color</p>
        {toggle4 ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </div>
      <div className={`sidebarCard4 ${toggle4 ? "active" : ""}`}>
        <div
          className="sidebar33"
          onClick={() => handleColorSelection("Purple")}
        >
          <div className="sideColor sidebarPurple"></div>
          <p>Purple</p>
        </div>
        <div
          className="sidebar33"
          onClick={() => handleColorSelection("Black")}
        >
          <div className="sideColor sidebarBlack"></div>
          <p>Black</p>
        </div>
        <div className="sidebar33" onClick={() => handleColorSelection("Red")}>
          <div className="sideColor sidebarRed"></div>
          <p>Red</p>
        </div>
        <div
          className="sidebar33"
          onClick={() => handleColorSelection("Orange")}
        >
          <div className="sideColor sidebarOrange"></div>
          <p>Orange</p>
        </div>
        <div className="sidebar33" onClick={() => handleColorSelection("Blue")}>
          <div className="sideColor sidebarBlue"></div>
          <p>Blue</p>
        </div>
        <div
          className="sidebar33"
          onClick={() => handleColorSelection("White")}
        >
          <div className="sideColor sidebarWhite"></div>
          <p>White</p>
        </div>
        <div
          className="sidebar33"
          onClick={() => handleColorSelection("Brown")}
        >
          <div className="sideColor sidebarBrown"></div>
          <p>Brown</p>
        </div>
        <div
          className="sidebar33"
          onClick={() => handleColorSelection("Green")}
        >
          <div className="sideColor sidebarGreen"></div>
          <p>Green</p>
        </div>
        <div
          className="sidebar33"
          onClick={() => handleColorSelection("Yellow")}
        >
          <div className="sideColor sidebarYellow"></div>
          <p>Yellow</p>
        </div>
        <div className="sidebar33" onClick={() => handleColorSelection("Grey")}>
          <div className="sideColor sidebarGrey"></div>
          <p>Grey</p>
        </div>
        <div className="sidebar33" onClick={() => handleColorSelection("Pink")}>
          <div className="sideColor sidebarPink"></div>
          <p>Pink</p>
        </div>
        <div
          className="sidebar33"
          onClick={() => handleColorSelection("Multi-Color")}
        >
          <div className="sideColor sidebarMultiColor"></div>
          <p>Multi-Color</p>
        </div>
      </div>
    </section>
  );
};

export default ProductSidebar;
