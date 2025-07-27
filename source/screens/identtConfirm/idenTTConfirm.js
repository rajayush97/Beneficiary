import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import eligibleStyle from "../../styles/eligibilityCheckResponse/eligibleStyle";
import Button from "../../components/Button";
import { useRoute } from '@react-navigation/native';
import store from "../../redux/store"; 



const IdenTTConfirm = ({ navigation }) => {
    const route = useRoute();
    const { transactions } = route.params || {};
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);


    useEffect(() => {
        const sendTransactionDetails = async () => {
            const state = store.getState(); 
            const token = state.authentication.authData?.access_token; 
    
            if (!token) {
                Alert.alert("Error", "Authentication token missing.");
                return;
            }
    
            if (!Array.isArray(transactions) || transactions.length === 0) {
                Alert.alert("Error", "No transaction data available.");
                return;
            }
    
            const data = transactions[0];
    
            const API_URL = "https://sbwtest.gov.tt/vendor/api/transaction/add";
    
            const transactionData = {
                vendorId: data.vendorId,
                id : data.id,
                beneficiaryEId: data.beneficiaryEId,
                beneficiaryId: data.beneficiaryId,
                businessName: data.businessName,
                vendorEId: data.vendorEId,
                itemCode: data.itemCode,
                itemCategory: data.itemCategory,
                price: data.price,
                programId: data.programId,
                vendorItemId: data.vendorItemId,
                vendorImageId: data.vendorImageId,
                invoiceId: data.invoiceId,
                beneficiaryImageId: data.beneficiaryImageId,
                status: "2",
                beneficiaryName: data.beneficiaryName,
                vendorUserName: data.vendorUserName, 
            };
    
            try {
                setLoading(true);
                setHasError(false); // Reset error on fresh attempt
            
                const response = await axios.post(API_URL, transactionData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
            
                console.log("✅ Transaction sent:", response.data);
            
                if (response.data.status === 424) {
                    Alert.alert("Duplicate Transaction", response.data.message);
                }
            
            } catch (error) {
                console.error("❌ API Error:", error);
            
                const errorMessage = error.response?.data?.message || "Failed to send transaction.";
                console.log("⚠️ Error Message:", errorMessage);
            
                // Check for token expiration message
                if (errorMessage.toLowerCase().includes("invalid") || errorMessage.toLowerCase().includes("expired")) {
                    Alert.alert("Session Expired", "Please log in again.", [
                        {
                            text: "OK",
                            onPress: () => navigation.reset({
                                index: 0,
                                routes: [{ name: "LaunchScreen" }],
                            }),
                        },
                    ]);
                } else {
                    setHasError(true);
                    Alert.alert("Error", errorMessage);
                }
            } finally {
                // Only stop loading if no error
                if (!hasError) {
                    setLoading(false);
                }
                console.log("🔄 API Call Completed.");
            }   
        };
    
        sendTransactionDetails();
    }, []);
    

    const handleSendDetails = async () => {
        navigation.navigate('UploadImageBenefitScreen', { transactions });
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
                <Text style={eligibleStyle.noInvoiceText}>IdenTT Confirm</Text>
                <Text style={eligibleStyle.verifiedItemText}>
                    Based on the information provided, You are valid user.
                </Text>

            </View>

            {/* Close Button at Bottom */}
            <View style={eligibleStyle.closeButtonContainer}>
                {loading || hasError ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Button
                        title="Upload Image"
                        onPress={handleSendDetails}
                        style={eligibleStyle.closeButton}
                        textStyle={eligibleStyle.closeButtonText}
                    />
                )}
            </View>

        </View>
    );
};

export default IdenTTConfirm;


