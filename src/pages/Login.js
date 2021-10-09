import React from "react";
import authImg from "../assets/img/auth-image.svg";
import LoginUser from "../components/login";

import "../components/common/Common.css";

const Login = () => {
  return (
    <div class="main">
      <div className="login">
        <div className="login-svg-input">
          <div className="login-svg-div">
            <img src={authImg} className="login-svg" alt="" />
          </div>
          <LoginUser />
        </div>
      </div>
    </div>
  );
};

export default Login;
