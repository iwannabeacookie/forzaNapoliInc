import axios from "axios";
const API_URL = process.env.API_URL;

export default function getCatalogue() {
  console.info("[API] Requesting catalogue...");
  return axios
    .get(`${API_URL}/api/catalogue`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Blyat:", error);
      return error;
    });
}
