import React, {useState} from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import eligibleStyle from "../../styles/eligibilityCheckResponse/eligibleStyle";
import Button from "../../components/Button";
import { useRoute } from '@react-navigation/native';



const EligibleForID = ({ navigation }) => {
  const route = useRoute();
  const { programId } = route.params;
  
    const handleSendDetails = async () => {
   navigation.navigate('FormScreen',  { programId: programId });
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
        <Text style={eligibleStyle.noInvoiceText}>You are eligible to apply</Text>
        <Text style={eligibleStyle.verifiedItemText}>
        Based on the information provided, you are eligible to apply for this benefit.
        </Text>
        
      </View>

      {/* Close Button at Bottom */}
      <View style={eligibleStyle.closeButtonContainer}>
        <Button 
          title="Apply" 
          onPress={handleSendDetails}
          style={eligibleStyle.closeButton} 
          textStyle={eligibleStyle.closeButtonText} 
        />
      </View>
      
    </View>
  );
};

export default EligibleForID;

