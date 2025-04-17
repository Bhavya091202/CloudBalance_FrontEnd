import apiClient from "./axiosService";

export const postApi = (url ,data) => {
  return apiClient.post(url, data);
};

export const getApi = (url) => {
  return apiClient.get(url);
}

export const putApi = (url, data) => {
  return apiClient.put(url, data);
}