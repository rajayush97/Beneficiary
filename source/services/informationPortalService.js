import informatioPortalApi from "../api/informatioPortalApi";

export const fetchProgram = async () => {
    try {
        const response = await informatioPortalApi.get("programs");
        return response.data;
    } catch (error) {
        throw error;
    }
};