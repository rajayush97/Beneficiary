import React, { useEffect }  from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from "../redux/store"; 


import styles from "../styles/RedemptionStepScreen/RedemptionStepStyle";


const RedemptionStepScreen = ({ navigation, route }) => {  
  const { selectedItem } = route.params;

  // ✅ Save selectedItem to AsyncStorage on component mount
  useEffect(() => {
    const storeSelectedItem = async () => {
      try {
        await AsyncStorage.setItem('SELECTED_ITEM', JSON.stringify(selectedItem));
      } catch (error) {
        console.error("Error saving selected item:", error);
      }
    };
    storeSelectedItem();
  }, [selectedItem]);

  // Dynamically construct steps based on received item
  const steps = [
    { 
      id: 1, 
      title: 'Vendor Verification', 
      description: 'Scan vendor QR code to verify vendor' 
    },
    { 
      id: 2, 
      title: 'Item Scan and Confirmation', 
      description: `Show QR to redeem "${selectedItem.title}" (Value: ${selectedItem.amount})`
    },
    { 
      id: 3, 
      title: 'Upload Item Image', 
      description: `Upload photo of "${selectedItem.title}" to confirm delivery` 
    },
    { 
      id: 4, 
      title: 'Item Confirmation', 
      description: `Final confirmation and completion for "${selectedItem.title}"` 
    },
  ];

  const handleTokenValidationAndNavigate = async () => {
    try {
      const state = store.getState();
      const token = state.authentication.authData?.access_token;
  
      if (!token) {
        console.warn("No access token found in Redux.");
        navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
        return;
      }
  
      const formBody = new URLSearchParams();
      formBody.append("client_id", "Citizen-Client");
      formBody.append("client_secret", "bPBzkC38c3q54nVnXAcrO8RZqDFubpJW");
      formBody.append("token", token);
  
      const response = await fetch("https://trac.nest.gov.tt/apicall/frm2/realms/tteid/protocol/openid-connect/token/introspect", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });
  
      const data = await response.json();
      console.log("🔍 Token Introspect Response:", data);
  
      if (data.active === false) {
        console.warn("Token inactive or expired. Redirecting to Login...");
  
        // 🧹 Clear token from Redux store (optional based on how you store it)
        store.dispatch({ type: "LOGOUT_USER" }); // Replace with your actual logout action
  
        navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
      } else {
        navigation.navigate("QRScannerScreen");
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
    }
  };
  
  
  
  // Render item for the steps list
  const renderStepItem = ({ item }) => (
    <View style={styles.stepItem}>
      <View style={styles.circularTextView}>
        <Text style={styles.circularText}>{item.id}</Text>
      </View>
      <View style={styles.stepTextContainer}>
        <Text style={styles.stepTitle}>{item.title}</Text>
        <Text style={styles.stepDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        {/* Back button */}
        <TouchableOpacity style={styles.backButton}  onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/eva_back.png')} style={styles.iconSmall} />
        </TouchableOpacity>
        
        {/* Title section with check icon */}
        <View style={styles.titleSection}>
          <View style={styles.checkIconContainer}>
            <Image source={require('../assets/images/badge-check.png')} style={styles.iconSmall} />
          </View>
          <Text style={styles.titleText}>Disaster Relief Grant</Text>
        </View>
        
        {/* Steps description */}
        <Text style={styles.stepsDescription}>Steps for item redemption:</Text>
        
        {/* Steps list */}
        <FlatList
          data={steps}
          renderItem={renderStepItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.recyclerView}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 180 }}
        />
        
        {/* Bottom card */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.divider} />
            <Text style={styles.cardTitle}>Scan QR Code</Text>
            <View style={styles.divider} />
            <Text style={styles.cardDescription}>
              Please scan the vendor QR code to verify the vendor
            </Text>
            <TouchableOpacity style={styles.scanButton} onPress={handleTokenValidationAndNavigate}>
              <Image source={require('../assets/images/Camera.png')} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RedemptionStepScreen;