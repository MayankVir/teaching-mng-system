/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const BASE_URL = "http://81.4.100.184:5678/";

const register = (name, type, email, mobile, password) => {
  return axios.post(BASE_URL + "api/user", {
    name,
    type,
    mobile,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(BASE_URL + "api/auth", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
