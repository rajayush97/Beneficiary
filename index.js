import 'react-native-get-random-values'
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import backgroundAuthTask from "./src/services/backgroundTask"; 
import messaging from '@react-native-firebase/messaging';

// Must be set outside of component lifecycle
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('FCM Message (Background):', remoteMessage);
    // Optionally store or process data
  })

AppRegistry.registerHeadlessTask("BackgroundAuthTask", () => backgroundAuthTask);

AppRegistry.registerComponent(appName, () => App);
