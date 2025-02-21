import axios from 'axios';

class ApiConnection {
  constructor() {
    this.baseUrl = 'http://192.168.0.101:3250';
    // this.baseUrl = 'https://doux-event.debdevcs.org';
    this.apiUrl = `${this.baseUrl}/api`;
    this.axios = axios.create({
      baseURL: this.apiUrl,
    });
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
        'Authorization': `Bearer ${localStorage.getItem('token')}`
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
        'Authorization': `Bearer ${localStorage.getItem('token')}`
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
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

}

export default ApiConnection;