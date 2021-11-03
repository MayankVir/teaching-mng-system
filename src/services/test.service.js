/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "http://81.4.100.184:5678/";
// const BASE_URL = "http://localhost:5678/";

const getAllTests = () => {
  return axios.get(BASE_URL + "api/quiz", { headers: authHeader() });
};

const getOneTest = (id) => {
  return axios.get(BASE_URL + "api/quiz/" + id, {
    headers: authHeader(),
  });
};

const createOneTest = () => {
  return axios.post(BASE_URL + "api/quiz", {}, { headers: authHeader() });
};

const saveOneTest = (data, id) => {
  return axios.put(BASE_URL + "api/quiz/" + id, data, {
    headers: authHeader(),
  });
};

const deleteOneTest = (id) => {
  return axios.delete(BASE_URL + "api/quiz/" + id, {
    headers: authHeader(),
  });
};

const assignEmail = (data, id) => {
  return axios.put(
    BASE_URL + "api/quizassign/assign/" + id,
    { emails: data },
    {
      headers: authHeader(),
    }
  );
};
const getAssignedUsers = (id) => {
  return axios.get(BASE_URL + "api/quizassign?quiz=" + id, {
    headers: authHeader(),
  });
};

const getOneResponse = (email) => {
  return axios.get(BASE_URL + "api/quizassign/?email=" + email, {
    headers: authHeader(),
  });
};

const loadStudentResponse = (id) => {
  return axios.get(BASE_URL + `api/quizassign/${id}`, {
    headers: authHeader(),
  });
};

const getOneCourse = (id) => {
  return new Promise();
};

const putUserResponse = (id, response) => {
  return axios.put(
    BASE_URL + `api/quizassign/updateresponse?quiz=${id}`,
    { response },
    {
      headers: authHeader(),
    }
  );
};

export default {
  getAllTests,
  getOneTest,
  createOneTest,
  saveOneTest,
  deleteOneTest,
  assignEmail,
  getAssignedUsers,
  getOneResponse,
  putUserResponse,
  loadStudentResponse,
};
