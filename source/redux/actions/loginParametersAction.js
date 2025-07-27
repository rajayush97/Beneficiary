import { fetchLoginParams } from "../../services/loginParametersService";
import {
    FETCH_LOGIN_PARAMS_FAILURE,
    FETCH_LOGIN_PARAMS_REQUEST,
    FETCH_LOGIN_PARAMS_SUCCESS,
    UPDATE_USERNAME
} from "../constants/loginParametersConstants";

export const updateUsername = (username) => async (dispatch) => {
  dispatch({
    type: UPDATE_USERNAME,
    payload: username,
  });
};

export const getLoginParams = () => async (dispatch) => {
  dispatch({ type: FETCH_LOGIN_PARAMS_REQUEST });

  try {
    const data = await fetchLoginParams();
    dispatch({ type: FETCH_LOGIN_PARAMS_SUCCESS, payload: data });
  } catch (error) {
    let errorMessage = "An unexpected error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    dispatch({ type: FETCH_LOGIN_PARAMS_FAILURE, payload: errorMessage });
  }
};
