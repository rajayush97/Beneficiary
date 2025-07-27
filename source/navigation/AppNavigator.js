import React, {useState, useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LaunchScreen from '../screens/LaunchScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import InformationPortalScreen from '../screens/InformationPortalScreen';
import BenificaryRegistrationScreen from '../screens/BenificaryRegistrationScreen';
import DeclarationPanelScreen from '../screens/DeclarationPanelScreen'
import InformationDashboardScreen from '../screens/Home/InformationDashboardScreen'
import MenuScreen from '../screens/MenuScreen'
import InfoCheckEligibilityScreen from '../screens/InfoCheckEligibilityScreen'
import CheckEligibilityScreen from '../screens/CheckEligibilityScreen'
import AboutBenefiTTScreen from '../screens/AboutBenefiTTScreen'
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen'
import EligibilityResultScreen from '../screens/EligibilityResultScreen'
import GrantApplicationSummaryScreen from '../screens/GrantApplicationSummaryScreen'
import GrantIntroScreen from '../screens/GrantIntroScreen'
import IdentificationDocumentsScreen from '../screens/GrantIntroScreen'
import RedeemBenefitsScreen from '../screens/RedeemBenefitsScreen'
import RedemptionStepScreen from '../screens/RedemptionStepScreen'
import TransactionResultScreen from '../screens/TransactionResultScreen'
import UploadImageBenefitScreen from '../screens/UploadImageBenefitScreen'
import QRScannerScreen from '../screens/QRScannerScreen'
import VendorVerify from '../screens/VendorVerify'
import GenerateQRCode from '../screens/GenrateQR'
import ReliefGrantScreen from '../screens/ReliefGrantScreen'
import EligibleScreen from '../screens/eligibilityCheckResponse/EligibleScreen'
import NotEligibleScreen from '../screens/eligibilityCheckResponse/NotEligibleScreen'
import CheckEligibilityForID from '../screens/Home/CheckEligibilityForID'
import NotEligibleForID from '../screens/InformationDashboard/NotEligibleForID'
import EligibleForID from '../screens/EligibleAfterLogin/EligibleForID'
import IdenTTConfirm from '../screens/identtConfirm/idenTTConfirm'
import Invoice from '../screens/Invoice/invoice'
import NotificationsScreen from "../screens/Home/NotificationsScreen"
import HistoryScreen from "../screens/Home/NotificationsHistory";

import FormScreen from '../screens/InformationDashboard/FormScreen'

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const isFirstLaunch = await AsyncStorage.getItem('firstLaunch');
        if (isFirstLaunch === null) {
          await AsyncStorage.setItem('firstLaunch', 'true');
          setInitialRoute('LaunchScreen');
        } else {
          setInitialRoute('HomeScreen');
        }
      } catch (error) {
        console.error('Error reading AsyncStorage:', error);
        setInitialRoute('HomeScreen'); // Default to HomeScreen on error
      }
    };
    checkFirstLaunch();
  }, []);

  if (!initialRoute) return null; // Prevent rendering before determining initialRoute


  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
    <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      <Stack.Screen name="InformationPortalScreen" component={InformationPortalScreen} />
      <Stack.Screen name="BenificaryRegistrationScreen" component={BenificaryRegistrationScreen} />
      <Stack.Screen name="DeclarationPanelScreen" component={DeclarationPanelScreen} />
      <Stack.Screen name="InformationDashboardScreen" component={InformationDashboardScreen} options={{gestureEnabled: false}}/>

      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="InfoCheckEligibilityScreen" component={InfoCheckEligibilityScreen} />
      <Stack.Screen name="CheckEligibilityScreen" component={CheckEligibilityScreen} />
      <Stack.Screen name="AboutBenefiTTScreen" component={AboutBenefiTTScreen} />
      <Stack.Screen name="TermsOfServiceScreen" component={TermsOfServiceScreen} />
      <Stack.Screen name="EligibilityResultScreen" component={EligibilityResultScreen} />
      <Stack.Screen name="GrantApplicationSummaryScreen" component={GrantApplicationSummaryScreen} />

      <Stack.Screen name="GrantIntroScreen" component={GrantIntroScreen} />
      <Stack.Screen name="IdentificationDocumentsScreen" component={IdentificationDocumentsScreen} />
      <Stack.Screen name="RedeemBenefitsScreen" component={RedeemBenefitsScreen} />
      <Stack.Screen name="RedemptionStepScreen" component={RedemptionStepScreen} />
      <Stack.Screen name="TransactionResultScreen" component={TransactionResultScreen} />
      <Stack.Screen name="UploadImageBenefitScreen" component={UploadImageBenefitScreen} />
      <Stack.Screen name="QRScannerScreen" component={QRScannerScreen} />
      <Stack.Screen name="VendorVerify" component={VendorVerify} />

      <Stack.Screen name="GenerateQRCode" component={GenerateQRCode} />
      <Stack.Screen name="ReliefGrantScreen" component={ReliefGrantScreen} />
      <Stack.Screen name="EligibleScreen" component={EligibleScreen} />
      <Stack.Screen name="NotEligibleScreen" component={NotEligibleScreen} />

      <Stack.Screen name="CheckEligibilityForID" component={CheckEligibilityForID} />
      <Stack.Screen name="NotEligibleForID" component={NotEligibleForID} />
      <Stack.Screen name="EligibleForID" component={EligibleForID} />
      <Stack.Screen name="FormScreen" component={FormScreen} />
      <Stack.Screen name="IdenTTConfirm" component={IdenTTConfirm} />

      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />


      <Stack.Screen name="Invoice" component={Invoice} />

      

      
      
    </Stack.Navigator>
  );
};

export default AppNavigator;