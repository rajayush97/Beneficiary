import axios from 'axios';
import store from "../redux/store"; // Import the Redux store

export const fetchuserInfoIdenTT = async () => {
  const state = store.getState();
  
  // Get the URL and headers from the store
  const url = state.loginParameters?.login_params?.data?.get_user_info?.url;
  
  let headers = state.loginParameters?.login_params?.data?.get_user_info?.headers || {};
  
  // Get the token from the store
  const token = state.authentication?.authData?.access_token;

console.log(token,"tokentokentokentoken");

  
  
  // Update the Authorization header dynamically
  headers.Authorization = `Bearer ${token}`;
  headers.Accept = 'application/json';



  try {
    // Make the API call
    console.log(url, "URL========+++++++++++");
    console.log(headers, "Header000000000000000000000");
    const response = await axios.get(url, { headers });
    console.log('Response1:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during API call:', error.response?.data || error.message);
  }
};