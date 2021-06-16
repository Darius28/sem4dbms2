import React from "react";
import "./Shop.css";
import Navbar from "../components/Navbar";

export default function Shop() {
  return (
    <>
      <Navbar />
      <div className="shop-container">
        <div className="navbar-padding"></div>
        <div className="shop-banner">
          <div className="shop-banner__header">
            <h1>SALE!</h1>
          </div>
          <div className="shop-banner__contents">
            <p>20-30% off on select merchandise.</p>
            <p>Buy Now!</p>
          </div>
        </div>
      </div>
    </>
  );
}
