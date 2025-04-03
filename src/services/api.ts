import axios from "axios";

export const api = axios.create({
  baseURL: process.env.BASEUR,
  headers: {
    "Content-Type": "application/json",
  },
});
