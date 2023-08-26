import React from "react";
import "../../pages/Home/home.css"
import heroImg from "../../assets/heroImg.png"

const Hero = ()=>{

  return(
  <div className="hero">
      <div className="leftH">
      <h1>THE RIGHT PLACE TO BE SEEN</h1>
        <h5>
          The right outfit that makes you feel comfortable with yourself. 
          <p>STAND OUT</p> was started from this concept, then we matched 
          it with eco-friendly and high quality materials.
        </h5>
      </div>
      <div className="rightH">
        <img src={heroImg} alt="" />
      </div>
  </div>
  )
}

export default Hero