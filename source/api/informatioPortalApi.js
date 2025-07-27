import axios from "axios";

const informatioPortalApi = axios.create({
    baseURL: `https://sbwtest.gov.tt//wrapper/api/`,
    headers: {
      "Content-Type": "application/json",
    },
  });
export default informatioPortalApi;