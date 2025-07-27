import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Dimensions 
} from 'react-native';

// Get window dimensions
const { width, height } = Dimensions.get('window');

const EligibilityResultScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Image 
          source={require('../assets/images/excalmatory.png')} 
          style={styles.backIcon} 
        />
      </TouchableOpacity>
      
      {/* Content container */}
      <View style={styles.contentContainer}>
        <Image 
          source={require('../assets/images/excalmatory.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
        
        <Text style={styles.titleText}>
          You are eligible
        </Text>
        
        <Text style={styles.descriptionText}>
          Based on the information provided you qualify for this benefit
        </Text>
        
        {/* Spacer to push button layout to the bottom */}
        <View style={styles.spacer} />
        
        {/* Login button - visible */}
        <TouchableOpacity style={styles.loginButton}>
          <View style={styles.buttonIconContainer}>
            <Image 
              source={require('../assets/images/excalmatory.png')} 
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Login to apply</Text>
          </View>
        </TouchableOpacity>
        
        {/* View other benefits button - invisible */}
        <TouchableOpacity 
          style={[styles.otherBenefitsButton, { opacity: 0 }]}
          activeOpacity={1}
          disabled={true}
        >
          <Text style={styles.buttonText}>View other benefits</Text>
        </TouchableOpacity>
        
        {/* Contact us button - invisible */}
        <TouchableOpacity 
          style={[styles.contactButton, { opacity: 0 }]}
          activeOpacity={1}
          disabled={true}
        >
          <View style={styles.buttonIconContainer}>
            <Image 
              source={require('../assets/images/excalmatory.png')} 
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Contact us</Text>
          </View>
        </TouchableOpacity>
        
        {/* Bottom text - gone in the original layout, so not rendered */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: height * 0.017,
    left: width * 0.035,
    zIndex: 1,
  },
  backIcon: {
    width: width * 0.05,
    height: width * 0.05,
    minWidth: width * 0.05,
    minHeight: width * 0.05,
  },
  contentContainer: {
    flex: 1,
    marginTop: height * 0.173, // Converted from 140px
    paddingHorizontal: width * 0.062, // Converted from 25px
  },
  logoImage: {
    width: '100%',
    height: height * 0.074, // Converted from 60px
    alignSelf: 'center',
  },
  titleText: {
    fontFamily: 'poppins_semiBold',
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginTop: height * 0.017, // Converted from 14px
    marginHorizontal: width * 0.09, // Converted from 36px
    textAlign: 'center',
  },
  descriptionText: {
    fontFamily: 'lato_regular',
    fontSize: 16,
    color: '#717182', // Dark grey color
    marginTop: height * 0.017, // Converted from 14px
    marginHorizontal: width * 0.045, // Converted from 18px
    textAlign: 'center',
  },
  spacer: {
    flex: 1,
  },
  loginButton: {
    width: '100%',
    minHeight: height * 0.069, // Converted from 56px
    backgroundColor: '#285385', // Replace with actual btn_color from your theme
    borderRadius: 5,
    justifyContent: 'center',
    padding: width * 0.02, // Converted from 8px
    marginBottom: height * 0.031, // Converted from 25px
  },
  otherBenefitsButton: {
    width: '100%',
    minHeight: height * 0.069, // Converted from 56px
    backgroundColor: '#285385', // Replace with actual btn_color from your theme
    borderRadius: 5,
    justifyContent: 'center',
    padding: width * 0.02, // Converted from 8px
    marginBottom: height * 0.031, // Converted from 25px
  },
  contactButton: {
    width: '100%',
    minHeight: height * 0.069, // Converted from 56px
    backgroundColor: '#285385', // Replace with actual btn_color from your theme
    borderRadius: 5,
    justifyContent: 'center',
    padding: width * 0.02, // Converted from 8px
    marginBottom: height * 0.031, // Converted from 25px
  },
  buttonIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonIcon: {
    width: width * 0.06, // Converted from 24px
    height: width * 0.06, // Converted from 24px
    marginRight: width * 0.02, // Converted from 8px
  },
  buttonText: {
    fontFamily: 'lato_regular',
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    lineHeight: 20, // Approximating lineSpacingExtra of 2sp
  },
});

export default EligibilityResultScreen;