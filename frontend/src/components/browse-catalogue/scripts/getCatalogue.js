import axios from "axios";

export default function getCatalogue() {
  console.info("[API] Requesting catalogue...");
  return axios
    .get(`${process.env.API_URL}/api/catalogue`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Blyat:", error);
      return error;
    });
}
