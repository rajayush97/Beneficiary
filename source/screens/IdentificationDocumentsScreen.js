import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  ScrollView
} from 'react-native';

const { width, height } = Dimensions.get('window');

const CustomCheckbox = ({ label, isChecked, onToggle }) => {
  return (
    <View style={styles.checkboxRow}>
      <TouchableOpacity 
        style={styles.checkboxContainer} 
        onPress={onToggle}
      >
        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
          {isChecked && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </View>
  );
};

const IdentificationDocumentsScreen = ({ navigation }) => {
  const [birthCertificate, setBirthCertificate] = useState(false);
  const [nationalId, setNationalId] = useState(false);
  const [driverLicense, setDriverLicense] = useState(false);
  const [passport, setPassport] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const handleCheckEligibility = () => {
    // Navigate to next screen or perform eligibility check
    if (agreeTerms && (birthCertificate || nationalId || driverLicense || passport)) {
      // Navigate to next screen
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            Select Your Identification Documents
          </Text>
          
          <Text style={styles.subtitle}>
            Select the identification documents you possess to determine your eligibility for Ident enrolment
          </Text>
          
          <View style={styles.checkboxesContainer}>
            <CustomCheckbox 
              label="Birth Certificate" 
              isChecked={birthCertificate} 
              onToggle={() => setBirthCertificate(!birthCertificate)}
            />
            
            <CustomCheckbox 
              label="National ID" 
              isChecked={nationalId} 
              onToggle={() => setNationalId(!nationalId)}
            />
            
            <CustomCheckbox 
              label="Driver's License" 
              isChecked={driverLicense} 
              onToggle={() => setDriverLicense(!driverLicense)}
            />
            
            <CustomCheckbox 
              label="Passport" 
              isChecked={passport} 
              onToggle={() => setPassport(!passport)}
            />
          </View>
          
          <Text style={styles.readCarefully}>
            Please read it carefully
          </Text>
          
          <Text style={styles.declaration}>
            I declare that all the statements in this form are true and correct to the best of my knowledge and belief and I agree that any misrepresentations in this application will be grounds for denial of my application
          </Text>
          
          <View style={styles.agreeCheckboxRow}>
            <TouchableOpacity 
              style={styles.checkboxContainer} 
              onPress={() => setAgreeTerms(!agreeTerms)}
            >
              <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
                {agreeTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
            <Text style={styles.agreeText}>
              I Agree With The Information Stated Above
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <TouchableOpacity 
        style={[
          styles.checkEligibilityButton,
          (!agreeTerms || (!birthCertificate && !nationalId && !driverLicense && !passport)) && styles.disabledButton
        ]} 
        onPress={handleCheckEligibility}
        disabled={!agreeTerms || (!birthCertificate && !nationalId && !driverLicense && !passport)}
      >
        <Text style={styles.buttonText}>Check Eligibility</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: width * 0.05,
    paddingBottom: height * 0.1,
  },
  title: {
    width: '100%',
    marginTop: height * 0.02,
    fontFamily: 'poppins_bold',
    fontSize: 24,
    color: '#285385', // btn_color
  },
  subtitle: {
    width: '100%',
    marginTop: height * 0.015,
    marginBottom: height * 0.025,
    fontFamily: 'lato_regular',
    fontSize: 14,
    color: '#6E6E71', // dark_grey
  },
  checkboxesContainer: {
    width: '100%',
    marginTop: height * 0.02,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#6E6E71',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#285385',
    borderColor: '#285385',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
  },
  checkboxLabel: {
    fontFamily: 'lato_regular',
    fontSize: 14,
    color: 'black',
    marginLeft: width * 0.03,
  },
  readCarefully: {
    fontFamily: 'poppins_bold',
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * 0.03,
    marginBottom: height * 0.02,
  },
  declaration: {
    width: '100%',
    fontFamily: 'lato_regular',
    fontSize: 14,
    color: '#6E6E71', // dark_grey
    textAlign: 'center',
    marginBottom: height * 0.03,
  },
  agreeCheckboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  agreeText: {
    fontFamily: 'lato_regular',
    fontSize: 14,
    color: 'black',
    marginLeft: width * 0.03,
  },
  checkEligibilityButton: {
    position: 'absolute',
    bottom: height * 0.03,
    left: width * 0.05,
    right: width * 0.05,
    height: height * 0.07,
    backgroundColor: '#285385', // btn_color
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontFamily: 'lato_regular',
    fontSize: 16,
    color: 'white',
  },
});

export default IdentificationDocumentsScreen;