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
          <form className="form">
            <div className="buy-membership-form-container">
              <div className="mem-form-item">
                <label>Name: </label>
                <input type="text" />
              </div>
              <div className="mem-form-item">
                <label>Amount: </label>
                <input type="number" />
              </div>
              <div className="mem-form-item">
                <label>Package: </label>
                <input type="text" />
              </div>
              <div className="mem-form-item">
                <label>Duration: </label>
                <input type="text" />
              </div>
              <div className="mem-form-item">
                <label>Street: </label>
                <input type="text" />
              </div>
              <div className="mem-form-item">
                <label>City: </label>
                <input type="text" />
              </div>
              <div className="mem-form-item">
                <label>State: </label>
                <input type="text" />
              </div>
              <div className="mem-form-item">
                <label>Pincode: </label>
                <input type="number" />
              </div>
              <div className="mem-form-item">
                <button onClick={addMembershipHandler}>Start Membership</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
