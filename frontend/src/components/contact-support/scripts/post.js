import axios from "axios";
const API_URL = process.env.NUXT_API_URL;

export function postTicket(body) {
  console.info("[API] POST Request, body:", body);
  return axios
    .post(`${API_URL}/api/ticket`, body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Blyat:", error);
      return error;
    });
}
