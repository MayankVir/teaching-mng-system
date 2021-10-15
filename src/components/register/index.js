import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../common/Common.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../../actions/auth";
import { Redirect } from "react-router-dom";

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

const validMobile = (value) => {
  if (!(value.length === 10)) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        This is not a valid mobile. Should be 10 digits!
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [state, setState] = useState({
    name: "",
    type: "S",
    email: "",
    mobile: "",
    password: "",
  });

  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.message);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onChangeForm = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(
        register(
          state.name,
          state.type,
          state.email,
          state.mobile,
          state.password
        )
      )
        .then(() => {
          setSuccessful(true);
          setLoading(false);
        })
        .catch(() => {
          setSuccessful(false);
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
    <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
      <div className="register-input-div">
        <h2 className="register-heading">Register New User</h2>
        <Form onSubmit={handleRegister} ref={form} className="register-form">
          <div className="register-form-name">
            <label htmlFor="name">Full Name</label>
            <Input
              type="text"
              className="register-form-nameInput"
              name="name"
              value={state.name}
              onChange={onChangeForm}
              validations={[required]}
            />
          </div>
          <div className="register-form-email">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              autoComplete="username"
              className="register-form-emailInput"
              name="email"
              value={state.email}
              onChange={onChangeForm}
              validations={[required, validEmail]}
            />
          </div>
          <div className="register-form-mobile">
            <label htmlFor="mobile">Mobile</label>
            <Input
              type="number"
              className="register-form-mobileInput"
              name="mobile"
              value={state.mobile}
              onChange={onChangeForm}
              validations={[required, validMobile]}
            />
          </div>
          <div>
            <label className="mb-0">User Type</label>
          </div>
          <div className="user-types">
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="type"
                value="S"
                defaultChecked
                onChange={onChangeForm}
              />
              <label className="form-check-label" htmlFor="type">
                Student
              </label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="type"
                value="T"
                onChange={onChangeForm}
              />
              <label className="form-check-label" htmlFor="type">
                Teacher
              </label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="type"
                value="A"
                onChange={onChangeForm}
              />
              <label className="form-check-label" htmlFor="type">
                Admin
              </label>
            </div>
          </div>
          <div className="register-form-pass">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="register-form-passInput"
              autoComplete="new-password"
              name="password"
              value={state.password}
              onChange={onChangeForm}
              validations={[required, vpassword]}
            />
          </div>

          <div className="register-signup">
            <button
              className="register-signupBtn"
              disabled={loading || (successful && !loading)}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}{" "}
              <span>Sign Up</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
