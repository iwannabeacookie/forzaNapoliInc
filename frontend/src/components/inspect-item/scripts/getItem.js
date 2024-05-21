import axios from "axios";

export default function getItem(id) {
  console.info(`[API] Requesting ${id}`);
  const API_URL = "http://localhost:3000";
  return axios
    .get(`${API_URL}/api/item/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Blyat:", error);
      return error;
    });
}
