import axios from "axios";

export async function apiHelperPOST(endpoint, body) {
  console.info("[API] POST Request, body:", body);
  const API_URL = "http://localhost:3000";
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
  const API_URL = "http://localhost:3000";
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
