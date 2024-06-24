import axios from "axios";

export default function getItem(id) {
  console.info(`[API] Requesting ${id}`);
  return axios
    .get(`${process.env.API_URL}/api/item/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Blyat:", error);
      return error;
    });
}
