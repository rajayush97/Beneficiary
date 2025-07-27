import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const GrantIntroScreen = () => {
  // Sample steps data - in a real app this would come from an API
  const steps = [
    {
      id: 1,
      title: "General Information",
      description: "Provide your contact details and basic information"
    },
    {
      id: 2,
      title: "Personal Information",
      description: "Enter details for all household members"
    },
    {
      id: 3,
      title: "Disaster Information",
      description: "Describe the disaster event and impact"
    },
    {
      id: 4,
      title: "Document Upload",
      description: "Upload supporting documentation"
    },
    {
      id: 5,
      title: "Declaration",
      description: "Sign the declaration of truth"
    }
  ];

  const handleBackPress = () => {
    console.log('Back button pressed');
  };

  const handleStartApplication = () => {
    console.log('Start application pressed');
  };

  const StepItem = ({ step, isLast }) => {
    return (
      <View style={styles.stepItemContainer}>
        <View style={styles.leftColumn}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>{step.id}</Text>
          </View>
          {!isLast && <View style={styles.stepLine} />}
        </View>
        
        <View style={styles.stepContentContainer}>
          <Text style={styles.stepTitle}>{step.title}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image 
            source={require('../assets/images/excalmatory.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        
        <Text style={styles.titleText}>Grant Application Process</Text>
        
        <Text style={styles.subtitleText}>
          To successfully submit your grant application, please complete each of the following steps in order
        </Text>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <StepItem 
              key={step.id} 
              step={step} 
              isLast={index === steps.length - 1} 
            />
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartApplication}
        >
          <Text style={styles.startButtonText}>Start Application</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    width: width,
    paddingBottom: height * 0.01,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    marginTop: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  titleText: {
    marginHorizontal: 24,
    marginTop: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#285385',
    fontFamily: 'poppins_semiBold',
  },
  subtitleText: {
    marginHorizontal: 24,
    marginTop: 16,
    fontSize: 14,
    color: '#1E1E1E',
    lineHeight: 15,
    fontFamily: 'lato_regular',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: height * 0.02,
  },
  stepsContainer: {
    marginHorizontal: 24,
    paddingTop: height * 0.01,
  },
  stepItemContainer: {
    flexDirection: 'row',
    marginBottom: height * 0.04,
  },
  leftColumn: {
    alignItems: 'center',
    width: 36,
    marginRight: 16,
  },
  stepNumberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#285385',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  stepNumber: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  stepLine: {
    position: 'absolute',
    width: 2,
    backgroundColor: '#285385',
    top: 36, // Start from the bottom of the circle
    bottom: -height * 0.04, // Extend below to connect with the next circle
    zIndex: 0,
  },
  stepContentContainer: {
    flex: 1,
    paddingRight: 16,
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#285385',
  },
  footerContainer: {
    width: width,
    paddingTop: height * 0.01,
  },
  startButton: {
    backgroundColor: '#1E4B94',
    borderRadius: 8,
    height: 56,
    marginHorizontal: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Lato-Regular',
  },
});

export default GrantIntroScreen;