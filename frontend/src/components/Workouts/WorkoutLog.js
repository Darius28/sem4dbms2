import React from "react";
import "./WorkoutLog.css";

export default function WorkoutLog({ workoutArray }) {
  const showAllWorkoutsHandler = () => {};
  return (
    <>
      <div>
        <div className="workout-table__container">
          <table className="workout-table">
            <tr>
              <th>Sno.</th>
              <th>Workout</th>
              <th>Date</th>
              <th>Time(24H)</th>
              <th>Duration(min)</th>
              <th>Calories</th>
            </tr>
            {workoutArray.map((workout, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{workout.workouttype}</td>
                <td>{workout.date}</td>
                <td>{workout.time}</td>
                <td>{workout.duration}</td>
                <td>{workout.calories}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}
