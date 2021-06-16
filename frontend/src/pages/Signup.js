import React, { useRef, useState } from "react";
import "./Signup.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function Signup() {
  const history = useHistory();
  const nameRef = useRef();
  const passRef = useRef();
  const cpassRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const cpassword = cpassRef.current.value;

    try {
      const sno = Math.round(Math.random() * 10000);
      console.log("just b4 axios")
      await axios.post("http://localhost:4000/users/signup", {
        sno,
        name,
        email,
        password,
        cpassword,
      });
      toast.success("Signup successful! Login to Proceed.");
      nameRef.current.value = "";
      emailRef.current.value = "";
      passRef.current.value = "";
      cpassRef.current.value = "";
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
          <span className="signup-title">SIGN UP TO CONTINUE</span>
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
                  <label className="form-item__label">Username </label>
                  <input
                    className="form-item__input"
                    type="text"
                    ref={nameRef}
                  />
                </div>
                <div className="form-item">
                  <label className="form-item__label">Phone </label>
                  <input
                    className="form-item__input"
                    type="number"
                    ref={phoneRef}
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
                <div className="form-item">
                  <label className="form-item__label">Confirm Password </label>
                  <input
                    className="form-item__input"
                    type="password"
                    ref={cpassRef}
                  />
                </div>
                <div className="form-item-container__button">
                  <button type="submit" className="form-item__button">
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="login-link__container">
                <span className="login-link__container__span">
                  Already a registered user?{" "}
                  <Link className="login-link__container__span-link" to="/login">
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
