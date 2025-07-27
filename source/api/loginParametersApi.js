import axios from "axios";

const loginParametersApi = axios.create({
    baseURL: `https://sbwtest.gov.tt/wrapper/api/`,
    headers: {
      "Content-Type": "application/json",
    },
  });
export default loginParametersApi;