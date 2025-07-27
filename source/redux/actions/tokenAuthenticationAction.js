import { authenticate } from "../../services/authService";
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from "../constants/authTokenConstants";

export const tokenAuthentication = (accessToken, idToken, authProviderId) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_REQUEST });
    console.log("accessToken====" + accessToken);
    try {
      const data = await authenticate(accessToken, idToken, authProviderId);
      dispatch({ type: AUTH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: AUTH_FAILURE, payload: error });
    }
  };
};