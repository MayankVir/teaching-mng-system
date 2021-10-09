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

import Authentication from "./components/common/Authentication";

import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "./actions/message";
import DeleteTest from "./components/tests/extras/DeleteTest";

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
              path="/tests/delete/:id"
              component={DeleteTest}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
