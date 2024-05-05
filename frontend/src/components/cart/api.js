import axios from 'axios';
const API_URL = 'http://localhost:3000';

export async function apiHelper(endpoint, options) {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/${endpoint}`, options)
           .then(response => {
                resolve(response.data);
            })
           .catch(error => {
                reject(error);
            });
    });
}