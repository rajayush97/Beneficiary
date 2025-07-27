import { createSlice } from '@reduxjs/toolkit';
import { USER_LOGOUT } from '../constants/commonActionTypes'; // <--- here

import {
    AUTHENTICATION_REQUEST,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE
} from '../constants/authenticationConstants';

const initialState = {
  loading_auth: false,
  authData: null,
  error_auth: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authenticationRequest: (state) => {
      state.loading_auth = true;
      state.error_auth = null;
    },
    authenticationSuccess: (state, action) => {
      state.loading_auth = false;
      state.authData = action.payload;
    },
    authenticationFailure: (state, action) => {
      state.loading_auth = false;
      state.error_auth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(USER_LOGOUT, (state) => {
      state.loading_auth = false;
      state.authData = null;
      state.error_auth = null;
    });
  },
});

export const { authenticationRequest, authenticationSuccess, authenticationFailure } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;