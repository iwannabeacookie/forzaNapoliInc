import axios from "axios";

export default function getCatalogue() {
  console.info("[API] Requesting catalogue...");
  const API_URL = "http://localhost:3000";
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
