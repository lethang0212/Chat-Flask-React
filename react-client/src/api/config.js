import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const instance = axios.create({
  timeout: 1000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With",
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  },
});
