import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Alert, ActivityIndicator, TouchableOpacity, Image, Modal } from "react-native";
import QRCode from "react-native-qrcode-svg";
import transactionStyles from "../styles/transactionStyle";
import { useRoute, useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import store from "../redux/store";
import BottomSheet from '../components/BottomSheet';
import CryptoJS from 'crypto-js';

import { useDispatch, useSelector } from "react-redux";
import { getLoginParams, updateUsername } from "../redux/actions/loginParametersAction";
import { authenticateUser } from "../redux/actions/authenticationAction";


import { validateToken } from "../utils/authUtils";

const GenerateQRCode = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const { vendorData, vendorId } = route.params || {};

  const [selectedItem, setSelectedItem] = useState(null);
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [qrPayload, setQrPayload] = useState(null);
  const [loading, setLoading] = useState(true);

  const password = "u4MvmicXqelp#(Mhfh#9hMPIWYTtOCdD";


  useEffect(() => {
    const callEncryptQRCodeAPI = async () => {
      try {
        setLoading(true);

        const state = store.getState();
        const token = state.authentication.authData?.access_token;
        const partnerId = await AsyncStorage.getItem("UserPartnerId");
        const programId = await AsyncStorage.getItem("UserProgramId");  //20 ;//

        if (!partnerId || !programId) throw new Error("Missing partner_id or program_id.");

        const response = await axios.post(
          'https://sbwtest.gov.tt/wrapper/api/benefit/encrypt/qr_code_item',
          {
            partner_id: partnerId, //128
            program_id: programId  // 24
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            }
          }
        );

        console.log("======================response========================", response);



        const itemJson = await AsyncStorage.getItem("SELECTED_ITEM");
        const parsedItem = itemJson ? JSON.parse(itemJson) : null;

        const matchedItem = response.data?.data?.find(
          (item) => item.name?.en_US === parsedItem?.title
        );

        console.log(matchedItem, "matchedItem");

        if (matchedItem) {
          setSelectedItem(matchedItem);
          await AsyncStorage.setItem("ENCRYPTED_ITEM_CODE", matchedItem.code);

          await generateQrPayload(matchedItem);
        } else {
          console.warn("No match found for selected item.");
          setSelectedItem(null); // ensure invalid doesn't flow
        }

      } catch (error) {
        console.error("Failed to call QR code API:", error);
        Alert.alert(`ProgramId is : ${program_id} partner_id is : ${partner_id} ${error.message}`);
      } finally {
        // setLoading(false);
      }
    };

    const token = store.getState().authentication.authData?.access_token;

    validateToken({
      navigation,
      token,
      onValid: callEncryptQRCodeAPI,
    });
  }, []);

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      try {
        const itemJson = await AsyncStorage.getItem("SELECTED_ITEM");
        const parsedItem = itemJson ? JSON.parse(itemJson) : null;
        // setSelectedItem(parsedItem);

        const encryptedCode = await AsyncStorage.getItem("ENCRYPTED_ITEM_CODE");

        const state = store.getState();
        const token = state.authentication.authData?.access_token;

        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        const storedVendorId = vendorId || (await AsyncStorage.getItem("vendorId"));

        if (!storedVendorId) {
          Alert.alert("Error", "Vendor ID is missing.");
          return;
        }

        const API_URL = `https://sbwtest.gov.tt/vendor/api/transaction/list/vendor/${storedVendorId}`;

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const transactions = response.data?.data || [];

        console.log(transactions, "All Transactions");

        setTransactions(transactions);

        const matchedTransaction = transactions.find(
          (t) => t.itemCode === encryptedCode
        );

        if (matchedTransaction) {
          const status = matchedTransaction.status;


          if (status === "1") {
            setSheetVisible(true);
            clearInterval(intervalId); // ✅ Stop polling once condition is met
          }
        }
      } catch (error) {
        console.warn("Polling error:", error);
      } finally {
        // setLoading(false);
      }
    };

    const token = store.getState().authentication.authData?.access_token;

    validateToken({
      navigation,
      token,
      onValid: () => {
        fetchData(); // First immediate call
        intervalId = setInterval(fetchData, 5000); // Repeat every 5 sec
      },
    });

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);


  const generateQrPayload = async (item) => {
    setAuthLoading(false);
    // setSheetVisible(false);
    // setAuthModalVisible(false); 
    // navigation.navigate('HomeScreen')
    if (!item) {
      console.warn("generateQrPayload: No item provided");
      return;
    }

    try {
      const itemId = item?.product_id || "NA";
      const beneficiaryId = item?.profile?.beneficiary_id || "NA";
      const itemCode = item?.code || "NA";
      const programId = await AsyncStorage.getItem("UserProgramId") || "NA";
      const itemName = item?.name?.en_US || "NA";
      const beneficiaryEid = item?.profile?.beneficiary_eid || "NA";
      const beneficiaryName = item?.profile?.beneficiary_name || "NA";

      const plainPayload = `${itemId}@${beneficiaryId}@${itemCode}@${programId}@${itemName}@${beneficiaryEid}@${beneficiaryName}`;
      const encryptedPayload = encryptPayload(plainPayload);

      if (!encryptedPayload) {
        throw new Error("Encryption failed. Payload is null.");
      }
      setQrPayload(encryptedPayload);
    } catch (err) {
      console.error("❌ Failed to generate encrypted QR payload:", err);
    }
  };

  const generateKey = (password, salt) => {
    return CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 65536,
      hasher: CryptoJS.algo.SHA256,
    });
  };

  const encryptPayload = (payload) => {
    if (!payload) throw new Error("Payload is null");

    try {
      const salt = CryptoJS.lib.WordArray.random(16);//getRandomBytes(16);  // Generate a random salt
      const iv = CryptoJS.lib.WordArray.random(16);     //getRandomBytes(16);  // Generate a random IV
      const key = generateKey(password, salt);  // Derive the encryption key using PBKDF2

      // Encrypt the payload using AES with CBC mode
      const encrypted = CryptoJS.AES.encrypt(payload, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      // Concatenate salt + iv + encrypted ciphertext
      const result = salt.clone().concat(iv).concat(encrypted.ciphertext);

      return CryptoJS.enc.Base64.stringify(result);  // Return the encrypted payload as Base64 string
    } catch (error) {
      console.error("Encryption failed:", error);
      return null;
    }
  };

  const openIdenTT = () => {
    fetchTokenFromCoreEID();
  };

  const { login_params } = useSelector(
    (state) => state.loginParameters
  );

  const fetchTokenFromCoreEID = async () => {
    try {
      const storedIdenTT = await AsyncStorage.getItem("USER_IDENTIFICATION_NUMBER");

      if (!storedIdenTT) {
        Alert.alert("Missing ID", "No IdenTT number found in storage.");
        return;
      }

      const formData = new URLSearchParams();
      formData.append("username", storedIdenTT);

      const response = await dispatch(authenticateUser(login_params));

      console.log(response, "responseresponseresponse");

      if (response) {
        setAuthLoading(false);
        navigation.navigate("IdenTTConfirm", { transactions });
        setAuthModalVisible(false);
      } else {
        console.warn("⚠️ Access token not found in the response.");
      }


    } catch (error) {
      console.error("❌ Error fetching token from CoreEID:", error);
      Alert.alert("Token Error", "Failed to fetch token from IdenTT service.");
    }
  };


  const handleCancelTransaction = async (transactionId) => {
    try {
      const API_URL = `https://sbwtest.gov.tt/api/vendors/api/transaction/delete/${transactionId}`;
  
      const response = await axios.delete(API_URL);
  
      console.log('Transaction deleted:', response.data);
  
      setSheetVisible(false); // Hide the sheet
      navigation.goBack();    // 👈 Go back to the previous screen
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };
  


  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={transactionStyles.backButton}>
        <Image source={require("../assets/images/eva_back.png")} style={transactionStyles.backIcon} />
      </TouchableOpacity>
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
          <Feather name="check" size={16} color="green" style={{ marginRight: 6 }} />

          <Text style={{ fontSize: 16, color: "#2E5AAC", fontWeight: "600" }}>

            {selectedItem?.name?.en_US || "Item Title"}
          </Text>
        </View>
        <Text style={{ fontSize: 14, color: "#666" }}>
          {selectedItem?.total_amount ? `TTD $${selectedItem.total_amount}` : "Amount not available"}
        </Text>
      </View>

      {/* QR Code */}
      {qrPayload ? (
        <QRCode
          value={qrPayload || "loading..."}
          size={240}
          backgroundColor="white"
        />

      ) : (
        <ActivityIndicator size="large" color="#2E5AAC" />
      )}

      {/* Footer section */}
      <View style={{ marginTop: 80 }}>
        {!isSheetVisible && loading && (
          <ActivityIndicator size="large" color="#2E5AAC" />
        )}

        <Text style={{ fontSize: 14, textAlign: 'center', color: "#000", marginTop: 10 }}>
          Display at supporting vendors to redeem benefits
        </Text>
      </View>

      <BottomSheet visible={isSheetVisible}>
        <View style={{ maxHeight: 120, paddingBottom: 10 }}>
          <View style={{ paddingVertical: 16, borderBottomWidth: 1, borderColor: '#ddd' }}>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Approve</Text>
          </View>

          <Text style={{ textAlign: 'center', fontSize: 15, color: '#333', marginVertical: 20 }}>
            {selectedItem?.name?.en_US || "Item Title"}  {selectedItem?.total_amount ? `TTD $${selectedItem.total_amount}` : "Amount not available"}
          </Text>

          <View style={{ flexDirection: 'row', marginHorizontal: 20, gap: 10 }}>
            <TouchableOpacity
              onPress={() => handleCancelTransaction(matchedTransaction.id)} // here, id is a transaction id which is coming from transaction get api

              style={{
                flex: 1,
                backgroundColor: '#ccc', // Different color for cancel
                paddingVertical: 14,
                borderRadius: 8,
              }}
            >
              <Text style={{ textAlign: 'center', color: '#000', fontSize: 16, fontWeight: '600' }}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSheetVisible(false);
                setAuthModalVisible(true); // ✅ open the modal
              }}
              style={{
                flex: 1,
                backgroundColor: '#2E5AAC',
                paddingVertical: 14,
                borderRadius: 8,
              }}
            >
              <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: '600' }}>
                Confirmsss
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </BottomSheet>

      <Modal transparent visible={authModalVisible} animationType="slide">
        <View style={transactionStyles.modalContainer}>
          <View style={transactionStyles.popup}>
            <Text style={transactionStyles.title}>
              Please authenticate on your IdenTT app
            </Text>
            <Text style={transactionStyles.message}>
              To proceed, please grant consent in the IdenTT application
            </Text>

            <View style={transactionStyles.buttonContainer}>
              {/* Proceed Button */}
              <TouchableOpacity
                style={transactionStyles.proceedButton}
                onPress={() => {
                  setAuthLoading(true);

                  // Simulate short delay before opening deep link
                  setTimeout(() => {
                    // setAuthLoading(false);
                    openIdenTT();
                  }, 1000);
                }}
                disabled={authLoading}
              >
                {authLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={transactionStyles.buttonText}>Proceed</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );

};

export default GenerateQRCode;
