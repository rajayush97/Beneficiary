import loginParametersApi from "../api/loginParametersApi";

export const fetchLoginParams = async () => {
    try {
        console.log(loginParametersApi);
        
        const response = await loginParametersApi.get("login_parameters");
        console.log(response.data, "line 6");
        
        return response.data;
    } catch (error) {
        throw error;
    }
};