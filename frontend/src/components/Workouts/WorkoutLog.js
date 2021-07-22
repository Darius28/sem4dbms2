import React from "react";
import "./WorkoutLog.css";

export default function WorkoutLog() {
  const showAllWorkoutsHandler = () => {};
  return (
    <>
      <div>
        <div className="show-workout-button__container">
          <button
            onClick={showAllWorkoutsHandler}
            className="show-workout-button"
          >
            Show All Workouts
          </button>
        </div>
      </div>
    </>
  );
}
