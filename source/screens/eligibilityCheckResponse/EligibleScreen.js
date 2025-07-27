import React, {useState} from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useRoute } from "@react-navigation/native"; // Import to access route params
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import eligibleStyle from "../../styles/eligibilityCheckResponse/eligibleStyle";
import Button from "../../components/Button";



const EligibleScreen = ({ navigation }) => {
    const route = useRoute(); // Access route params
    const { item } = route.params || {}; // Get matchedItem from params
    const [loading, setLoading] = useState(false);

    const handleSendDetails = async () => {
      navigation.navigate('LoginScreen');
    };
    
      

  return (
    <View style={eligibleStyle.modalContainer}>
      
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={eligibleStyle.backButton}>
        <Image source={require("../../assets/images/eva_back.png")} style={eligibleStyle.backIcon} />
      </TouchableOpacity>


      {/* Centered Content */}
      <View style={eligibleStyle.centeredContainer}>
        
        {/* Circle with Tick Image */}
        <View style={eligibleStyle.verifiedCircle}>
          <Image 
            source={require("../../assets/images/tickCircle.png")} // Replace with actual path
            style={eligibleStyle.tickImage}
          />
        </View>

        {/* Verified Text */}
        <Text style={eligibleStyle.noInvoiceText}>You are eligible</Text>
        <Text style={eligibleStyle.verifiedItemText}>
        Based on the information provided, you are eligible to apply for this benefit.
        </Text>
        
      </View>

      {/* Close Button at Bottom */}
      <View style={eligibleStyle.closeButtonContainer}>
        <Button 
          title="Login to Apply" 
          onPress={handleSendDetails}
          style={eligibleStyle.closeButton} 
          textStyle={eligibleStyle.closeButtonText} 
        />
      </View>
      
    </View>
  );
};

export default EligibleScreen;