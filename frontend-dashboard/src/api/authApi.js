import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // cookie support
});

export const loginUser = (data) => API.post("/login", data);
