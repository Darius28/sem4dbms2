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
  const usernameRef = useRef();
  const passRef = useRef();
  const cpassRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const dateRef = useRef();
  const [gender, setGender] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const cpassword = cpassRef.current.value;
    const phone = phoneRef.current.value;
    const dob = dateRef.current.value;

    try {
      await axios
        .post("http://localhost:4000/users/signup", {
          name,
          username,
          email,
          password,
          cpassword,
          phone,
          dob,
          gender,
        })
        .then(() => {
          toast.success("Signup successful! Login to Proceed.");
          nameRef.current.value = "";
          usernameRef.current.value = "";
          emailRef.current.value = "";
          passRef.current.value = "";
          cpassRef.current.value = "";
          phoneRef.current.value = "";
          dateRef.current.value = "";
        });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
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
                <div className="signup-form-item">
                  <label className="signup-form-item__label">Name </label>
                  <input
                    className="form-item__input"
                    type="text"
                    ref={nameRef}
                    required
                  />
                </div>
                <div className="signup-form-item">
                  <label className="signup-form-item__label">Username </label>
                  <input
                    className="form-item__input"
                    type="text"
                    ref={usernameRef}
                    required
                  />
                </div>
                <div className="signup-form-item">
                  <label className="signup-form-item__label">Email </label>
                  <input
                    className="form-item__input"
                    type="email"
                    ref={emailRef}
                    required
                  />
                </div>
                <div className="signup-form-item">
                  <label className="signup-form-item__label">Password </label>
                  <input
                    className="form-item__input"
                    type="password"
                    ref={passRef}
                    required
                  />
                </div>
                <div className="signup-form-item">
                  <label className="signup-form-item__label">
                    Confirm Password{" "}
                  </label>
                  <input
                    className="form-item__input"
                    type="password"
                    ref={cpassRef}
                    required
                  />
                </div>
                <div className="signup-form-item">
                  <label className="signup-form-item__label">Phone No. </label>
                  <input
                    className="form-item__input"
                    type="tel"
                    ref={phoneRef}
                    required
                  />
                </div>
                <div className="signup-form-item">
                  <label className="signup-form-item__label">
                    Date of Birth{" "}
                  </label>
                  <input
                    className="form-item__input"
                    type="date"
                    ref={dateRef}
                    required
                  />
                </div>
                <div className="signup-form-item__radio">
                  <div>
                    <label className="signup-form-item__label">Gender: </label>
                  </div>
                  <div className="signup-gender-radio">
                    <div>
                      <input
                        onChange={handleGenderChange}
                        name="gender"
                        value="male"                        
                        type="radio"
                        required
                      />
                      <label className="gender-label">Male</label>
                    </div>
                    <div>
                      <input
                        onChange={handleGenderChange}
                        name="gender"
                        value="female"
                        type="radio"
                        required
                      />
                      <label className="gender-label">Female</label>
                    </div>
                  </div>
                </div>
                <div className="form-item-container__button">
                  <button type="submit">
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="login-link__container">
                <span className="login-link__container__span">
                  Already a registered user?{" "}
                  <Link
                    className="login-link__container__span-link"
                    to="/login"
                  >
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
