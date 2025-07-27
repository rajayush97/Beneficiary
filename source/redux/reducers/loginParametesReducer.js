import {
  FETCH_LOGIN_PARAMS_REQUEST,
  FETCH_LOGIN_PARAMS_SUCCESS,
  FETCH_LOGIN_PARAMS_FAILURE,
  UPDATE_USERNAME,
} from "../constants/loginParametersConstants";



const initialState = {
  loading: false,
  login_params: { data: { token_url_Param_beneficiary: {} } },
  error: null,
};

export const loginParametersReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_LOGIN_PARAMS_REQUEST:
          return { ...state, loading: true };

      case FETCH_LOGIN_PARAMS_SUCCESS:
          return { loading: false, login_params: action.payload, error: null };

      case FETCH_LOGIN_PARAMS_FAILURE:
          return { loading: false, login_params: { data: { token_url_Param_beneficiary: {} } }, error: action.payload };

      case UPDATE_USERNAME:
          return {
              ...state,
              login_params: {
                  ...state.login_params,
                  data: {
                      ...state.login_params.data,
                      token_url_Param_beneficiary: {
                          ...state.login_params.data.token_url_Param_beneficiary,
                          username: action.payload, 
                      },
                  },
              },
          };

      default:
          return state;
  }
};