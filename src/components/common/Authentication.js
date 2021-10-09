import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const Authentication = ({ component: Component, ...rest }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default Authentication;
