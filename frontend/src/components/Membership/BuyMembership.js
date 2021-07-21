import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar";
import { ToastContainer } from "react-toastify";
import { UserContext } from "../../context/auth-context";
import "./BuyMembership.css";

export default function BuyMembership() {
  const { state } = useContext(UserContext);
  console.log("STATE.MEMBERSHIP", state.membership);
  const addMembershipHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" />
      <div className="buy-membership">
        <div className="navbar-padding"></div>
        <div className="buy-membership__container">
          <div className="buy-membership-title">
            <span>BUY MEMBERSHIP</span>
          </div>
          <div className="buy-membership-form-container">
            <div className="membership-form">
              <form>
                <div className="mem-item">
                  <label className="form-item__label">Name </label>
                  <input type="text" />
                </div>
                <div className="mem-item">
                  <label className="form-item__label">Amount </label>
                  <input type="number" />
                </div>
                <div className="mem-item">
                  <label className="form-item__label">Package </label>
                  <input type="text" />
                </div>
                <div className="mem-item">
                  <label className="form-item__label">Duration </label>
                  <input type="text" />
                </div>
                <div className="mem-item">
                  <label className="form-item__label">Street </label>
                  <input type="text" />
                </div>
                <div className="mem-item">
                  <label className="form-item__label">City </label>
                  <input type="text" />
                </div>
                <div className="mem-item">
                  <label className="form-item__label">State </label>
                  <input type="text" />
                </div>
                <div className="mem-item">
                  <label className="form-item__label">Pincode </label>
                  <input type="number" />
                </div>
                <div className="mem-item__button">
                  <button onClick={addMembershipHandler}>
                    Start Membership
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
