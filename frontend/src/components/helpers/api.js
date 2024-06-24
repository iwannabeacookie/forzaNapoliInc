import axios from "axios";

/**
 * Sends a post request with axios to the backend
 * @param {string} endpoint Endpoint of the API. Template: /endpoint
 * @param {object} body The body of the request to be sent
 * @returns The response's data, or nothing if an error occurs
 */
export async function apiHelperPOST(endpoint, body) {
  console.info("[API] POST Request, body:", body);
  return axios
    .post(`${process.env.API_URL}${endpoint}`, body)
    .then((response) => {
      console.info(`[API] Response: ${response.status} body: ${response.data}`);
      return response.data;
    })
    .catch((error) => {
      console.error(`[API] Error: ${error}`);
    });
}

/**
 * Sends a post request with axios to the backend
 * @param {string} endpoint Endpoint of the API. Template: /endpoint
 * @param {object} body The body of the request to be sent
 * @returns The response's data, or nothing if an error occurs
 */
export async function apiHelperGET(endpoint, body) {
  console.info("[API] GET Request, body:", body);
  return axios
    .get(`${process.env.API_URL}${endpoint}`, body)
    .then((response) => {
      console.info("[API] Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
