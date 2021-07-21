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
                <label>Name: </label>
                <input type="text" />
              </div>
              <div className="workout-item">
                <label>Workout Type: </label>
                <select>
                    <option>Workout 1</option>
                    <option>Workout 2</option>
                    <option>Workout 3</option>
                    <option>Workout 4</option>
                </select>
              </div>
              <div className="workout-item">
                <label>Date: </label>
                <input type="date" />
              </div>
              <div className="workout-item">
                <label>Calories: </label>
                <input type="number" />
              </div>
              <div className="workout-item">
                <label>Duration(min): </label>
                <input type="number" />
              </div>
              <div className="workout-item">
                <label>Time: </label>
                <input type="time" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
