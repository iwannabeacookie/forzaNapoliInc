import axios from "axios";
const API_URL = process.env.API_URL;

export default function getItem(id) {
  console.info(`[API] Requesting ${id}`);
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
