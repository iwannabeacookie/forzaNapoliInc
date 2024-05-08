import axios from "axios";
// const headers = {
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//   },
// };

export function getHistory(body) {
  console.info("[API] POST Request, body:", body);
  const API_URL = "http://localhost:3000";
  return axios
    .post(`${API_URL}/api/user/history`, body)
    .then((response) => {
      console.info("[API] Response:", response.data.orders);
      return response.data.orders;
    })
    .catch((error) => {
      console.log("blyat", error);
      return error;
    });
}
