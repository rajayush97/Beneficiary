import {
  FETCH_PROGRAM_REQUEST,
  FETCH_PROGRAM_SUCCESS,
  FETCH_PROGRAM_FAILURE,
} from "../constants/informationPortalConstants";
import axios from "axios";

export const getProgram = () => async (dispatch) => {
  console.log("getProgram() is being dispatched");
  dispatch({ type: FETCH_PROGRAM_REQUEST });

  try {
    const response = await axios.get("https://sbwtest.gov.tt/wrapper/api/programs");

    console.log("Full API Response:", response);
    console.log("API Response Data:", response.data);

    if (!response.data || !response.data.data) { // Ensure 'data' key exists
      console.warn("API returned empty data.");
      dispatch({ type: FETCH_PROGRAM_FAILURE, payload: "No programs available" });
      return;
    }

    dispatch({ type: FETCH_PROGRAM_SUCCESS, payload: response.data.data }); // ✅ Use response.data.data
  } catch (error) {
    console.error("API Error:", error.message || "Something went wrong");

    dispatch({
      type: FETCH_PROGRAM_FAILURE,
      payload: error.message || "Something went wrong",
    });
  }
};
