import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Alert,
  TextInput,
  Keyboard,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import { getLoginParams, updateUsername } from "../../redux/actions/loginParametersAction";
import { authenticateUser } from "../../redux/actions/authenticationAction";
import { tokenAuthentication } from "../../redux/actions/tokenAuthenticationAction";
import { getProfile } from "../../redux/actions/profileAction";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

import LoginPopupComponent from "../../components/LoginPopupComponent";
import styles from "../../styles/Login/LoginScreenStyles";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  //get login parameters=========================================================
  const { loading, login_params, error } = useSelector(
    (state) => state.loginParameters
  );

  useEffect(() => {
    dispatch(getLoginParams());
  }, [dispatch]);
  //=================================================================================
  //profile==========================================================================
  const { loading_profile, profile, profile_error } = useSelector(
    (state) => state.profileDetails
  );
  useEffect(() => {
    if (profile) {
      setPopupVisible(false);

      if (!profile.registration_status) {
        navigation.reset({
          index: 0,
          routes: [{ name: "BenificaryRegistrationScreen" }],
        });
      }

      if (profile.registration_status) {
        navigation.reset({
          index: 0,
          routes: [{ name: "InformationDashboardScreen" }],
        });
      }

      // Navigate on success
    } else if (loading_profile) {
      setLoading(loading_profile);
    } else if (profile_error) {
      setPopupVisible(false);
      setLoading(false);
      // Alert.alert("Authentication Failed", profile_error);
    }
  }, [loading_profile, profile, profile_error, navigation]);

  const handleGetProfile = async () => {
    try {
      await dispatch(getProfile());
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again.   " + err);
    }
  };
  //=================================================================================

  //token validation==================================================================
  const { loading_token_auth, token_authData, error_token_auth } = useSelector(
    (state) => state.tokenAuthentication
  );
  useEffect(() => {
    if (token_authData) {
      setPopupVisible(false);
      handleGetProfile();
    } else if (loading_token_auth) {
      setLoading(loading_token_auth);
    } else if (error_token_auth) {
      setPopupVisible(false);
      setLoading(false);
      // Alert.alert("Authentication Failed", error_token_auth);
    }
  }, [loading_token_auth, token_authData, error_token_auth]);

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


  const validateToken = async () => {
    try {
      await dispatch(
        tokenAuthentication(
          authData.access_token,
          authData.id_token,
          login_params.data.auth_provider_id
        )
      );
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again.   " + err);
    }
  };
  //=====================================================================================
  //get token from idenTT=================================================================
  const { loading_auth, authData, error_auth } = useSelector(
    (state) => state.authentication
  );
  useEffect(() => {
    if (authData) {
      validateToken();
    } else if (loading_auth) {
      setLoading(loading_auth);
    } else if (error_auth) {
      setPopupVisible(false);
      setLoading(false);
      // Alert.alert("Authentication Failed", error_auth);
    }
  }, [loading_auth, authData, error_auth]);

  const handleProceed = async () => {
    setPopupVisible(true);
    try {
      await dispatch(authenticateUser(login_params));
    } catch (err) {
      setPopupVisible(false);
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again3.   " + err);
    }
  };
  //==========================================================================================

  const [idenTTInput, setIdenTTInput] = useState(["", "", ""]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const isButtonEnabled =
    idenTTInput.every((group) => group.length === 3) &&
    idenTTInput.join("").length === 9;

  const handleAuthenticate = async () => {
    if (isButtonEnabled) {
      await dispatch(updateUsername(idenTTInput.join("")));
      try {
        await AsyncStorage.setItem("USER_IDENTIFICATION_NUMBER", idenTTInput.join(""));
      } catch (e) {
        console.error("Failed to save identification number:", e);
      }
      setPopupVisible(true);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleChangeText = (value, index) => {
    const updatedInput = [...idenTTInput];
    const isDeleting = value.length < idenTTInput[index].length;
    updatedInput[index] = value;
    setIdenTTInput(updatedInput);

    if (value.length === 3 && index < idenTTInput.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (isDeleting && value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Image
        source={require("../../assets/images/Wave-2X.png")}
        style={styles.waveImage}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/images/BenefiTT_APK_Logo.png")}
        style={styles.partnershipImage}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/images/IdenTT-logo-FAW.png")}
        style={styles.identtLogo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Enter your IdenTT</Text>

      <View style={styles.inputGroup}>
        {idenTTInput.map((group, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            value={group}
            onChangeText={(value) => handleChangeText(value.replace(/[^0-9]/g, ""), index)}
            style={styles.inputBox}
            maxLength={3}
            keyboardType="numeric"
            returnKeyType="done"
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled]}
        onPress={handleAuthenticate}
        disabled={!isButtonEnabled}
      >
        <Text style={styles.buttonText}>Authenticate with IdenTT</Text>
      </TouchableOpacity>

      <LoginPopupComponent
        visible={isPopupVisible}
        idenTTValue={idenTTInput.join("")}
        onClose={() => setPopupVisible(false)}
        onProceed={handleProceed}
        loading={isLoading}
      />

      <TouchableOpacity onPress={openIdenTT}>
        <Text style={styles.footerText}>
          Do not have an IdenTT? <Text style={styles.link}>Create IdenTT</Text>
        </Text>
      </TouchableOpacity>

      {!isKeyboardVisible && (
        <Text style={styles.terms}>
          By proceeding, you agree to our{' '}
          <Text
            style={styles.linkT}
            onPress={() =>
              Linking.openURL("https://mdt.gov.tt/digital-solutions-services/benefitt/terms/").catch(err =>
                console.error("Couldn't open Terms of Service link", err)
              )
            }
          >
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text
            style={styles.linkT}
            onPress={() =>
              Linking.openURL("https://mdt.gov.tt/digital-solutions-services/benefitt/policy/").catch(err =>
                console.error("Couldn't open Privacy Policy link", err)
              )
            }
          >
            Privacy Policy
          </Text>.
        </Text>
      )}

    </SafeAreaView>
  );
};

export default LoginScreen;
