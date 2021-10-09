import React from "react";
import { useSelector } from "react-redux";

import StudentDashboard from "../components/common/StudentDashboard";

const Dashboard = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  switch (currentUser.type) {
    case "S":
      return <StudentDashboard />;
    case "A":
      return (
        <div
          style={{ background: "#F2F3F7", height: "90vh", userSelect: "none" }}
        >
          Welcome Admin!!
        </div>
      );
    default:
      return <div>Some error occured!</div>;
  }
};

export default Dashboard;
