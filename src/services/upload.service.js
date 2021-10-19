/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "http://81.4.100.184:5678/";
// const BASE_URL = "http://localhost:5678/";

async function uploadFile(file, testId) {
  let data = new FormData();
  data.append("file", file);
  data.append("type", "QUIZ");
  data.append("id", testId);
  return await axios.post(BASE_URL + "api/upload", data, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });
}

export default {
  uploadFile,
};
