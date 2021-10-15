import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { mdiArrowLeft, mdiLogout, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import "./Common.css";
import { logout } from "../../actions/auth";
// import {
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";

import { toggleSidebar } from "../../actions/sidebar";

import SVGI from "./SVG.js";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();

  const { opened: sideBarOpened } = useSelector((state) => state.sidebar);

  const logOut = () => {
    dispatch(logout());
  };

  const _toggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const userName = () => {
    const user = JSON.parse(window.localStorage["user"]);
    return user.name;
  };

  const userTypeMapping = {
    A: "Admin",
    S: "Student",
    T: "Teacher",
    E: "Evaluator",
  };

  return (
    <nav className="navbar navbar-light bg-white border fixed-top px-3">
      {user && (
        <div
          className="mr-auto text-primary d-flex"
          type="button"
          onClick={_toggleSidebar}
        >
          <Icon path={sideBarOpened ? mdiArrowLeft : mdiMenu} size={1} />
          <div
            className="userNameType"
            style={{ marginLeft: "5px", userSelect: "none" }}
          >
            {userTypeMapping[user.type]} Dashboard{" "}
          </div>
        </div>
      )}
      <Link to={user ? "dashboard" : "/"} className=" nav-svg navbar-brand m-0">
        <SVGI />
      </Link>
      <div className="nav-links">
        {user ? (
          <>
            <div className="nav-item loggedInUser">
              <div className="userName">
                <img
                  src={`https://ui-avatars.com/api/?background=4F7CAC&color=fff&name=${userName()
                    .split(" ")
                    .join("+")}`}
                  width="30px"
                  className=""
                  alt="Kushal Poddar"
                />
              </div>
              <div className="userLogout" onClick={logOut}>
                <Icon size={1} path={mdiLogout} className="mr-1" /> Logout
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="nav-item">
              <Link to={"/login"} className="nav-login">
                Login
              </Link>
            </div>
            <div className="nav-item">
              <Link to={"/register"} className="nav-register">
                Sign Up
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
