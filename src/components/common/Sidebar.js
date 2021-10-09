import React from "react";
import { mdiMonitorDashboard, mdiNotebookEdit } from "@mdi/js";
import Icon from "@mdi/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../common/Common.css";

const Sidebar = ({ user }) => {
  const location = useLocation();
  const { opened: sideBarOpened } = useSelector((state) => state.sidebar);
  const sideNavLinks = [
    {
      to: "/dashboard",
      icon: mdiMonitorDashboard,
      text: "Dashboard",
      showLink: ["S", "T", "A"],
    },
    {
      to: "/tests",
      icon: mdiNotebookEdit,
      text: "Tests",
      showLink: ["S", "T", "A"],
    },
  ];

  const activeIndex = sideNavLinks
    .map(({ text }) => {
      return text.toLowerCase();
    })
    .indexOf(location.pathname.split("/")[1]);

  return (
    <nav id="sidebar" className={`bg-white ${sideBarOpened ? "show" : ""}`}>
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
    </nav>
  );
};

export default Sidebar;
