// actions/commonActions.js

import { USER_LOGOUT } from '../constants/commonActionTypes';

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};
