import axios from 'axios';
import qs from 'qs';
import { authenticationRequest, authenticationSuccess, authenticationFailure } from '../reducers/authenticationReducer';

export const authenticateUser = (login_params) => {
  return async (dispatch) => {
    dispatch(authenticationRequest());
    
    const requestData = qs.stringify(login_params.data.token_url_Param_beneficiary);
  
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'apikey': login_params.data.token_header.apikey,
    };

    try {
      const response = await axios.post(
        login_params.data.url, 
        requestData, 
        { 
          headers,
          timeout: 420000,
        }
      );
      console.log(response.data);
      
      dispatch(authenticationSuccess(response.data));
      return response.data;
    } catch (error) {
      console.log(error.toJSON?.() || error);
      dispatch(authenticationFailure(error.response?.data?.message || 'Authentication failed'));
    }
  };
};
