import axios from "axios";

/* export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://kalc.pro/api"
    : "http://localhost:8080"; */

export const baseURL = "http://localhost:8080";

export const api = axios.create({
  baseURL,
});
