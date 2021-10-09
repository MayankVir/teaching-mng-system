import React from "react";
import authImg from "../assets/img/auth-image.svg";
import RegisterUser from "../components/register";
import "../components/common/Common.css";

const Register = () => {
  return (
    <div className="main">
      <div className="register">
        <div className="register-svg-input">
          <div className="register-svg-div">
            <img src={authImg} className="register-svg" alt="" />
          </div>
          <RegisterUser />
        </div>
      </div>
    </div>
  );
};

export default Register;
