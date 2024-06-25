import axios from "axios";

/**
 * Sends a post request with axios to the backend
 * @param {string} endpoint Endpoint of the API. Template: /endpoint
 * @param {object} body The body of the request to be sent
 * @returns The response's data, or nothing if an error occurs
 */
export async function apiHelperPOST(runtimeConfig, endpoint, body) {
  console.info("[API] POST Request, body:", body);
  return axios
    .post(`${runtimeConfig.public.baseApiUrl}${endpoint}`, body)
    .then((response) => {
      console.info(`[API] Response: ${response.status} body: ${response.data}`);
      return response.data;
    })
    .catch((error) => {
      console.error(`[API] Error: ${error}`);
    });
}

/**
 * Sends a request with axios to the backend. Allows you to specify the method
 * @param {string} endpoint Endpoint of the API. Template: /endpoint
 * @param {"post" | "get" | "put" | "delete"} method The method to use to make the request
 * @param {object} body The body of the request to be sent
 * @returns The response's data, or nothing if an error occurs
 */
export async function apiHelper(method, runtimeConfig, endpointUrl, body) {
  console.info("[API] " + method + " Request, body:", body);
  switch (method) {
    case "post":
      return axios
        .post(`${runtimeConfig.public.baseApiUrl}${endpointUrl}`, body)
        .then((response) => {
          console.info(
            `[API] Response: ${response.status} body: ${response.data}`,
          );
          return response.data;
        })
        .catch((error) => {
          console.error(`[API] Error: ${error}`);
        });
    case "get":
      return axios
        .get(`${runtimeConfig.public.baseApiUrl}${endpointUrl}`)
        .then((response) => {
          console.info(
            `[API] Response: ${response.status} body: ${response.data}`,
          );
          return response.data;
        })
        .catch((error) => {
          console.error(`[API] Error: ${error}`);
        });
    case "put":
      return axios
        .put(`${runtimeConfig.public.baseApiUrl}${endpointUrl}`, body)
        .then((response) => {
          console.info(
            `[API] Response: ${response.status} body: ${response.data}`,
          );
          return response.data;
        })
        .catch((error) => {
          console.error(`[API] Error: ${error}`);
        });
    case "delete":
      return axios
        .delete(`${runtimeConfig.public.baseApiUrl}${endpointUrl}`, body)
        .then((response) => {
          console.info(
            `[API] Response: ${response.status} body: ${response.data}`,
          );
          return response.data;
        })
        .catch((error) => {
          console.error(`[API] Error: ${error}`);
        });
  }
}

/**
 * Sends a post request with axios to the backend
 * @param {string} endpoint Endpoint of the API. Template: /endpoint
 * @param {object} body The body of the request to be sent
 * @returns The response's data, or nothing if an error occurs
 */
export async function apiHelperGET(runtimeConfig, endpoint, body) {
  console.info("[API] GET Request, body:", body);
  return axios
    .get(`${runtimeConfig.public.baseApiUrl}${endpoint}`, body)
    .then((response) => {
      console.info("[API] Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
