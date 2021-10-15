import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { mdiArrowLeft, mdiLogout, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
// import "./Common.css";
import { logout } from "../../actions/auth";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

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
          <div style={{ marginLeft: "5px", userSelect: "none" }}>
            {userTypeMapping[user.type]} Dashboard{" "}
          </div>
        </div>
      )}
      <Link
        to={user ? "dashboard" : "/"}
        // className="navbar-svg"
        className="navbar-brand m-0"
      >
        <SVGI />
      </Link>
      <ul
        // className="nav-links">
        className="nav ml-auto"
      >
        {user ? (
          <>
            <li className="nav-item">
              <UncontrolledDropdown>
                <DropdownToggle className="border-0 bg-white text-dark">
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      src={`https://ui-avatars.com/api/?background=4F7CAC&color=fff&name=${userName()
                        .split(" ")
                        .join("+")}`}
                      width="30px"
                      className="rounded-circle"
                      alt="Avi Garg"
                    />
                    <p
                      className="mb-0 pl-2 small d-none d-lg-block"
                      style={{ marginLeft: "5px" }}
                    >
                      {userName()}
                    </p>
                  </div>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className="no-focus d-flex align-items-center"
                    onClick={logOut}
                  >
                    <Icon size={1} path={mdiLogout} className="mr-1" /> Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
            {/* <div className="nav-item loggedInUser">
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
            </div> */}
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
      </ul>
    </nav>
  );
};

export default Navbar;
