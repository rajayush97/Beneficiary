import React from "react";
import { 
        View, 
        Text, 
        Image, 
        StyleSheet, 
        Dimensions, 
        TouchableOpacity,
        StatusBar,
      } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const LaunchScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* Top Wave Image */}
      <Image
        source={require('../assets/images/Wave-2X.png')} // Replace with your actual path
        style={styles.waveImage}
        resizeMode="contain"
      />

      {/* Hands Illustration */}
        <Image
          source={require('../assets/images/BenefiTT_APK_Logo.png')} // Replace with your actual path
          style={styles.partnershipImage}
          resizeMode="contain"
        />
      {/* Content Section */}
      <View style={styles.content}>
        {/* Text Content */}
        <Text style={styles.heading}>One place for all Government Benefits</Text>
        <Text style={styles.subText}>
        Use your BenefiTT app to easily access grants, non-financial aid, government assistance and other essential support, tailored to meet your needs.
        </Text>

        {/* Button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "HomeScreen" }],
            });
          }}
          >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  waveImage: {
    width: width,
    height: height * 0.15,
    position: 'absolute',
    top: 0, 
    left: 0,   // Ensure it starts from the left edge
    right: 0,
  },
  partnershipImage: {
    width: width * 0.5,
    height: width * 0.5,
    marginVertical: height * 0.15,
    marginBottom: 0, 
    marginLeft: width * 0.05,
    alignSelf: "flex-start",
  },
  content: {
    width: width * 0.9,
    alignSelf: "flex-start",
    justifyContent: 'flex-start',
    marginTop: height * 0.02,
    marginRight: width * 0.05,
    marginLeft: width * 0.05,
    padding: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    color: '#000',
  },
  subText: {
    fontSize: 16,
    textAlign: 'left',
    color: '#555',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0052A2',
    borderRadius: 8,
    paddingVertical: 15,
    marginVertical: 10,
    width: width * 0.85,
    alignSelf: "flex-start",
    padding: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    alignSelf: "center",
  },
});

export default LaunchScreen;




// import React from "react";
// import { 
//         View, 
//         Text, 
//         Image, 
//         StyleSheet, 
//         Dimensions, 
//         TouchableOpacity,
//         StatusBar,
//       } from "react-native";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../navigation/RootNavigator";
// import { SafeAreaView } from 'react-native-safe-area-context';






// const { width, height } = Dimensions.get('window');

// type Props = NativeStackScreenProps<RootStackParamList, "LaunchScreen">;

// const LaunchScreen: React.FC<Props> = ({ navigation }) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar translucent backgroundColor="transparent" />
//       {/* Top Wave Image */}
//       <Image
//         source={require('../assets/images/Wave-2X.png')} // Replace with your actual path
//         style={styles.waveImage}
//         resizeMode="contain"
//       />

//       {/* Hands Illustration */}
//         <Image
//           source={require('../assets/images/BenefiTT_APK_Logo.png')} // Replace with your actual path
//           style={styles.partnershipImage}
//           resizeMode="contain"
//         />
//       {/* Content Section */}
//       <View style={styles.content}>
//         {/* Text Content */}
//         <Text style={styles.heading}>One place for all Government Benefits</Text>
//         <Text style={styles.subText}>
//         Use your BenefiTT app to easily access grants, non-financial aid, government assistance and other essential support, tailored to meet your needs.
//         </Text>

//         {/* Button */}
//         <TouchableOpacity 
//           style={styles.button}
//           onPress={() => {
//             navigation.reset({
//               index: 0,
//               routes: [{ name: "HomeScreen" }],
//             });
//           }}
//           >
//           <Text style={styles.buttonText}>Get Started</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
    
//   },
//   waveImage: {
//     width: width,
//     height: height * 0.15,
//     position: 'absolute',
//     top: 0, 
//     left: 0,   // Ensure it starts from the left edge
//     right: 0,
//   },
//   partnershipImage: {
//     width: width * 0.5,
//     height: width * 0.5,
//     marginVertical: height * 0.15,
//     marginBottom: 0, 
//     marginLeft: width * 0.05,
//     alignSelf: "flex-start",
    
//   },
//   content: {
//     width: width * 0.9,
//     alignSelf: "flex-start",
//     justifyContent: 'flex-start',
//     marginTop: height * 0.02,
//     marginRight:width * 0.05,
//     marginLeft: width * 0.05,
//     padding: 5,

//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'left',
//     marginBottom: 10,
//     color: '#000',
//   },
//   subText: {
//     fontSize: 16,
//     textAlign: 'left',
//     color: '#555',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#0052A2',
//     borderRadius: 8,
//     paddingVertical: 15,
//     marginVertical: 10,
//     width:width * 0.85,
//     alignSelf: "flex-start",
//     padding: 10
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//     alignSelf: "center",
//   },
// });

// export default LaunchScreen;
