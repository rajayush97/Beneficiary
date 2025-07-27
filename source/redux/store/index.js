import { configureStore } from "@reduxjs/toolkit";
import { programReducer } from "../reducers/informationPortalReducer";
import { loginParametersReducer } from "../reducers/loginParametesReducer";
import authenticationReducer from "../reducers/authenticationReducer";
import { tokenAuthenticationReducer } from "../reducers/tokenAuthenticationReducers";
import { profileReducer } from "../reducers/profileReducer";
import { benefitReducer } from '../reducers/benefitReducer';
import { vendorReducer } from "../reducers/vendorReducer";

const store = configureStore({
  reducer: {
    informationPortal: programReducer, 
    loginParameters: loginParametersReducer,
    authentication: authenticationReducer,
    tokenAuthentication: tokenAuthenticationReducer,
    profileDetails: profileReducer,
    benefit: benefitReducer,
    vendor: vendorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
