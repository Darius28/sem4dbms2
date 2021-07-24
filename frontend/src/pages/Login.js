import React, { useRef, useState, useContext } from "react";
import "./Login.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { UserContext } from "../context/auth-context";

export default function Login() {
  const history = useHistory();
  const emailRef = useRef();
  const passRef = useRef();

  const { state, dispatch } = useContext(UserContext);
  console.log("STATE", state);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;
    try {
      await axios
        .post("http://localhost:4000/users/login", {
          email,
          password,
        })
        .then((res) => {
          // toast.success("Login Successful");
          console.log(res.data);
          dispatch({
            type: "LOGIN",
            payload: res.data,
          });
          dispatch({
            type: "LOGGED_IN",
            payload: true,
          });
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("loggedIn", true);
          history.replace("/");
        })
      //   toast.success("Signup  Login to Proceed.");
      // emailRef.current.value = "";
      // passRef.current.value = "";
      // history.replace("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" />
      <div className="signup-container">
        <div className="navbar-padding"></div>
        <div className="signup-body">
          <div className="signup-body__padding"></div>
          <span className="signup-title">LOGIN TO FITLIFE</span>
          <div className="signup-form-container">
            <div className="signup-form">
              <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-item">
                  <label className="form-item__label">Email </label>
                  <input
                    className="form-item__input"
                    type="email"
                    ref={emailRef}
                  />
                </div>
                <div className="form-item">
                  <label className="form-item__label">Password </label>
                  <input
                    className="form-item__input"
                    type="password"
                    ref={passRef}
                  />
                </div>
                <div className="form-item-container__button">
                  <button type="submit" className="form-item__button">
                    Login
                  </button>
                </div>
              </form>
              <div className="login-link__container">
                <span className="login-link__container__span">
                  New User?{" "}
                  <Link
                    className="login-link__container__span-link"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </span>
              </div>
              {/* <h1 style={{ color: "white" }}>likith.dm.28@gmail.com</h1> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
