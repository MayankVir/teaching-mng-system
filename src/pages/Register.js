import React from "react";
import authImg from "../assets/img/auth-image.svg";
import RegisterUser from "../components/register";
import "../components/common/Common.css";

const Register = () => {
  return (
    // <div className="main">
    // <div className="register">
    //   <div className="register-svg-input">
    //     <div className="register-svg-div">
    //       <img src={authImg} className="register-svg" alt="" />
    //     </div>
    //     <RegisterUser />
    //   </div>
    // </div>
    // </div>
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
        <RegisterUser />
      </div>
    </div>
    // </div>
  );
};

export default Register;
