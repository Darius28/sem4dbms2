import React, { useContext, useEffect, useState, useRef } from "react";
import Navbar from "../Navbar";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../../context/auth-context";
import "./BuyMembership.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function BuyMembership() {
  const history = useHistory();
  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const pincodeRef = useRef();
  const { state } = useContext(UserContext);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [pack, setPack] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const memData = JSON.parse(localStorage.getItem("membership"));
    setName(userData.username);
    setAmount(memData.price);
    setPack(memData.tier);
    setDuration(memData.duration);
  }, []);

  const addGymMembershipHandler = async (e) => {
    console.log("yo");
    e.preventDefault();
    try {
      const street = streetRef.current.value;
      const city = cityRef.current.value;
      const state = stateRef.current.value;
      const pincode = pincodeRef.current.value;
      const joindate = new Date().toLocaleDateString();
      const { data } = await axios.post(
        "http://localhost:4000/users/add-gym-membership",
        {
          username: name,
          amount,
          pack,
          duration,
          street,
          city,
          state,
          pincode,
          joindate,
        }
      );
      localStorage.setItem("membershipBought", true);
      console.log(data.member);
      if (data.member === true) {
        let status = JSON.parse(localStorage.getItem("user"));
        console.log(status);
        status.membership = "yes";
        status.joindate = joindate;
        localStorage.setItem("user", JSON.stringify(status));
        console.log(status);
      }
      toast.success("Membership Bought Successfully!");
      history.replace("/");
    } catch (err) {
      console.log(err);
    }
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
              <form onSubmit={addGymMembershipHandler}>
                <div className="mem-item">
                  <label className="workout-form-item__label">Username </label>
                  <input type="text" value={name} aria-readonly />
                </div>
                <div className="mem-item">
                  <label className="workout-form-item__label">
                    Amount (INR){" "}
                  </label>
                  <input type="number" value={amount} aria-readonly />
                </div>
                <div className="mem-item">
                  <label className="workout-form-item__label">Package </label>
                  <input type="text" value={pack} aria-readonly />
                </div>
                <div className="mem-item">
                  <label className="workout-form-item__label">
                    Duration (months){" "}
                  </label>
                  <input type="text" value={duration} aria-readonly />
                </div>
                <div className="mem-item">
                  <label className="workout-form-item__label">Street </label>
                  <input type="text" ref={streetRef} />
                </div>
                <div className="mem-item">
                  <label className="workout-form-item__label">City </label>
                  <input type="text" ref={cityRef} />
                </div>
                <div className="mem-item">
                  <label className="workout-form-item__label">State </label>
                  <input type="text" ref={stateRef} />
                </div>
                <div className="mem-item">
                  <label className="workout-form-item__label">Pincode </label>
                  <input type="number" ref={pincodeRef} />
                </div>
                <div className="mem-item__button">
                  <button type="submit">Start Membership</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
