import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from "../constants/authTokenConstants";
import { USER_LOGOUT } from '../constants/commonActionTypes';

const initialState = {
  loading_token_auth: false,
  token_authData: null,
  error_token_auth: null,
};

export const tokenAuthenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, loading_token_auth: true, error_token_auth: null };
    case AUTH_SUCCESS:
      return { ...state, loading_token_auth: false, token_authData: action.payload };
    case AUTH_FAILURE:
      return { ...state, loading_token_auth: false, error_token_auth: action.payload };
    case USER_LOGOUT:
      return { ...initialState }; 
    default:
      return state;
  }
};