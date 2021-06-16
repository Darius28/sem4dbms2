import React from "react";
import Backdrop from "./Backdrop";
import Navbar from "./Navbar";
import IntroText from "./IntroText";
import Membership from "./Membership"
import "./MainLayout.css";
import UserButtons from "./UserButtons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainLayout() {
  return (
    <>
      <div className="main-layout">
        <Backdrop />
        <Navbar />
        <ToastContainer position="top-center" />
        <div className="intro-text-container">
          <div className="intro-text__top"></div>
          <IntroText />
          <UserButtons />
        </div>
      </div>
      <div id="membership-plans-container">
        <Membership />
      </div>
    </>
  );
}
