import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import store from '../redux/store';
import axios from "axios";
import { useRoute } from '@react-navigation/native';

import DocumentPicker from 'react-native-document-picker';


const { width, height } = Dimensions.get('window');

const UploadImageBenefitScreen = ({ navigation }) => {
  const route = useRoute();
  const { transactions } = route.params || {};

  const data = transactions[0];

  // Token validation function
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

      if (data.active === false) {
        console.warn("Token inactive or expired. Showing session alert...");

        // Show alert first
        Alert.alert(
          "Session Expired",
          "Please log in again.",
          [
            {
              text: "OK",
              onPress: () => {
                store.dispatch({ type: "LOGOUT_USER" }); // Clear token
                navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        // Token is valid, now call file upload
        handleFileUpload();
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
    }
  };


  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });


      const filePath = result.fileCopyUri || result.uri;
      const fileName = result.name;
      const fileType = result.type || 'application/octet-stream';

      if (result.size > 20 * 1024 * 1024) {
        Alert.alert("Error", "File size exceeds 20 MB.");
        return;
      }

      const state = store.getState();
      const token = state.authentication.authData?.access_token;

      if (!token) {
        Alert.alert("Error", "Token missing");
        return;
      }

      const programId = data.programId;
      const beneficiaryId = data.programId;
      const formId = data.programId;

      const documentDto = {
        programId,
        beneficiaryId,
        formId,
        documentName: fileName,
      };

      const formData = new FormData();
      formData.append('documentDto', {
        string: JSON.stringify(documentDto),
        type: 'application/json',
      });

      formData.append('document', {
        uri: filePath,
        type: fileType,
        name: fileName,
      });

      const uploadResponse = await axios.post(
        'https://sbwtest.gov.tt/vendor/api/documents/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );


      const documentId = uploadResponse.data?.data?.["Document ID"];
      if (!documentId) {
        Alert.alert("Upload Error", "Document ID not found in upload response.");
        return;
      }

      // Call transaction API with Document ID
      await sendTransactionDetails(token, transactions[0], documentId);

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.error('❌ Upload Error:', err);
        Alert.alert('Upload Failed', err.message || 'Something went wrong.');
      }
    }
  };

  const sendTransactionDetails = async (token, data, documentId) => {

    try {
      const API_URL = "https://sbwtest.gov.tt/vendor/api/transaction/add";

      const transactionData = {
        vendorId: data.vendorId,
        id: data.id,
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
        beneficiaryImageId: documentId, // ✅ Set this to uploaded doc ID
        status: "3",
        beneficiaryName: data.beneficiaryName,
        vendorUserName: data.vendorUserName,
      };

      const response = await axios.post(API_URL, transactionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === 424) {
        Alert.alert("Duplicate Transaction", response.data.message);
      } else {
        Alert.alert("Success", "Transaction submitted successfully!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Invoice", response.data),
          },
        ]);
      }
    } catch (error) {
      console.error("❌ Transaction API Error:", error);

      const errorMessage = error.response?.data?.message || "Failed to send transaction.";
      Alert.alert("Transaction Error", errorMessage);
    }
  };



  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      {/* Main content aligned with the image */}
      <View style={styles.contentContainer}>
        {/* Instructions text */}
        <Text style={styles.instructionsText}>
          Please upload a photo to confirm your item was received:
        </Text>

        {/* Upload area with dashed border */}
        <View style={styles.uploadArea}>
          <MaterialIcons name="upload-file" size={32} color="#6E6E71" />
          <Text style={styles.acceptedFileTypes}>
            **Accepted File Types: png, jpg, jpeg **
          </Text>
          <Text style={styles.maxFileSize}>
            ** Max File Size: 20 Mb **
          </Text>
        </View>

        {/* Item card */}
        <TouchableOpacity style={styles.itemCard} onPress={handleTokenValidationAndNavigate}>
          <View style={styles.itemCardContent}>
            <MaterialIcons name="upload-file" size={24} color="#000" style={styles.fileIcon} />
            <Text style={styles.itemText}>{transactions[0].itemCategory}</Text>
            <AntDesign name="upload" size={24} color="#4CAF50" style={styles.uploadIcon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: width,
    height: height,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.08,
    left: width * 0.045,
    fontWeight: 'bold',
    zIndex: 10,
  },
  backIcon: {
    width: width * 0.06,
    height: width * 0.06,
  },
  contentContainer: {
    flex: 1,
    paddingTop: height * 0.08, // Space for back button
    paddingHorizontal: width * 0.05,
    alignItems: 'flex-start',
  },
  instructionsText: {
    width: '100%',
    fontFamily: 'poppins_light',
    fontSize: 12,
    color: 'black',
    marginTop: height * 0.18, // Positioned as in the image
    marginBottom: height * 0.02,
  },
  uploadArea: {
    width: '100%',
    height: height * 0.18,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.02,
  },
  documentIcon: {
    width: width * 0.07,
    height: width * 0.09,
    marginBottom: height * 0.015,
  },
  acceptedFileTypes: {
    fontFamily: 'poppins_regular',
    fontSize: 11,
    color: '#6E6E71',
  },
  maxFileSize: {
    fontFamily: 'poppins_regular',
    fontSize: 11,
    color: '#6E6E71',
    marginTop: height * 0.005,
  },
  itemCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: height * 0.01,
  },
  itemCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.04,
  },
  fileIcon: {
    width: width * 0.06,
    height: width * 0.06,
  },
  itemText: {
    flex: 1,
    fontFamily: 'poppins_regular',
    fontSize: 16,
    color: 'black',
    marginLeft: width * 0.04,
  },
  uploadIcon: {
    width: width * 0.06,
    height: width * 0.06,
    tintColor: '#4CAF50', // Green color for the upload icon
  },
});

export default UploadImageBenefitScreen;