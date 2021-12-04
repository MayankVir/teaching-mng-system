/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";
import { BASE_URL } from "../assets/js/config";

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
