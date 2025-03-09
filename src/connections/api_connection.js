import axios from 'axios';

class ApiConnection {
  constructor() {
    this.baseUrl = 'http://192.168.0.103:3250';
    // this.baseUrl = 'https://doux-event.debdevcs.org';
    this.apiUrl = `${this.baseUrl}/api`;
    this.axios = axios.create({
      baseURL: this.apiUrl,
    });
  }

  /**
   * Retrieves the authentication token from localStorage or sessionStorage.
   *
   * @returns {string|null} The token if found, otherwise null.
   */
  getToken() {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    return token;
  }

  /**
   * Sends a GET request to the specified endpoint with an authorization header.
   *
   * @param {string} endpoint - The API endpoint to send the GET request to.
   * @returns {Promise} - A promise that resolves to the response of the GET request.
   */
  async get(endpoint) {
    return this.axios.get(endpoint, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    });
  }

  /**
   * Sends a POST request to the specified endpoint with the provided data.
   *
   * @param {string} endpoint - The API endpoint to send the POST request to.
   * @param {Object} data - The data to be sent in the body of the POST request.
   * @returns {Promise} - A promise that resolves to the response of the POST request.
   */
  async post(endpoint, data) {
    return this.axios.post(endpoint, data, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    });
  }

  /**
   * Sends a POST request with form data to the specified endpoint.
   *
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {FormData} data - The form data to be sent in the request body.
   * @returns {Promise} - A promise that resolves to the response of the POST request.
   */
  async formDataPost(endpoint, data) {
    return this.axios.post(endpoint, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${this.getToken()}`
      }
    });
  }

}

export default ApiConnection;