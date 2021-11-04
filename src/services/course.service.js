/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "http://81.4.100.184:5678/";
// const BASE_URL = "http://localhost:5678/";

const saveOneCourse = (course) => {
  //   return axios.put(BASE_URL + "api/newCourse/", course, {
  //     headers: authHeader(),
  //   });
  return new Promise((resolve, reject) => {
    const response = { headers: authHeader, data: course };
    resolve(response);
    reject("There is some error");
  });
};

export default {
  saveOneCourse,
};
