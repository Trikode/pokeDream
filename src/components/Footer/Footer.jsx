import React from "react";
import "./footer.css";
import Logo from "../../assets/logo2.svg";
import { GrFacebookOption } from "react-icons/gr";
import { FiInstagram } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { ReactComponent as Mastercard } from "../../assets/paymentLogos/mastercard.svg";
import { ReactComponent as Maestro } from "../../assets/paymentLogos/maestro.svg";
import { ReactComponent as Visa } from "../../assets/paymentLogos/visa.svg";
import { ReactComponent as Paypal } from "../../assets/paymentLogos/paypal.svg";
import { ReactComponent as Postepay } from "../../assets/paymentLogos/postepay.svg";
import { ReactComponent as Revolut } from "../../assets/paymentLogos/revolut.svg";

const Footer = () => {
  return (
    <div className="container">
      <div className="footer">
        <div className="footer-up">
          <div className="cols">
            <img src={Logo} alt="" className="footer-logo" />
          </div>
          <div className="cols">
            <h4>Need help?</h4>
            <p>Contact us</p>
            <p>Order status</p>
            <p>Shipping and delivery</p>
          </div>
          <div className="cols">
            <h4>Infos</h4>
            <p>News</p>
            <p>Work with us</p>
            <p>Sponsors</p>
            <p>Sustainability</p>
          </div>
          <div className="cols">
            <h4>Products</h4>
            <p>Customize your tee</p>
            <p>Catalog</p>
            <p>Bestsellers</p>
            <p>Promo</p>
          </div>
          <div className="cols socials">
            <h4>Follow us</h4>
            <div className="icons-container">
              <div className="icon">
                <GrFacebookOption className="icons" />
              </div>
              <div className="icon">
                <FiInstagram className="icons" />
              </div>
              <div className="icon">
                <FiTwitter className="icons" />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-down">
          <p>2023 © Stand Out all reserved rights.</p>
          <div className="payment">
            <div className="logo">
              <Mastercard className="logos" />
            </div>
            <div className="logo">
              <Maestro className="logos" />
            </div>
            <div className="logo">
              <Visa className="logos" />
            </div>
            <div className="logo">
              <Paypal className="logos" />
            </div>
            <div className="logo">
              <Postepay className="logos pp" />
            </div>
            <div className="logo">
              <Revolut className="logos" />
            </div>
          </div>
          <p>Privacy and cookie policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
