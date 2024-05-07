import axios from "axios";

export async function getHistory(body) {
  console.info("[API] GET Request, body:", body);
  const API_URL = "http://localhost:3000";
  axios
    .get(`${API_URL}/api/user/history`, body)
    .then((response) => {
      console.info("[API] Response:", response.data.orders);
      return response.data.orders;
    })
    .catch((error) => {
      console.log("blyat", error);
      return error;
    });
}
