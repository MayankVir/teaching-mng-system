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
import Courses from "./pages/teacher/Courses";

import Authentication from "./components/common/Authentication";

import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "./actions/message";
import DeleteTest from "./components/tests/extras/DeleteTest";
import AttemptedStudents from "./components/tests/AttemptedStudents";
import SeeScore from "./components/tests/GetScore";
import GiveTest from "./components/tests/GiveTest";
import ReviewTest from "./components/tests/ReviewTest";
import CreateCourse from "./pages/admin/CreateCourse";
import AllCourses from "./pages/admin/AllCourses";
import ViewCourse from "./pages/admin/ViewCourse";
import DeleteCourse from "./pages/admin/DeleteCourse";
import VideoMonitor from "./components/tests/VideoMonitor";

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
            <Authentication
              exact
              path="/tests/videomonitor/:id"
              component={VideoMonitor}
            />
            <Authentication
              exact
              path="/createcourse"
              component={CreateCourse}
            />
            {/* <Authentication
              exact
              path="/createcourse/:id"
              component={CreateCourse}
            /> */}
            <Authentication
              exact
              path="/allcourses/:id"
              component={ViewCourse}
            />
            <Authentication exact path="/register" component={Register} />
            {/* <Authentication
              exact
              path="/assigncourses"
              component={AssignCourses}
            /> */}
            <Authentication
              exact
              path="/allcourses/delete/:id"
              component={DeleteCourse}
            />
            <Authentication exact path="/allcourses" component={AllCourses} />
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
