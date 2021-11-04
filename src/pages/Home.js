import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import HomePage from "../components/home/Home";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default Home;
