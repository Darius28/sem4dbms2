import React, { useContext } from "react";
import "./UserButtons.css";
import { Link } from "react-router-dom";
import { UserContext } from "../context/auth-context";

export default function UserButtons() {
  const { state } = useContext(UserContext);
  console.log(state.user);
  return (
    <>
      {state.user === null ? (
        <div className="user-buttons__container">
          <div className="user-buttons">
            <Link to="/signup" className="user-link signup">
              SIGN UP
            </Link>
            <Link to="/login" className="user-link login">
              LOGIN
            </Link>
          </div>
        </div>
      ) : (
        <div className="user-buttons__container">
          <div className="user-buttons">
            <h1>Welcome, {state.user.name}</h1>
          </div>
        </div>
      )}
    </>
  );
}
