import axios from "axios";
export const API_URL = "http://localhost:3000";

export async function apiHelperPOST(endpoint, body) {
  console.info("[API] POST Request, body:", body);
  return axios
    .post(`${API_URL}${endpoint}`, body)
    .then((response) => {
      console.info("[API] Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function apiHelperGET(endpoint, body) {
  console.info("[API] GET Request, body:", body);
  return axios
    .get(`${API_URL}${endpoint}`, body)
    .then((response) => {
      console.info("[API] Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
