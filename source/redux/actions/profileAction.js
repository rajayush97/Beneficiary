import { fetchProfile } from "../../services/profileServices";
import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
} from "../constants/profileConstants";

export const getProfile = () => {
  return async (dispatch) => {
    dispatch({ type: PROFILE_REQUEST });

    try {
      const data = await fetchProfile();
      dispatch({ type: PROFILE_SUCCESS, payload: data });
    } catch (error) {
      let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      dispatch({ type: PROFILE_FAILURE, payload: errorMessage });
    }
  };
};