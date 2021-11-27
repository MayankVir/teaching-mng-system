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
        console.log(response.data);
        // localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("name", JSON.stringify(response.data.name));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("type", JSON.stringify(response.data.type));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("name");
  localStorage.removeItem("token");
  localStorage.removeItem("type");
};

export default {
  register,
  login,
  logout,
};
