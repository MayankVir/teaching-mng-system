import React from "react";
import {
  mdiMonitorDashboard,
  mdiNotebookEdit,
  mdiAccountPlus,
  mdiBookCheck,
  mdiBookMultiple,
} from "@mdi/js";
import Icon from "@mdi/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../common/Common.css";
import { Scrollbars } from "react-custom-scrollbars";

const Sidebar = ({ user }) => {
  const location = useLocation();
  const { opened: sideBarOpened } = useSelector((state) => state.sidebar);
  const sideNavLinks = [
    {
      to: "/dashboard",
      value: "dashboard",
      icon: mdiMonitorDashboard,
      text: "Dashboard",
      showLink: ["S", "T", "A"],
    },
    {
      to: "/tests",
      value: "tests",
      icon: mdiNotebookEdit,
      text: "Tests",
      showLink: ["S", "T", "A"],
    },
    {
      to: "/register",
      value: "register",
      icon: mdiAccountPlus,
      text: "Register Teacher",
      showLink: ["A"],
    },
    // {
    //   to: "/assigncourses",
    //   value: "assigncourses",
    //   icon: mdiBookCheck,
    //   text: "Assign Courses",
    //   showLink: ["A"],
    // },
    {
      to: "/courses",
      value: "courses",
      icon: mdiBookCheck,
      text: "Courses",
      showLink: ["T"],
    },
    {
      to: "/allcourses",
      value: "allcourses",
      icon: mdiBookMultiple,
      text: "All Courses",
      showLink: ["A", "T"],
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
      className={`bg-white ${sideBarOpened ? "show" : ""}`}
      // style={{ overflow: "auto" }}
    >
      <Scrollbars style={{ width: 500, height: 600 }}>
        <ul className="list-unstyled" id="sidenav">
          {sideNavLinks.map((item, index) =>
            item.showLink.includes(user.type) ? (
              <li
                key={index}
                className={`sideTab ${activeIndex === index ? "active" : ""}`}
              >
                <Link to={item.to} className="text-decoration-none d-flex">
                  <Icon
                    size={1}
                    path={item.icon}
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
