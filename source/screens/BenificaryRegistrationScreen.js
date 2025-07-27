import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Alert } from 'react-native';


import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchuserInfoIdenTT } from '../services/userInfoIdenttService';
import { useDispatch, useSelector } from "react-redux";

const { width } = Dimensions.get('window');

const BenificaryRegistrationScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    address: '',
    town: '',
    postalCode: '',
  });

    //profile==========================================================================
    const { loading_profile, profile, profile_error } = useSelector(
      (state) => state.profileDetails
    );

  useEffect(() => {
    const loadUserInfo = async () => {
      
      try {
        setLoading(true);
        const data = await fetchuserInfoIdenTT();
        setUserInfo(data);
      } catch (err) {
        setError(err.message || 'Failed to load user info');
      } finally {
        setLoading(false);
      }
    };
    loadUserInfo();
  }, [navigation]);

  
  // Function to handle input changes
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleRegister = async () => {

    if (!formData.email || !formData.address || !formData.town) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const requestBody = {
      partner_id: profile.partner_id,
      question_answer_json: {
        registration_fields: [
          { "e-ID Number": userInfo?.username || '' },
          { "Name": `${userInfo?.firstName || ''} ${userInfo?.middleName?.[0] || ''} ${userInfo?.lastName || ''}` },
          { "Date of Birth": userInfo?.attributes?.dob?.[0] || '' },
          { "National ID Number": 
            userInfo?.attributes?.pictureID1?.[0] === 'National ID'
              ? userInfo?.attributes?.idNumberPicture1?.[0] || ''
              : userInfo?.attributes?.pictureID2?.[0] === 'National ID'
              ? userInfo?.attributes?.idNumberPicture2?.[0] || ''
              : ''
          },
          { "Phone Number": userInfo?.attributes?.mobile?.[0] || '' },
          { "Email": formData.email },
          { "Address": formData.address },
          { "Town": formData.town },
          { "Postal Code": formData.postalCode }
        ]
      }
    };
  
    try {
      const response = await fetch('https://sbwtest.gov.tt/wrapper/api/beneficiary/question_answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
  
      Alert.alert(
        'Registration successful!',
        '', // You can add a message here if needed
        [
          { text: 'OK', onPress: () => navigation.navigate('InformationDashboardScreen') }
        ]
      );
  
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Beneficiary Registration</Text>
      <Text style={styles.subText}>
        Please complete the form below to continue with your registration.
        Information from your IdenTT has been pre-filled.
      </Text>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      {userInfo && (
        <>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.dataContainer}>
              {/* IdenTT Number */}
              <Text style={styles.label}>IdenTT Number</Text>
              <TextInput style={styles.input} value={userInfo.username || ''} editable={false} />

              {/* Name */}
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={`${userInfo.firstName || ''} ${userInfo.middleName?.[0] || ''} ${userInfo.lastName || ''}`}
                editable={false}
              />

              {/* Date of Birth */}
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput style={styles.input} value={userInfo.attributes?.dob?.[0] || ''} editable={false} />

              {/* National ID Number */}
              <Text style={styles.label}>National ID Number</Text>
              <TextInput
                style={styles.input}
                value={
                  userInfo.attributes?.pictureID1?.[0] === 'National ID'
                    ? userInfo.attributes?.idNumberPicture1?.[0] || ''
                    : userInfo.attributes?.pictureID2?.[0] === 'National ID'
                    ? userInfo.attributes?.idNumberPicture2?.[0] || ''
                    : ''
                }
                editable={false}
              />

              {/* Phone Number */}
              <Text style={styles.label}>Phone Number</Text>
              <TextInput style={styles.input} value={userInfo.attributes?.mobile?.[0] || ''} editable={false} />

              {/* Email */}
              <Text style={styles.label}>Email</Text>
              <TextInput 
                style={styles.input}
                placeholder="Enter your email" 
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                />

              {/* Address */}
              <Text style={styles.label}>Address</Text>
              <TextInput 
              style={styles.input} 
              placeholder="Address Line 1" 
              value={formData.address}
              onChangeText={(text) => handleInputChange('address', text)}
              />
              <TextInput style={styles.input} placeholder="Address Line 2 (Optional)" />
              <TextInput style={styles.input} placeholder="Town/City" 
                value={formData.town}
                onChangeText={(text) => handleInputChange('town', text)}
              />
              <TextInput style={styles.input} placeholder="Postal Code (Optional)" keyboardType="numeric" 
              value={formData.postalCode}
              onChangeText={(text) => handleInputChange('postalCode', text)}/>
            </View>
          </ScrollView>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('InformationDashboardScreen')}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default BenificaryRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E2E2E',
    textAlign: 'center',
    marginVertical: 10,
  },
  subText: {
    fontSize: 14,
    color: '#606060',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  dataContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#b0b0b0',
    padding: 14,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#4A5A69',
    padding: 14,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});