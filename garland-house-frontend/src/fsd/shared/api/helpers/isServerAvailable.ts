import axios, { AxiosError } from "axios";
import { api, baseURL } from "../axiosConfig";

let headUrl = baseURL;
if (process.env.NODE_ENV === "production")
  headUrl = headUrl.replace("/api", "");

export async function isServerAvailable() {
  try {
    const res = await axios.head(headUrl);
    if (res.status === 200) console.log("server available");
    return res.status === 200;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (process.env.NODE_ENV === "development" && axiosError.status === 404) {
      console.log("server available");
      return true;
    }
    return false;
  }
}
