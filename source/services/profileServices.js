import profileApi from "../api/profileApi";

export const fetchProfile = async () => {
    try {
        const response = await profileApi.get("profile");
        return response.data;
    } catch (error) {
        throw error;
    }
};
