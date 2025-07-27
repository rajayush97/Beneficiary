import { BENEFIT_REDEEM_REQUEST, BENEFIT_REDEEM_SUCCESS, BENEFIT_REDEEM_FAIL } from '../constants/benefitConstants';
import { USER_LOGOUT } from '../constants/commonActionTypes';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

export const benefitReducer = (state = initialState, action) => {
  switch (action.type) {
    case BENEFIT_REDEEM_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case BENEFIT_REDEEM_SUCCESS:
      return { ...state, loading: false, success: true, data: action.payload };
    case BENEFIT_REDEEM_FAIL:
      return { ...state, loading: false, success: false, error: action.payload };
    case USER_LOGOUT:
      return { ...initialState }; 
    default:
      return state;
  }
};
