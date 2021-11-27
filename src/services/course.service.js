/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "http://81.4.100.184:5678/";
// const BASE_URL = "http://localhost:5678/";

const saveOneCourse = (data) => {
  return axios.post(BASE_URL + "api/course", data, {
    headers: authHeader(),
  });
};

const getAllCourses = () => {
  return axios.get(BASE_URL + "api/course", {
    headers: authHeader(),
  });
};

const getOneCourse = (id) => {
  return axios.get(BASE_URL + `api/course/${id}`, {
    headers: authHeader(),
  });
};
const deleteOneCourse = (id) => {
  return axios.delete(BASE_URL + `api/course/${id}`, {
    headers: authHeader(),
  });
};

export default {
  saveOneCourse,
  getAllCourses,
  getOneCourse,
  deleteOneCourse,
};
