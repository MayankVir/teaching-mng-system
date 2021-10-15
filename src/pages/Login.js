import React from "react";
import authImg from "../assets/img/auth-image.svg";
import LoginUser from "../components/login";

import "../components/common/Common.css";

const Login = () => {
  return (
    // <div class="main">
    <div
      // className="login"
      className="container h-100 d-flex align-items-center"
    >
      <div
        // className="login-svg-input"
        className="row bg-white py-5 rounded-lg shadow my-0 my-lg-4"
        style={{ position: "relative" }}
      >
        <div
          // className="login-svg-div"
          className="col-12 col-lg-6 d-flex align-items-center justify-content-center"
        >
          <img
            src={authImg}
            // className="login-svg"
            className="w-75"
            alt=""
          />
        </div>
        <LoginUser />
      </div>
    </div>
    // </div>
  );
};

export default Login;
