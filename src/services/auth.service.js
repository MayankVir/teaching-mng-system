/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { BASE_URL } from "../assets/js/config";

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
        localStorage.setItem(
          "priksha_name",
          JSON.stringify(response.data.name)
        );
        localStorage.setItem(
          "priksha_token",
          JSON.stringify(response.data.token)
        );
        localStorage.setItem(
          "priksha_type",
          JSON.stringify(response.data.type)
        );
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("priksha_name");
  localStorage.removeItem("priksha_token");
  localStorage.removeItem("priksha_type");
};

export default {
  register,
  login,
  logout,
};
