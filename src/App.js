// import React from "react";
import Navbar from "./components/common/Navbar";

import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import Sidebar from "./components/common/Sidebar";
import CreateTest from "./components/tests/CreateTest";
import PreviewTest from "./components/tests/PreviewTest";
import AssignCourses from "./pages/admin/AssignCourses";
import Courses from "./pages/teacher/Courses";
// import { ToastContainer, toast } from "react-toast";

import Authentication from "./components/common/Authentication";

import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "./actions/message";
import DeleteTest from "./components/tests/extras/DeleteTest";
import AttemptedStudents from "./components/tests/AttemptedStudents";
import SeeScore from "./components/tests/GetScore";
import GiveTest from "./components/tests/GiveTest";
import ReviewTest from "./components/tests/ReviewTest";

const history = createBrowserHistory();
const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { opened: sideBarOpened } = useSelector((state) => state.sidebar);

  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  return (
    <Router history={history}>
      <Navbar user={currentUser} />
      <div className="wrapper">
        {currentUser && <Sidebar user={currentUser} />}
        <div
          className={`${
            sideBarOpened && currentUser ? "content" : "content-full"
          } rounded`}
          style={{ background: "#F2F3F7", position: "relative" }}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Authentication exact path="/dashboard" component={Dashboard} />
            <Authentication exact path="/tests" component={Test} />
            <Authentication
              exact
              path="/tests/edit/:id"
              component={CreateTest}
            />
            <Authentication
              exact
              path="/tests/preview/:id"
              component={GiveTest}
            />
            <Authentication
              exact
              path="/tests/response/:id"
              component={SeeScore}
            />
            <Authentication
              exact
              path="/tests/students/:id"
              component={AttemptedStudents}
            />
            <Authentication
              exact
              path="/tests/review/:id"
              component={ReviewTest}
            />
            <Authentication
              exact
              path="/tests/giveTest/:id"
              component={GiveTest}
            />
            <Authentication
              exact
              path="/tests/delete/:id"
              component={DeleteTest}
            />
            <Authentication exact path="/register" component={Register} />
            <Authentication
              exact
              path="/assigncourses"
              component={AssignCourses}
            />
            <Authentication exact path="/courses" component={Courses} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </Router>
  );
};

export default App;
