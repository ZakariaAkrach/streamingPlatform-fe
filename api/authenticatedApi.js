import api from "./axiosConfig";

const isAuthenticated = () => localStorage.getItem("token") != null;

export const safeGET = async (url, config = {}) => {
  if (!isAuthenticated()) {
    return Promise.reject("No token found")
  }
  return api.get(url, config)
};

export const safePOST = async (url, data, config = {}) => {
  if (!isAuthenticated()) {
    return Promise.reject("No token found")
  }
  return api.post(url, data, config);
};


export const safePUT = async (url, data, config = {}) => {
  if (!isAuthenticated()) {
    return Promise.reject("No token found")
  }
  return api.put(url, data, config);
};

export const safeDelete = async (url, data, config = {}) => {
  if (!isAuthenticated()) {
    return Promise.reject("No token found")
  }
  return api.delete(url, data, config);
};
