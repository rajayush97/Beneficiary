import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const DeclarationPanelScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Declaration of Truth</Text>
      
      <Image 
        source={require('../assets/images/excalmatory.png')} 
        style={styles.exclamationIcon} 
      />
      
      <Text style={styles.paragraphText}>
        A material or false statement or omission made in connection with this application is sufficient cause for denial of the social services
      </Text>
      
      <Image 
        source={require('../assets/images/excalmatory.png')} 
        style={styles.auditIcon} 
      />
      
      <Text style={styles.readCarefullyText}>
        Please read it carefully
      </Text>
      
      <Text style={styles.paragraphText}>
        I declare that all the statements in this form are true and correct to the best of my knowledge and belief, and I agree that any misrepresentations in this application will be grounds for denial of my application or request for repayment of any benefit received
      </Text>
      
      <TouchableOpacity 
        style={styles.checkboxContainer}
        onPress={() => setIsChecked(!isChecked)}
      >
        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
          {isChecked && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.checkboxText}>
          I agree with the information stated above
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.06, // equivalent to 24dp
    backgroundColor: 'white',
    width: width,
  },
  headerText: {
    width: '100%',
    fontFamily: 'poppins_semibold',
    fontSize: 24,
    color: '#285385', // blue color as specified
    fontWeight: 'bold',
    marginTop: 50
  },
  exclamationIcon: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    marginTop: height * 0.04, // equivalent to 32dp
  },
  auditIcon: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    marginTop: height * 0.04, // equivalent to 32dp
  },
  paragraphText: {
    width: '100%',
    marginTop: height * 0.03, // equivalent to 24dp
    textAlign: 'center',
    fontFamily: 'lato_regular',
    fontSize: 16,
    color: '#12132F',
  },
  readCarefullyText: {
    width: '100%',
    marginTop: height * 0.01, // equivalent to 8dp
    textAlign: 'center',
    fontFamily: 'poppins_bold',
    fontSize: 16,
    color: '#12132F',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.04, // equivalent to 32dp
    width: '100%',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#285385',
    borderRadius: 2,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#285385',
  },
  checkmark: {
    color: 'white',
    fontSize: 18,
    lineHeight: 22,
  },
  checkboxText: {
    fontFamily: 'lato_regular',
    fontSize: 16,
    color: '#12132F',
    flex: 1,
  },
});

export default DeclarationPanelScreen;