import ApiConnection from "../connections/api_connection";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

class ApiService extends ApiConnection {
  constructor() {
    super();
  }

  async getFingerprint() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  }

  async login(credentials) {
    const browserId = await this.getFingerprint();
    credentials.browserId = browserId;
    try {
      const response = await this.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async guestLogin(credentials) {
    const browserId = await this.getFingerprint();
    credentials.browserId = browserId;
    console.log(credentials);
    try {
      const response = await this.post('/auth/guest-login', credentials);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async register(userData) {
    const browserId = await this.getFingerprint();
    userData.browserId = browserId;
    try {
      const response = await this.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async verifyEmail(data) {
    try {
      const response = await this.post('/auth/verify-email', data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async resendOtp(data) {
    try {
      const response = await this.post('/auth/resend-otp', data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async profileDetails() {
    try {
      const response = await this.get('/auth/profile-details');
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async createEvent(data) {
    try {
      const response = await this.formDataPost('/event/create-event', data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async eventList() {
    try {
      const response = await this.get('/event/list');
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async joinEvent(eventId) {
    try {
      const response = await this.get(`/event/${eventId}/join`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async leaveEvent(eventId) {
    try {
      const response = await this.get(`/event/${eventId}/leave`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async deleteEvent(eventId) {
    try {
      const response = await this.get(`/event/${eventId}/delete`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default new ApiService();