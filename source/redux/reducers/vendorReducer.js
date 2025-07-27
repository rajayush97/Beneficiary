import { FETCH_VENDOR_REQUEST, FETCH_VENDOR_SUCCESS, FETCH_VENDOR_FAILURE } from "../constants/vendorConstants";
import { USER_LOGOUT } from '../constants/commonActionTypes';


const initialState = {
  vendor: null,
  loading: false,
  error: null,
};

export const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VENDOR_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_VENDOR_SUCCESS:
      return { ...state, loading: false, vendor: action.payload };

    case FETCH_VENDOR_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case USER_LOGOUT:
      return { ...initialState }; 

    default:
      return state;
  }
};
