import axios from "axios";

export default axios.create({
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: "",
  headers: { "Content-Type": "application/json" },
});
