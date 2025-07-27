import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useRoute } from "@react-navigation/native"; // Import to access route params
import transactionStyles from "../styles/transactionStyle";
import Button from "../components/Button";


const VendorVerify = ({ navigation }) => {
  const route = useRoute(); // Access route params
  const { vendorData,vendorId } = route.params || {}; // Get matchedItem from params
  console.log("VendorVerify: vendorData ->", vendorData);
  console.log("VendorVerify: vendorId ->", vendorId);

  const handleSendDetails = async () => {
    navigation.navigate('GenerateQRCode', {
      vendorData,
      vendorId
    });
  };

  return (
    <View style={transactionStyles.modalContainer}>

      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={transactionStyles.backButton}>
        <Image source={require("../assets/images/eva_back.png")} style={transactionStyles.backIcon} />
      </TouchableOpacity>

      {/* Centered Content */}
      <View style={transactionStyles.centeredContainer}>
        {/* Circle with Tick Image */}
        <View style={transactionStyles.verifiedCircle}>
          <Image
            source={require("../assets/images/tickCircle.png")} // Replace with actual path
            style={transactionStyles.tickImage}
          />
        </View>

        {/* Verified Text */}
        <Text style={transactionStyles.noInvoiceText}>Vendor Verified</Text>
        <Text style={transactionStyles.subHeading}>Vendor Details</Text>
        <View style={transactionStyles.verifiedItemText}>
          <Text>{vendorData.businessName}</Text>
          {vendorData.businessName || "No Item Data"}

          <Text>{vendorData.addressLine1}</Text>
          {vendorData.addressLine1 || "No Item Data"}
        </View>
      </View>

      <View style={transactionStyles.closeButtonContainer}>
        <Button
          title="Open QR Code"
          onPress={handleSendDetails}
          style={transactionStyles.closeButton}
          textStyle={transactionStyles.closeButtonText}
        />
      </View>
    </View>
  );
};

export default VendorVerify;