import axios from "axios";

export function getHistory(body) {
  console.info("[API] POST Request, body:", body);
  const API_URL = "http://localhost:3333";
  return axios
    .post(`${API_URL}/api/user/history`, body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Blyat:", error);
      return error;
    });
}
