import React from "react";
import authImg from "../assets/img/auth-image.svg";
import RegisterUser from "../components/register";
import "../components/common/Common.css";

const Register = () => {
  return (
    <div className="container h-100 w-75">
      <div className="row bg-white py-5 rounded-lg shadow my-0 my-lg-4 justify-content-center">
        <RegisterUser />
      </div>
    </div>
    // </div>
  );
};

export default Register;
