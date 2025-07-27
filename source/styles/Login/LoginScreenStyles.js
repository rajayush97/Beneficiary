import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "flex-start",
      },
      waveImage: {
        width: width,
        height: height * 0.15,
        position: "absolute",
        top: -25,
        left: 0,
        right: 0,
      },
      partnershipImage: {
        width: width * 0.5,
        height: width * 0.5,
        marginVertical: height * 0.15,
        marginLeft: width * 0.05,
        marginBottom: 0,
        alignSelf: "flex-start",
      },
      identtLogo: {
        width: width * 0.2,
        height: width * 0.2,
        marginTop: 5,
        marginBottom: 0,
        marginLeft: width * 0.05,
        alignSelf: "flex-start",
      },
      title: {
        fontSize: 16,
        color: "#000",
        marginTop: 0,
        marginLeft: width * 0.05,
        alignSelf: "flex-start",
      },
      inputGroup: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
      },
      inputBox: {
        width: width / 3 - 35,
        height: 50,
        borderWidth: 1,
        borderColor: "#c0c0c0",
        borderRadius: 5,
        textAlign: "center",
        fontSize: 18,
        marginHorizontal: 5,
        color: "#000",
      },
      button: {
        width: "80%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20,
      },
      buttonEnabled: {
        backgroundColor: "#007bff",
      },
      buttonDisabled: {
        backgroundColor: "#ccc",
      },
      buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
      footerText: {
        marginTop: 20,
        color: "#555",
        fontSize: 14,
      },
      link: {
        color: "#007bff",
        textDecorationLine: "underline",
      },
      linkT: {
        color: "#000",
        textDecorationLine: "underline",
        fontSize: 12.5,
      },
      terms: {
        fontSize: 12,
        color: "#aaa",
        position: "absolute",
        textAlign: "center",
        bottom: 30,
      },
});

export default styles;
