import React, { useRef, useEffect, useState } from "react";
import Navbar from "../Navbar";
import "../Membership/BuyMembership.css";
import "./Workouts.css";
import { toast, ToastContainer } from "react-toastify";
import WorkoutLog from "./WorkoutLog";
import axios from "axios";

export default function Workouts() {
  const [username, setUsername] = useState("");
  const [workout, setWorkout] = useState("");
  const [table, showTable] = useState(false);
  const [workoutArray, setWorkoutArray] = useState([]);

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
    try {
      const date = dateRef.current.value;
      const calories = caloriesRef.current.value;
      const duration = durationRef.current.value;
      const time = timeRef.current.value;
      if (workout === "") {
        toast.error("Select Workout Type.");
        return;
      }
      console.log("data: ", username, workout, date, calories, duration, time);
      const { data } = await axios.post(
        "http://localhost:4000/users/add-new-workout",
        { username, workout, date, calories, duration, time }
      );
      toast.success("Workout Added Successfully!");
      dateRef.current.value = "";
      caloriesRef.current.value = "";
      durationRef.current.value = "";
      timeRef.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  const handleWorkoutChange = (e) => {
    setWorkout(e.target.value);
    console.log(e.target.value, "workout type changed!");
  };

  const showWorkoutsHandler = async () => {
    showTable(!table);
    try {
      console.log("name", username);
      const { data } = await axios.post(
        "http://localhost:4000/users/get-user-workouts",
        { username }
      );
      console.log("data", data);
      setWorkoutArray(data);
    } catch (err) {
      console.log(err);
    }
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
                <label className="workout-form-item__label">Userame </label>
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
                  <option value="">== Select Workout ==</option>
                  <option value="Leg Day">Leg Day</option>
                  <option value="Dance">Dance</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Chest Day">Chest Day</option>
                </select>
              </div>
              <div className="workout-item">
                <label className="workout-form-item__label">Date </label>
                <input
                  className="form-item__input"
                  type="date"
                  ref={dateRef}
                  required
                />
              </div>
              <div className="workout-item">
                <label className="workout-form-item__label">Calories </label>
                <input
                  required
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
                  required
                />
              </div>
              <div className="workout-item">
                <label className="workout-form-item__label">Time (24H) </label>
                <input
                  required
                  className="form-item__input"
                  type="time"
                  ref={timeRef}
                />
              </div>
              <div className="workout-item__button">
                <button type="submit">Add Workout</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr />
      <div className="show-workouts-button">
        <button onClick={showWorkoutsHandler}> Show All Workouts </button>
      </div>

      {table && (
        <div>
          <WorkoutLog workoutArray={workoutArray} />
        </div>
      )}
      <div className="padding-bottom"></div>
    </>
  );
}
