import React from "react";
import Navbar from "../Navbar";
import "../Membership/BuyMembership.css";
import "./Workouts.css";
import { ToastContainer } from "react-toastify";

export default function Workouts() {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" />
      <div>
        <div className="navbar-padding"></div>
        <div className="buy-membership-title">
          <span>ADD WORKOUT</span>
        </div>
        <div className="workout-form-container">
          <div className="workout-form">
            <form>
              <div className="workout-item">
                <label className="workout-form-item__label">Name </label>
                <input className="form-item__input" type="text" />
              </div>
              <div className="workout-item">
                <label className="workout-form-item__label">Workout Type </label>
                <select name="workout" className="form-item__input">
                  <option value="workout 1">Workout 1</option>
                  <option value="workout 2">Workout 2</option>
                  <option value="workout 3">Workout 3</option>
                  <option value="workout 4">Workout 4</option>
                </select>
              </div>
              <div className="workout-item">
                <label className="workout-form-item__label">Date </label>
                <input className="form-item__input" type="date" />
              </div>
              <div className="workout-item">
                <label className="workout-form-item__label">Calories </label>
                <input className="form-item__input" type="number" />
              </div>
              <div className="workout-item">
                <label className="workout-form-item__label">Duration (min) </label>
                <input className="form-item__input" type="number" />
              </div>
              <div className="workout-item">
                <label className="workout-form-item__label">Time (24H) </label>
                <input className="form-item__input" type="time" />
              </div>
              <div className="workout-item__button">
                <button>Add Workout</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
