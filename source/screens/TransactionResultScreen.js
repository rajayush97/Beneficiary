import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const TransactionResultScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image 
          source={require('../assets/images/excalmatory.png')} 
          style={styles.backIcon} 
        />
      </TouchableOpacity>
      
      <View style={styles.resultContainer}>
        <Image 
          source={require('../assets/images/excalmatory.png')} 
          style={styles.logoResult} 
        />
        
        <Text style={styles.text1}>Transaction Completed</Text>
        
        <Text style={styles.text2}>
          Item has been delivered successfully
        </Text>
        
        <Text style={styles.text3}>
          Transaction ID: 1234567{'\n'}Item Category: Xyz
        </Text>
        
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.buttonText}>View Invoice</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.ipBtn}>
          <Text style={styles.buttonText}>Redeem Another Benefit</Text>
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
    marginTop: height * 0.035,
    marginLeft: width * 0.035,
  },
  backIcon: {
    width: width * 0.05,
    height: width * 0.05,
  },
  resultContainer: {
    width: width,
    height: height * 0.8,
    marginTop: height * 0.14,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoResult: {
    width: width * 0.15,
    height: width * 0.15,
    resizeMode: 'contain',
  },
  text1: {
    marginTop: height * 0.02,
    fontFamily: 'poppins_semibold',
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
  text2: {
    width: width * 0.8,
    marginTop: height * 0.02,
    fontFamily: 'lato_regular',
    fontSize: 16,
    color: '#717182',
    textAlign: 'center',
  },
  text3: {
    width: width * 0.8,
    marginTop: height * 0.09,
    fontFamily: 'lato_bold',
    fontSize: 16,
    color: '#6E6E71',
    textAlign: 'center',
    marginBottom: height * 0.12,
  },
  loginBtn: {
    width: width * 0.9,
    height: height * 0.07,
    backgroundColor: '#285385',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  ipBtn: {
    width: width * 0.9,
    height: height * 0.07,
    backgroundColor: '#285385',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  buttonText: {
    fontFamily: 'lato_regular',
    fontSize: 18,
    color: 'white',
  },
});

export default TransactionResultScreen;