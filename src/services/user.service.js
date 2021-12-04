/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";
import { BASE_URL } from "../assets/js/config";

const getPublicContent = () => {
  return axios.get(BASE_URL);
};

const getAllUsers = () => {
  return axios.get(BASE_URL + "api/user", { headers: authHeader() });
};

// const getAssignedUsers = (id) => {
//   return axios.get(BASE_URL + "api/quizassign" + "?quiz=" + id, {
//     headers: authHeader(),
//   });
// };

// const putUserResponse = (id, response) => {
//   const body = { response: response };
//   return axios.put(BASE_URL + "api/quizassign/" + id, body, {
//     headers: authHeader(),
//   });
// };
const putUserReviewScore = (id, marking) => {
  const body = { marking: marking };
  return axios.put(BASE_URL + "api/quizassign/" + id, body, {
    headers: authHeader(),
  });
};
// const getOneResponse = (email) => {
//   return axios.get(BASE_URL + "api/quizassign/?email=" + email, {
//     headers: authHeader(),
//   });
// };
const getDetails = () => {
  return axios.get(BASE_URL + "api/user/me", { headers: authHeader() });
};

// const getAllTests = () => {
//   return axios.get(BASE_URL + "api/quiz", { headers: authHeader() });
// };

// const getOneTest = (id) => {
//   return axios.get(BASE_URL + "api/quiz/" + id, { headers: authHeader() });
// };

// const createOneTest = () => {
//   return axios.post(BASE_URL + "api/quiz", {}, { headers: authHeader() });
// };

// const saveOneTest = (data, id) => {
//   return axios.put(BASE_URL + "api/quiz/" + id, data, {
//     headers: authHeader(),
//   });
// };

// const deleteOneTest = (id) => {
//   return axios.delete(BASE_URL + "api/quiz/" + id, {
//     headers: authHeader(),
//   });
// };

// const assignEmail = (data, id) => {
//   return axios.put(
//     BASE_URL + "api/quizassign/assign/" + id,
//     { emails: data },
//     {
//       headers: authHeader(),
//     }
//   );
// };

// async function uploadFile(file, testId) {
//   let data = new FormData();
//   data.append("file", file);
//   data.append("type", "QUIZ");
//   data.append("id", testId);
//   return await axios.post(BASE_URL + "api/upload", data, {
//     headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
//   });
// }

export default {
  getPublicContent,
  // getAssignedUsers,
  getAllUsers,
  // putUserResponse,
  putUserReviewScore,
  getDetails,
  // uploadFile,
  // getAllTests,
  // getOneTest,
  // getOneResponse,
  // saveOneTest,
  // createOneTest,
  // deleteOneTest,
  // assignEmail,
};
