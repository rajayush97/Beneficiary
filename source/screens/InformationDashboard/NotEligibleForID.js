import React, {useState} from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useRoute } from "@react-navigation/native"; // Import to access route params
import eligibleStyle from "../../styles/eligibilityCheckResponse/eligibleStyle";
import Button from "../../components/Button";
import { Linking } from 'react-native';




const NotEligibleForID = ({ navigation }) => {
    const route = useRoute(); // Access route params
    const { item } = route.params || {}; // Get matchedItem from params
    const [loading, setLoading] = useState(false);

    const handleSendDetails = async () => {
    navigation.navigate('InformationDashboardScreen');
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
        <View style={eligibleStyle.verifiedCircleNot}>
          <Image 
            source={require("../../assets/images/excalmatory.png")} // Replace with actual path
            style={eligibleStyle.tickImage}
          />
        </View>

        {/* Verified Text */}
        <Text style={eligibleStyle.noInvoiceText}>You are not eligible</Text>
        <Text style={eligibleStyle.verifiedItemTextNot}>
        Based on the information provided, you do not qualify for this benefit.
        </Text>
        
      </View>

      {/* Close Button at Bottom */}
      <View style={eligibleStyle.viewOtherBenefits}>
        <Button 
          title="View Other Benefits" 
          onPress={handleSendDetails}
          style={eligibleStyle.closeButton} 
          textStyle={eligibleStyle.closeButtonText} 
        />
      </View>

      <View style={eligibleStyle.contact}>
        <Button 
          title="Contact Us" 
          onPress={() => {
              Linking.openURL("tel:+1868-800-1673") // Replace with your desired phone number
                .catch(err => console.error("Could not open dialer", err));
            }} 
          style={eligibleStyle.closeButton} 
          textStyle={eligibleStyle.closeButtonText} 
        />
      </View>

      <Text style={eligibleStyle.Although}>
      Although you may not be eligible for this program, you can still explore other grants from MSDFS or contact them directly to find a benefit that suits your needs.
 
        </Text>
      
    </View>
  );
};

export default NotEligibleForID;