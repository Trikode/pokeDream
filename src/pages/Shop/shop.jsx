import React from "react";

//sections
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ShopCard from "../../components/Shop/shopCard";
import TopReminder from "../../components/TopReminder/TopReminder";
const Shop = () => {
  return (
    <>
      <TopReminder />
      <Navbar />
      <ShopCard/>
      <Footer />
    </>
  );
};

export default Shop;
