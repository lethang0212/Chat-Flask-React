import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  res => res.data,
  error => {
    console.log(error);
  }
);

export default axiosInstance;