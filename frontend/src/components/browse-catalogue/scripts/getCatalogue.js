import axios from "axios";
import { useRuntimeConfig } from "nuxt/app";
const API_URL = useRuntimeConfig().apiUrl;

export default function getCatalogue() {
    const API_URL = useRuntimeConfig().apiUrl;
  console.info("[API] Requesting catalogue...");
    console.info("[API] URL:", `${API_URL}/api/catalogue`);
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
