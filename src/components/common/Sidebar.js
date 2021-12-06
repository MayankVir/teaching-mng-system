import React from "react";
import {
  mdiViewDashboardOutline,
  mdiViewDashboard,
  mdiGoogleSpreadsheet,
  mdiNotebookEdit,
  mdiAccountPlus,
  mdiBookMultiple,
} from "@mdi/js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import Icon from "@mdi/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../common/Common.css";
import { Scrollbars } from "react-custom-scrollbars";
// import dashboard from "../../assets/img/dashboard.png";

const Sidebar = ({ user }) => {
  const location = useLocation();
  const { opened: sideBarOpened } = useSelector((state) => state.sidebar);
  const sideNavLinks = [
    {
      to: "/dashboard",
      value: "dashboard",
      icon: mdiViewDashboardOutline,
      activeIcon: mdiViewDashboard,
      text: "Dashboard",
      showLink: ["S", "T", "A", "TA"],
    },
    {
      to: "/tests",
      value: "tests",
      icon: mdiGoogleSpreadsheet,
      activeIcon: mdiGoogleSpreadsheet,
      text: "Tests",
      showLink: ["S", "T", "A", "TA"],
    },
    {
      to: "/register",
      value: "register",
      icon: mdiAccountPlus,
      activeIcon: mdiAccountPlus,
      text: "New Registration",
      showLink: ["A"],
    },
    // {
    //   to: "/courses",
    //   value: "courses",
    //   icon: mdiBookCheck,
    //   text: "Courses",
    //   showLink: ["T", "TA"],
    // },
    {
      to: "/allcourses",
      value: "allcourses",
      icon: mdiBookMultiple,
      activeIcon: mdiBookMultiple,
      text: "All Courses",
      showLink: ["A"],
    },
  ];

  const activeIndex = sideNavLinks
    .map(({ value }) => {
      return value.toLowerCase();
    })
    .indexOf(location.pathname.split("/")[1]);

  return (
    <nav
      id="sidebar"
      className={`bg-dark ${sideBarOpened ? "show" : ""}`}
      style={{ border: "none" }}
    >
      <Scrollbars style={{ width: 500, height: 600 }}>
        <ul className="list-unstyled" id="sidenav">
          {sideNavLinks.map((item, index) =>
            item.showLink.includes(user.type) ? (
              <li
                key={index}
                className={`sideTab ${
                  activeIndex === index ? "active " : "text-white"
                }`}
              >
                <Link to={item.to} className="text-decoration-none d-flex">
                  {/* <FontAwesomeIcon icon={faCoffee} className="" /> */}
                  <Icon
                    size={1}
                    path={activeIndex === index ? item.activeIcon : item.icon}
                    style={{ marginRight: "5px" }}
                    className="mr-2"
                  />{" "}
                  {item.text}
                </Link>
              </li>
            ) : (
              <span key={index}></span>
            )
          )}
        </ul>
      </Scrollbars>
    </nav>
  );
};

export default Sidebar;
