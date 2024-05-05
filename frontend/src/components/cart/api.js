import axios from "axios";

export async function apiHelperPOST(endpoint, body) {
  const API_URL = "http://localhost:3000";
  return axios
    .post(`${API_URL}${endpoint}`, body)
    .then((response) => {
        console.log("[API]", response.data)
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function apiHelperGET(endpoint, body) {
    console.log("GET Request, body:", body)
    const API_URL = "http://localhost:3000";
    return axios
      .get(`${API_URL}${endpoint}`, body)
      .then((response) => {
          console.log("[API]", response.data)
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }