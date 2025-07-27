import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Linking, Alert } from 'react-native';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  const openIdenTT = () => {
    console.log("Proceed button pressed.");
    const deepLinkURL = "myapp://auth"; // Update as needed
  
    console.log("Attempting to open deep link:", deepLinkURL);
  
    Linking.canOpenURL(deepLinkURL)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(deepLinkURL);
        } else {
          throw new Error("Deep linking not supported or IdenTT app not installed.");
        }
      })
      .then(() => console.log("Deep link opened successfully"))
      .catch((err) => {
        console.error("Failed to open deep link:", err);
        Alert.alert(
          "Error",
          "Unable to open IdenTT app. Please check if it's installed."
        );
      });
  };

  // Your open handlers
const openTerms = () => {
  Linking.openURL("https://mdt.gov.tt/digital-solutions-services/benefitt/terms/")
    .catch(err => console.error("Couldn't open Terms of Service link", err));
};

const openPolicy = () => {
  Linking.openURL("https://mdt.gov.tt/digital-solutions-services/benefitt/policy/")
    .catch(err => console.error("Couldn't open Privacy Policy link", err));
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      
      {/* Top Wave Image */}
      <Image
        source={require('../assets/images/Wave-2X.png')}
        style={styles.waveImage}
        resizeMode="contain"
      />

      {/* Partnership Image */}
      <Image
        source={require('../assets/images/BenefiTT_APK_Logo.png')}
        style={styles.partnershipImage}
        resizeMode="contain"
      />

      {/* Buttons */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("InformationPortalScreen")}
      >
        <Text style={styles.buttonText}>Information Portal</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <View style={styles.buttonsContainer}>
          <Image
            source={require('../assets/images/IdenTT-logo-FAW.png')}
            style={styles.buttonImage}
            resizeMode="contain"
          />        
          <Text style={[styles.buttonText, { marginLeft: 10 }]}>Continue with IdenTT</Text>
        </View>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        Do not have an IdenTT?{' '}
        <Text style={styles.linkText} onPress={openIdenTT}>
          Create IdenTT
        </Text>
      </Text>


      <Text style={styles.termsText}>
        By proceeding, you agree to our{' '}
        <Text style={styles.linkT} onPress={openTerms}>Terms of Service</Text>{' '}
        and{' '}
        <Text style={styles.linkT} onPress={openPolicy}>Privacy Policy</Text>.
      </Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -25
  },
  waveImage: {
    width: width,
    height: height * 0.15,
    position: 'absolute',
    top: 0, 
    left: 0,
    right: 0,
  },
  partnershipImage: {
    width: width * 0.5,
    height: width * 0.5,
    marginVertical: height * 0.15,
    marginLeft: width * 0.05,
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: '#0052A2',
    borderRadius: 8,
    paddingVertical: 15,
    marginVertical: 10,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    width: width * 0.9,
    alignSelf: "flex-start",
    padding: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    alignSelf: "center",
  },
  buttonsContainer: {
    alignItems: 'center',
    flexDirection: "row",
  },
  buttonImage: {
    width: 50,
    height: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    marginLeft: width * 0.10,
    marginRight: 10,
    padding: 5,
  },
  footerText: {
    fontSize: 14,
    color: '#333',
  },
  termsText: {
    fontSize: 12,
    color: '#333',
    position: 'absolute',
    textAlign: 'center',
    bottom: 30,
  },
  linkText: {
    color: '#0052A2',
  },
  linkT: {
    color: "#000",
    textDecorationLine: "underline",
    fontSize: 12.5,
  },
});
