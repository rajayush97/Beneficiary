import axios from "axios";

import store from "../redux/store"; // Import the Redux store

const profileApi = axios.create({
  baseURL: `https://sbwtest.gov.tt/wrapper/api/`,
  headers: {
    "Cookie": "frontend_lang=en_US",
  },
});

// Attach interceptor to set Authorization token dynamically
profileApi.interceptors.request.use(
  (config) => {
    // Get token from Redux store
    const state = store.getState(); 
    const token = state.authentication.authData?.access_token; 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default profileApi;
