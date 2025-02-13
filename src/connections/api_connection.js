import axios from 'axios';

class ApiConnection {
  constructor() {
    this.baseUrl = 'http://localhost:3250';
    this.apiUrl = `${this.baseUrl}/api`;
    this.axios = axios.create({
      baseURL: this.apiUrl,
    });
  }


  async get(endpoint) {
    return this.axios.get(endpoint, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  async post(endpoint, data) {
    return this.axios.post(endpoint, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

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