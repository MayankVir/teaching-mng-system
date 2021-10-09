import React, { useRef, useState } from "react";
import "../common/Common.css";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import authImg from "../../assets/img/auth-image.svg";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../actions/auth";
import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        This field is required!
      </div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then(() => {
          props.history.push("/dashboard");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="login-input">
      <div className="login-input-div">
        <h2 className="login-heading">Login To Continue!</h2>
        <Form onSubmit={handleLogin} ref={form} className="login-form">
          <div className="login-form-email">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              className="login-form-emailInput"
              autoComplete="username"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required, validEmail]}
            />
          </div>

          <div className="login-form-pass">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="login-form-passInput"
              autoComplete="current-password"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="login-login">
            <button className="login-loginBtn" disabled={loading}>
              {loading && <span className=""></span>} <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="">
              <div className="" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>

        <div className="login-register">
          <p className="login-register-p">
            Don't have an account?{" "}
            <Link to="/register" className="login-register-link">
              Register Now.
            </Link>
          </p>
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default Login;
