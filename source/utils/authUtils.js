import { Alert } from "react-native";

export const validateToken = async ({ navigation, token, onValid }) => {
    try {
      if (!token) {
        console.warn("No access token provided.");
        navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
        return;
      }
  
      const formBody = new URLSearchParams();
      formBody.append("client_id", "Citizen-Client");
      formBody.append("client_secret", "bPBzkC38c3q54nVnXAcrO8RZqDFubpJW");
      formBody.append("token", token);
  
      const response = await fetch(
        "https://trac.nest.gov.tt/apicall/frm2/realms/tteid/protocol/openid-connect/token/introspect",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody.toString(),
        }
      );
  
      const data = await response.json();
  
      if (data.active === false) {
        console.warn("Token inactive or expired.");
        Alert.alert("Session Expired", "Please log in again.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("LoginScreen"),
          },
        ]);
      } else {
        if (onValid && typeof onValid === "function") {
          onValid();
        }
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
    }
  };
  
  