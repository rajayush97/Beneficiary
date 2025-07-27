import {
  FETCH_PROGRAM_REQUEST,
  FETCH_PROGRAM_SUCCESS,
  FETCH_PROGRAM_FAILURE,
} from "../constants/informationPortalConstants";
import { USER_LOGOUT } from '../constants/commonActionTypes';


const initialState = {
  loading: false,
  programs: [],
  error: null,
};

export const programReducer = (state = initialState, action) => {
  console.log("Reducer Action Received:", action);

  switch (action.type) {
    case FETCH_PROGRAM_REQUEST:
      return { ...state, loading: true };

    case FETCH_PROGRAM_SUCCESS:
      console.log("Updated State with API Response:", action.payload);

      // Ensure only the 'data' array is extracted
      return { 
        loading: false, 
        programs: action.payload.data || [], // Extract `data` safely
        error: null 
      };

    case FETCH_PROGRAM_FAILURE:
      console.log("Error in Reducer:", action.payload);
      return { loading: false, programs: [], error: action.payload };

    case USER_LOGOUT:
      return { ...initialState }; 

    default:
      return state;
  }
};
