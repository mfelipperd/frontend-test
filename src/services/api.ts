import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3003/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
});
