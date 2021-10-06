import axiosInstance from "./config";

const URL = "http://localhost:5000/";

export const getRequest = endPoint => {
  return axiosInstance.get(URL + endPoint);
};

export const postRequest = (users, newUser) => {
  return axiosInstance.post(URL + users, {
    name: newUser.name
  });
};

export const editRequest = (endPoint, data) => {
  return axiosInstance.put(URL + endPoint, data);
};

export const deleteRequest = (endPoint, data) => {
  return axiosInstance.delete(URL + endPoint, { data });
};