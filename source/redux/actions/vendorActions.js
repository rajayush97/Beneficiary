import {
  FETCH_VENDOR_REQUEST,
  FETCH_VENDOR_SUCCESS,
  FETCH_VENDOR_FAILURE,
} from "../constants/vendorConstants";
import axios from "axios";
import store from "../../redux/store";

export const fetchVendorById = (parsedData, navigation) => async (dispatch) => {
  dispatch({ type: FETCH_VENDOR_REQUEST });

  try {
    console.log("Fetching parsedData", parsedData);

    const formattedVendorId = parsedData.vendorId;//String(vendorId).trim();
    console.log("Formatted Vendor ID:", formattedVendorId);

    const state = store.getState();
    const token = state.authentication.authData?.access_token;

    // Log the token

    if (!token) {
      console.warn("Authentication token is missing.");
      throw new Error("Authentication token is missing.");
    }

    const API_URL = `https://sbwtest.gov.tt/vendor/api/vendors/get_by_id/${formattedVendorId}`;
    console.log("Calling API URL:", API_URL);

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data && response.data.status === 200) {
      console.log("Vendor fetch successful:", response.data);
      dispatch({ type: FETCH_VENDOR_SUCCESS, payload: response.data });

      // Navigate to next screen
      navigation.navigate("VendorVerify", {
        vendorData: response.data.data,
        vendorId: formattedVendorId,
      });
    } else {
      console.warn("API call did not return expected status 200");
      throw new Error("Vendor not found or invalid response.");
    }
  } catch (error) {
    console.error("API Error Caught:", error);

    let errorMessage = "Something went wrong!";
    if (error.response) {
      console.error("Error Response from API:", error.response.data);
      console.error("HTTP Status:", error.response.status);
      errorMessage = error.response.data.message || `Error ${error.response.status}`;
    } else if (error.request) {
      console.error("No Response received. Check network or server.");
      errorMessage = "No response from server. Please check your network.";
    } else {
      console.error("Request Setup Error:", error.message);
      errorMessage = error.message;
    }

    dispatch({ type: FETCH_VENDOR_FAILURE, payload: errorMessage });
  }
};
