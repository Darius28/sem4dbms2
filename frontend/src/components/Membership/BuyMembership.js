import React, { useContext, useEffect, useState } from "react";
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
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [pack, setPack] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const memData = JSON.parse(localStorage.getItem("membership"));
    setName(userData.name);
    setAmount(memData.price);
    setPack(memData.tier);
    setDuration(memData.duration);
  }, []);

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
                  <label className="workout-form-item__label">Name </label>
                  <input type="text" value={name} aria-readonly />
                </div>
                <div className="mem-item">
                  <label className="workout-form-item__label">Amount (INR) </label>
                  <input type="number" value={amount} aria-readonly />
                </div>
                <div className="mem-item">
                  <label className="workout-form-item__label">Package </label>
                  <input type="text" value={pack} aria-readonly />
                </div>
                <div className="mem-item">
                  <label className="workout-form-item__label">Duration (months) </label>
                  <input type="text" value={duration} aria-readonly />
                </div>
                <div className="mem-item">
                  <label className="workout-form-item__label">Street </label>
                  <input type="text" />
                </div>
                <div className="mem-item">
                  <label className="workout-form-item__label">City </label>
                  <input type="text" />
                </div>
                <div className="mem-item">
                  <label className="workout-form-item__label">State </label>
                  <input type="text" />
                </div>
                <div className="mem-item">
                  <label className="workout-form-item__label">Pincode </label>
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
