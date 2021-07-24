import React, { useRef, useEffect, useState } from "react";
import Navbar from "../Navbar";
import "../Membership/BuyMembership.css";
import "./Workouts.css";
import { ToastContainer } from "react-toastify";
import WorkoutLog from "./WorkoutLog";
import axios from "axios";

export default function Workouts() {
  const [username, setUsername] = useState("");
  const [workout, setWorkout] = useState("");

  const dateRef = useRef();
  const caloriesRef = useRef();
  const durationRef = useRef();
  const timeRef = useRef();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const username = userData.username;
    setUsername(username);
  }, []);

  const addWorkoutHandler = async (e) => {
    e.preventDefault();
    if (workout === "") {
      console.log("add workout");
    }
    try {
      const date = dateRef.current.value;
      const calories = caloriesRef.current.value;
      const duration = durationRef.current.value;
      const time = timeRef.current.value;

      const { data } = await axios.post(
        "http://localhost:4000/users/add-new-workout",
        { username, workout, date, calories, duration, time }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleWorkoutChange = (e) => {
    setWorkout(e.target.value);
    console.log(e.target.value, "workout type changed!");
  };

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
            <form onSubmit={addWorkoutHandler}>
              <div className="workout-item">
                <label className="workout-form-item__label">Name </label>
                <input
                  className="form-item__input"
                  type="text"
                  value={username}
                  aria-readOnly
                />
              </div>
              <div className="workout-item">
                <label className="workout-form-item__label">
                  Workout Type{" "}
                </label>
                <select
                  value={workout}
                  onChange={handleWorkoutChange}
                  name="workout"
                  className="form-item__input"
                >
                  <option value="">=== Select Workout ===</option>
                  <option value="workout 1">Workout 1</option>
                  <option value="workout 2">Workout 2</option>
                  <option value="workout 3">Workout 3</option>
                  <option value="workout 4">Workout 4</option>
                </select>
              </div>
              <div className="workout-item">
                <label className="workout-form-item__label">Date </label>
                <input className="form-item__input" type="date" ref={dateRef} />
              </div>
              <div className="workout-item">
                <label className="workout-form-item__label">Calories </label>
                <input
                  className="form-item__input"
                  type="number"
                  ref={caloriesRef}
                />
              </div>
              <div className="workout-item">
                <label className="workout-form-item__label">
                  Duration (min){" "}
                </label>
                <input
                  className="form-item__input"
                  type="number"
                  ref={durationRef}
                />
              </div>
              <div className="workout-item">
                <label className="workout-form-item__label">Time (24H) </label>
                <input className="form-item__input" type="time" ref={timeRef} />
              </div>
              <div className="workout-item__button">
                <button type="submit">Add Workout</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <WorkoutLog />
      </div>
    </>
  );
}
