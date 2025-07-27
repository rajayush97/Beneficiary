import 'react-native-get-random-values'
import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./source/redux/store/index"; // Ensure this path is correct

import { RootNavigator } from "./navigation";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import { setupBackgroundTask } from "./src/services/backgroundTask";
import AppNavigator from "./source/navigation/AppNavigator";
import { LogBox } from "react-native";
import messaging from '@react-native-firebase/messaging';

// Firebase Push Notification Setup
const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Notification permission granted.");
    getFcmToken(); // Only fetch token if permission granted
  } else {
    console.log("Notification permission denied.");
  }
};


const getFcmToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("FCM Token:", fcmToken);
      // You can send this token to your backend server
    } else {
      console.log("No token received");
    }
  } catch (error) {
    console.error("Error fetching FCM token:", error);
  }
};

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested",
    ]);
    LogBox.ignoreAllLogs(false);

    // Request permission & get FCM token
    requestUserPermission();

    // Foreground message handler
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('FCM Message (Foreground):', remoteMessage);
      Alert.alert(remoteMessage.notification?.title || 'New Notification', remoteMessage.notification?.body || '');
    });

    return () => {
      unsubscribeOnMessage(); // Clean up listener on unmount
    };
  }, []);
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
