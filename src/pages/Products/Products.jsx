import React from "react";
import { useState, useEffect } from "react";
import "./products.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useLiveItems } from "../../App";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TopReminder from "../../components/TopReminder/TopReminder";
import ProductCard from "../../components/Products/ProductCard";
// import ProductSidebar from "../../components/Products/ProductSidebar";

const Products = () => {
  const { searchQuery } = useLiveItems();
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3308/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);
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
    const index = selectedPriceRange.findIndex(
      (range) => range[0] === priceRange[0] && range[1] === priceRange[1]
    );
    if (index > -1) {
      // Price range already selected, remove it from the list
      setSelectedPriceRange((prevSelectedPriceRange) =>
        prevSelectedPriceRange.filter((range, idx) => idx !== index)
      );
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

  function isProductMatchFilters(product) {
    if (selectedGender !== "all" && product.genre !== selectedGender) {
      return false;
    }
    if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) {
      return false;
    }
    if (
      selectedPriceRange.length > 0 &&
      !selectedPriceRange.some((range) => isPriceInRange(product.price, range))
    ) {
      return false;
    }
    if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
      return false;
    }
    const searchfilter = searchQuery.trim().toLowerCase();
    if (searchfilter && !product.name.toLowerCase().includes(searchfilter)) {
      return false;
    }

    return true;
  }

  function isPriceInRange(price, range) {
    const [min, max] = range;

    return price >= min && price <= max;
  }

  return (
    <>
      <TopReminder />
      <Navbar />
      <div className="containerProduct">
        <div>
          <section className="productSidebar">
            <div className="containerCardProductMenu" onClick={handleClick1}>
              <p>Gender</p>
              {toggle1 ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </div>
            <div className={`sidebarCard1 ${toggle1 ? "active" : ""}`}>
              <p onClick={() => handleGenderSelection("all")}>All</p>
              <p onClick={() => handleGenderSelection("man")}>Man</p>
              <p onClick={() => handleGenderSelection("woman")}>Woman</p>
              <p onClick={() => handleGenderSelection("kiddo")}>Kid</p>
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
                  onChange={() => handlePriceRangeSelection([5, 10])}
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
                  onChange={() => handlePriceRangeSelection([10, 20])}
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
                  onChange={() => handlePriceRangeSelection([20, 35])}
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
                  onChange={() => handlePriceRangeSelection([35, 100])}
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
                onClick={() => handleColorSelection("purple")}
              >
                <div className="sideColor sidebarPurple"></div>
                <p>Purple</p>
              </div>
              <div
                className="sidebar33"
                onClick={() => handleColorSelection("black")}
              >
                <div className="sideColor sidebarBlack"></div>
                <p>Black</p>
              </div>
              <div
                className="sidebar33"
                onClick={() => handleColorSelection("red")}
              >
                <div className="sideColor sidebarRed"></div>
                <p>Red</p>
              </div>
              <div
                className="sidebar33"
                onClick={() => handleColorSelection("orange")}
              >
                <div className="sideColor sidebarOrange"></div>
                <p>Orange</p>
              </div>
              <div
                className="sidebar33"
                onClick={() => handleColorSelection("blue")}
              >
                <div className="sideColor sidebarBlue"></div>
                <p>Blue</p>
              </div>
              <div
                className="sidebar33"
                onClick={() => handleColorSelection("white")}
              >
                <div className="sideColor sidebarWhite"></div>
                <p>White</p>
              </div>
              <div
                className="sidebar33"
                onClick={() => handleColorSelection("brown")}
              >
                <div className="sideColor sidebarBrown"></div>
                <p>Brown</p>
              </div>
              <div
                className="sidebar33"
                onClick={() => handleColorSelection("green")}
              >
                <div className="sideColor sidebarGreen"></div>
                <p>Green</p>
              </div>
              <div
                className="sidebar33"
                onClick={() => handleColorSelection("yellow")}
              >
                <div className="sideColor sidebarYellow"></div>
                <p>Yellow</p>
              </div>
              <div
                className="sidebar33"
                onClick={() => handleColorSelection("grey")}
              >
                <div className="sideColor sidebarGrey"></div>
                <p>Grey</p>
              </div>
              <div
                className="sidebar33"
                onClick={() => handleColorSelection("pink")}
              >
                <div className="sideColor sidebarPink"></div>
                <p>Pink</p>
              </div>
              <div
                className="sidebar33"
                onClick={() => handleColorSelection("multichrome")}
              >
                <div className="sideColor sidebarMultiColor"></div>
                <p>Multi-Color</p>
              </div>
            </div>
          </section>
        </div>
        <div className="container-productCard">
          {/* {products.filter((product, index) => {
      return products.findIndex(p => p.name === product.name) === index;}).map((product, pidx) => (
      <div key={pidx}>
         <ProductCard name={product.name} type={product.type} price={product.price} img={product.image} colour={product.color} />
      </div>
    ))}; */}
          {/* {products.map((product, pidx, arr) => {
            return (
              arr.findIndex((p) => p.name === product.name) === pidx && (
                <div key={pidx}>
                  <ProductCard
                    name={product.name}
                    type={product.type}
                    price={product.price}
                    img={product.image}
                    colour={product.color}
                  />
                </div>
              )
            );
          })} */}

          {products.filter(isProductMatchFilters).map((product, pidx, arr) => {
            return (
              arr.findIndex((p) => p.name === product.name) === pidx && (
                <div key={pidx}>
                  <ProductCard
                    name={product.name}
                    type={product.type}
                    price={product.price}
                    img={product.image}
                    colour={product.color}
                  />
                </div>
              )
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
