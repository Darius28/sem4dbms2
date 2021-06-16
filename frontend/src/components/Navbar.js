import React, { useState, useContext } from "react";
import "./Navbar.css";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  StarOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {Link} from "react-router-dom"
import { UserContext } from "../context/auth-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { SubMenu } = Menu;

export default function Navbar() {
  const [current, setCurrent] = useState("");
  const handleClick = () => {};
  const userCtx = useContext(UserContext);
  const userData = userCtx.state.user;
  const [logout, setLogout] = useState(false);

  const logoutHandler = () => {
    setLogout(true);
    userCtx.dispatch({
      type: "LOGOUT",
    });
    localStorage.removeItem("user");
    toast("Logged out successfully!");
  };

  return (
    <>
      {logout && <ToastContainer position="top-center" />}
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <header className="main-header">
          <div className="main-header__title-container">
            <div className="main-header__title">FITLIFE</div>
          </div>
          <nav className="main-nav">
            <ul className="main-nav__items">
              <li className="main-nav__item orange">
                <Menu.Item key="mail" icon={<HomeOutlined />}>
                  {" "}
                  <Link to="/" className="nav-link orange"> HOME</Link>
                </Menu.Item>
              </li>
              <li className="main-nav__item orange">
                <Menu.Item key="mail" icon={<UserOutlined />}>
                  {" "}
                  ABOUT US
                </Menu.Item>
              </li>
              <li className="main-nav__item green">
                <Menu.Item key="mail" icon={<ShoppingCartOutlined />}>
                  {" "}
                  <Link to="/shop" className="nav-link green"> SHOP</Link>
                </Menu.Item>
              </li>
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
                <li className="main-nav__item green">
                  <Menu.Item key="mail" icon={<StarOutlined />}>
                    {" "}
                    {userData.name}
                  </Menu.Item>
                </li>
              )}
              {userData && (
                <li className="main-nav__item red" onClick={logoutHandler}>
                  <Menu.Item key="mail" icon={<LogoutOutlined />}>
                    {" "}
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
