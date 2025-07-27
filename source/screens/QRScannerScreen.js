import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Dimensions, Animated } from 'react-native';
import { Camera, useCameraPermission, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { decryptData, extractItemName, parseDecryptedData } from '../utils/decryptData';
import { fetchVendorById } from "../redux/actions/vendorActions";
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from "react-native";


const { width, height } = Dimensions.get('window'); // Get screen width & height

const QRScannerScreen = ({ navigation }) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [isPermissionRequested, setIsPermissionRequested] = useState(false);
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const [qrCode, setQrCode] = useState(null);
  const [isScanned, setIsScanned] = useState(false); // Track if QR is scanned
  const dispatch = useDispatch();

  useEffect(() => {
    const checkPermissions = async () => {
      console.log("permissionCheckFunction");
      
      if (!hasPermission) {
        const permissionGranted = await requestPermission();
        if (!permissionGranted) {
          Alert.alert(
            "Permission Required",
            "Camera access is needed to scan QR codes. Please enable it in Settings.",
            [{ text: "OK", onPress: () => navigation.goBack() }]
          );
        }
        setIsPermissionRequested(true);
      }
    };

    checkPermissions();
  }, [hasPermission]);

  // Blinking animation for red scanning line
  useEffect(() => {
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
        Animated.timing(blinkAnim, { toValue: 1, duration: 100, useNativeDriver: true })
      ])
    );
    blinkAnimation.start();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (!isScanned && codes.length > 0) {
        setIsScanned(true); // Immediately stop further scanning
        const scannedData = codes[0].value;
        // setQrCode(scannedData);        
        const decryptedData = decryptData(scannedData);
        if (decryptedData) {
          const parsedData = parseDecryptedData(decryptedData);
          // Proceed with Vendor Fetch
          dispatch(fetchVendorById(parsedData, navigation));
        } else {
          setIsScanned(false); // Allow rescanning if decryption failed
          Alert.alert('Error', 'Failed to decrypt QR code data.');
        }
      }
    },
  });

  if (!hasPermission && isPermissionRequested) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Camera permission is required.</Text>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (device == null) {
    return <Text style={styles.permissionText}>No Camera Device Found</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Image source={require('../assets/images/eva_back.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Camera Preview */}
      {/* Camera or Loader */}
      <View style={styles.cameraWrapper}>
        {isScanned ? (
          // Show loader only in place of the camera and viewfinder
          <View style={[styles.camera, styles.loaderContainer]}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : (
          <>
            <Camera
              style={styles.camera}
              device={device}
              isActive={true}
              codeScanner={codeScanner}
            />

            {/* Square Viewfinder Box */}
            <View style={styles.viewfinder}>
              {/* Blinking Red Line */}
              <Animated.View style={[styles.scanningLine, { opacity: blinkAnim }]} />
            </View>
          </>
        )}

        {/* Instruction Text (always visible) */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Place a barcode inside the viewfinder to scan it.
          </Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White Background
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },

  backIcon: {
    width: width * 0.05,
    height: width * 0.05,
    minWidth: width * 0.05,
    minHeight: width * 0.05,
  },

  cameraWrapper: {
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    width: width * 0.9, // 90% of screen width
    height: '80%', // 80% of screen height
    overflow: 'hidden',
    position: 'relative',
  },

  camera: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
  },

  viewfinder: {
    position: 'absolute',
    top: '25%', // Centers vertically
    left: '45%',
    width: width * 0.7, // 60% of screen width
    height: width * 0.7, // Make it a perfect square
    transform: [{ translateX: -(width * 0.3) }], // Centers horizontally
    borderColor: '#00FF00', // Green border
    backgroundColor: 'rgba(226, 226, 226, 0.43)'
  },

  scanningLine: {
    position: 'absolute',
    top: '50%', // Position in the middle of the square
    width: '100%',
    height: 1,
    backgroundColor: 'red',
  },

  instructionContainer: {
    position: 'absolute',
    bottom: 10, // Positioned at the bottom inside the camera preview
    width: '100%',
    alignItems: 'center',
  },

  instructionText: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for better visibility
    color: '#fff',
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },

  cancelButton: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#ff4444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  permissionText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
  },

});

export default QRScannerScreen;
