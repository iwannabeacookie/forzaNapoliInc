import axios from "axios";

export function postTicket(body) {
  console.info("[API] POST Request, body:", body);
  const API_URL = "http://localhost:3000";
  return axios
    .post(`${API_URL}/api/submit-ticket`, body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Blyat:", error);
      return error;
    });
}
