import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Navbar.css";
import { Menu } from "antd";
import {
  StarOutlined,
  LogoutOutlined,
  RiseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { UserContext } from "../context/auth-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const history = useHistory();
  const [current, setCurrent] = useState("");
  const handleClick = () => {};
  const userCtx = useContext(UserContext);
  const userData = userCtx.state.user;
  const isAdmin = userCtx.state.admin;

  const [logout, setLogout] = useState(false);

  const logoutHandler = () => {
    setLogout(true);
    userCtx.dispatch({
      type: "LOGOUT",
    });
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("membership");
    toast("Logged out successfully!");
    history.replace("/");
  };

  console.log("navbar", userCtx.state);

  return (
    <>
      {logout && <ToastContainer position="top-center" />}
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <header className="main-header">
          <div className="main-header__title-container">
            <div className="main-header__title">
              <Link to="/" className="main-header__title__link">
                {" "}
                FITLIFE
              </Link>
            </div>
          </div>
          <nav className="main-nav">
            <ul className="main-nav__items">
              <li className="main-nav__item green">
                <Menu.Item key="mail" icon={<StarOutlined />}>
                  {" "}
                  <a
                    className="nav-link green"
                    href="#membership-plans-container"
                  >
                    MEMBERSHIP
                  </a>
                </Menu.Item>
              </li>
              {userData && (
                <>
                  <li className="main-nav__item green">
                    <Menu.Item key="mail" icon={<UserOutlined />}>
                      {" "}
                      {userData.name}
                    </Menu.Item>
                  </li>
                  <li className="main-nav__item green">
                    <Link to="/workouts" className="workout-link">
                      <Menu.Item key="workouts" icon={<RiseOutlined />}>
                        {" "}
                        WORKOUTS
                      </Menu.Item>
                    </Link>
                  </li>
                </>
              )}
              {userData && (
                <li className="main-nav__item red" onClick={logoutHandler}>
                  <Menu.Item key="mail" icon={<LogoutOutlined />}>
                    Logout
                  </Menu.Item>
                </li>
              )}
            </ul>
          </nav>
        </header>
      </Menu>
    </>
  );
}
