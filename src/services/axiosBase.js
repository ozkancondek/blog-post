import axios from "axios";

const base_url = "https://jsonplaceholder.typicode.com";
export const API = axios.create({
  baseURL: base_url,
});
