import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
} from "../constants/profileConstants";
import { USER_LOGOUT } from '../constants/commonActionTypes';



const initialState = {
  loading_profile: false,
  profile: null,
  profile_error: null,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
      case PROFILE_REQUEST:
          return { ...state, loading_profile: true };

      case PROFILE_SUCCESS:
          return { loading_profile: false, profile: action.payload, profile_error: null };

      case PROFILE_FAILURE:
          return { loading_profile: false, profile: null, profile_error: action.payload };

      case USER_LOGOUT:
        return { ...initialState }; 

      default:
          return state;
  }
};