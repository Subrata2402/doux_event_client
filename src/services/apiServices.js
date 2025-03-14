import ApiConnection from "../connections/api_connection";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

class ApiService extends ApiConnection {
  constructor() {
    super();
  }

  /**
   * Asynchronously retrieves the visitor's fingerprint ID.
   * @returns {Promise<string>} Visitor's fingerprint ID.
   */
  async getFingerprint() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  }

  /**
   * Generic method to handle API requests and errors
   * @param {Function} requestFn - The request function to execute
   * @returns {Promise<Object>} Response data or error
   */
  async handleRequest(requestFn) {
    try {
      const response = await requestFn();
      return response.data;
    } catch (error) {
      return error.response?.data || error;
    }
  }

  /**
   * Auth-related API calls
   */
  async login(credentials) {
    return this.handleRequest(() => this.post('/auth/login', credentials));
  }

  async guestLogin(credentials) {
    const browserId = await this.getFingerprint();
    return this.handleRequest(() => 
      this.post('/auth/guest-login', { ...credentials, browserId })
    );
  }

  async register(userData) {
    return this.handleRequest(() => this.post('/auth/register', userData));
  }

  async verifyEmail(data) {
    return this.handleRequest(() => this.post('/auth/verify-email', data));
  }

  async sendOtp(data) {
    return this.handleRequest(() => this.post('/auth/send-otp', data));
  }

  async resetPassword(data) {
    return this.handleRequest(() => this.post('/auth/reset-password', data));
  }

  async profileDetails() {
    return this.handleRequest(() => this.get('/auth/profile-details'));
  }

  /**
   * Event-related API calls
   */
  async createEvent(data) {
    return this.handleRequest(() => this.formDataPost('/event/create-event', data));
  }

  async eventList() {
    return this.handleRequest(() => this.get('/event/list'));
  }

  async eventDetails(eventId) {
    return this.handleRequest(() => this.get(`/event/${eventId}`));
  }

  async joinEvent(eventId) {
    return this.handleRequest(() => this.get(`/event/${eventId}/join`));
  }

  async leaveEvent(eventId) {
    return this.handleRequest(() => this.get(`/event/${eventId}/leave`));
  }

  async deleteEvent(eventId) {
    return this.handleRequest(() => this.get(`/event/${eventId}/delete`));
  }
}

export default new ApiService();