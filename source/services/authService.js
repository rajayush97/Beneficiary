import authServiceApi from "../api/authServiceAPI";

export const authenticate = async (accessToken, idToken, authProviderId) => {
  try {
    const response = await authServiceApi.post("/app_auth", {
      "X-Access-Token": accessToken,
      "X-ID-Token": idToken,
      "auth_provider_id": authProviderId,
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
