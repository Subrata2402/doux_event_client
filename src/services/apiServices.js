import ApiConnection from "../connections/api_connection";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

class ApiService extends ApiConnection {
  constructor() {
    super();
  }

  /**
   * Asynchronously retrieves the visitor's fingerprint ID.
   * 
   * @returns {Promise<string>} A promise that resolves to the visitor's fingerprint ID.
   */
  async getFingerprint() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  }

  /**
   * Logs in a user with the provided credentials.
   *
   * @param {Object} credentials - The user's login credentials.
   * @param {string} credentials.email - The user's email.
   * @param {string} credentials.password - The user's password.
   * @returns {Promise<Object>} The response data from the login request.
   * @throws {Object} The error response data if the login request fails.
   */
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

  /**
   * Logs in a guest user using the provided credentials.
   *
   * @param {Object} credentials - The credentials for guest login.
   * @returns {Promise<Object>} The response data from the guest login request.
   */
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

  /**
   * Registers a new user with the provided user data.
   *
   * @param {Object} userData - The data of the user to register.
   * @param {string} userData.name - The name of the user.
   * @param {string} userData.email - The email of the user.
   * @param {string} userData.password - The password of the user.
   * @param {string} userData.cpassword - The confirm password of the user.
   * @returns {Promise<Object>} The response data from the registration request.
   * @throws {Object} The error response data if the registration request fails.
   */
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

  /**
   * Verifies the user's email by sending a POST request to the server.
   *
   * @param {Object} data - The data to be sent in the request body.
   * @param {string} data.email - The email address to be verified.
   * @param {string} data.otp - The OTP to verify the email.
   * @returns {Promise<Object>} The response data from the server.
   * @throws {Object} The error response data if the request fails.
   */
  async verifyEmail(data) {
    try {
      const response = await this.post('/auth/verify-email', data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  /**
   * Resends the OTP (One-Time Password) to the user.
   *
   * @param {Object} data - The data to be sent in the request body.
   * @param {string} data.email - The email address of the user.
   * @returns {Promise<Object>} The response data from the server.
   * @throws {Object} The error response data if the request fails.
   */
  async resendOtp(data) {
    try {
      const response = await this.post('/auth/resend-otp', data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  /**
   * Fetches the profile details of the authenticated user.
   *
   * @returns {Promise<Object>} A promise that resolves to the profile details data.
   * @throws {Object} An error object containing the response data if the request fails.
   */
  async profileDetails() {
    try {
      const response = await this.get('/auth/profile-details');
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  /**
   * Creates a new event by sending a POST request with the provided data.
   *
   * @param {Object} data - The data for the new event.
   * @returns {Promise<Object>} The response data from the server.
   * @throws {Object} The error response data if the request fails.
   */
  async createEvent(data) {
    try {
      const response = await this.formDataPost('/event/create-event', data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  /**
   * Fetches the list of events from the server.
   *
   * @returns {Promise<Object>} A promise that resolves to the response data containing the list of events.
   * @throws {Object} The error response data if the request fails.
   */
  async eventList() {
    try {
      const response = await this.get('/event/list');
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  /**
   * Joins an event by its ID.
   *
   * @param {string} eventId - The ID of the event to join.
   * @returns {Promise<Object>} The response data from the server.
   * @throws {Object} The error response data if the request fails.
   */
  async joinEvent(eventId) {
    try {
      const response = await this.get(`/event/${eventId}/join`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  /**
   * Sends a request to leave an event.
   *
   * @param {string} eventId - The ID of the event to leave.
   * @returns {Promise<Object>} The response data from the server.
   * @throws {Object} The error response data if the request fails.
   */
  async leaveEvent(eventId) {
    try {
      const response = await this.get(`/event/${eventId}/leave`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  /**
   * Deletes an event by its ID.
   *
   * @param {string} eventId - The ID of the event to delete.
   * @returns {Promise<Object>} The response data from the API.
   * @throws {Object} The error response data if the request fails.
   */
  async deleteEvent(eventId) {
    try {
      const response = await this.get(`/event/${eventId}/delete`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  /**
   * Fetches the details of an event by its ID.
   *
   * @param {string} eventId - The ID of the event to fetch.
   * @returns {Promise<Object>} The response data from the server.
   * @throws {Object} The error response data if the request fails.
   */
  async eventDetails(eventId) {
    try {
      const response = await this.get(`/event/${eventId}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default new ApiService();