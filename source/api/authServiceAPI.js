import axios from "axios";


const authServiceApi = axios.create({
    baseURL:  "https://sbwtest.gov.tt/v1/selfservice/oauth2",
    headers: {
      "Content-Type": "application/json",
    },
});

export default authServiceApi;
