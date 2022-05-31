import { API } from "./axiosBase";

export const fetchData = async () => {
  let res = await API("/posts");
  return res.data;
};
export const fetchDataComments = async (id) => {
  let res = await API(`/posts/${id}/comments`);
  return res.data;
};

export const fetchSingleData = async (id) => {
  let res = await API(`/posts/${id}`);
  return res.data;
};

export const postData = async (data) => {
  let res = await API.post("/posts", data);
  return res.data;
};

export const deleteData = async (id) => {
  let res = await API.delete(`/posts/${id}`);
  return res.data;
};
export const updateData = async (id, data) => {
  let res = await API.put(`/posts/${id}`, data);
  return res.data;
};

export const blogServices = {
  fetchData,
  fetchDataComments,
  fetchSingleData,
  postData,
  deleteData,
  updateData,
};
