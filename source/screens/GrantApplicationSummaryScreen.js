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

const GrantApplicationSummaryScreen = () => {
  const summarySteps = [
    {
      id: 1,
      title: "General Information",
      description: "You've provided your contact information, including email, number of household members, address, and city/town.",
      panelKey: "panel"
    },
    {
      id: 2,
      title: "Provide Personal Information for Each Household Member",
      description: "You've provided personal information for all household members.",
      panelKey: "personalInformation"
    },
    {
      id: 3,
      title: "Describe the Disaster",
      description: "You've detailed the disaster.",
      panelKey: "disasterInformation"
    },
    {
      id: 4,
      title: "Upload Supporting Documents",
      description: "You've uploaded the required supporting documents.",
      panelKey: "documentUpload"
    },
    {
      id: 5,
      title: "Sign the Declaration of Truth",
      description: "You've signed the declaration confirming all information is true and accurate.",
      panelKey: "declaration"
    },
    {
      id: 6,
      title: "Submit Your Application",
      description: "Review and finalize your application before submission.",
      panelKey: "submission"
    }
  ];

  const handleReviewClick = (step) => {
    console.log('Review clicked for step:', step.title);
  };

  const handleBackPress = () => {
    console.log('Back button pressed');
  };

  const handleSubmitApplication = () => {
    console.log('Submit application pressed');
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
          <Text style={styles.stepDescription}>{step.description}</Text>
          
          <TouchableOpacity
            style={styles.reviewButton}
            onPress={() => handleReviewClick(step)}
          >
            <Text style={styles.reviewButtonText}>Review</Text>
          </TouchableOpacity>
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
        
        <Text style={styles.titleText}>Grant Application Summary</Text>
        
        <Text style={styles.subtitleText}>
          Before submitting your application, please review each section by clicking the 'Review' button to ensure all information is correct
        </Text>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.stepsContainer}>
          {summarySteps.map((step, index) => (
            <StepItem 
              key={step.id} 
              step={step} 
              isLast={index === summarySteps.length - 1} 
            />
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitApplication}
        >
          <Text style={styles.submitButtonText}>Submit Application</Text>
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
    width: width * 0.12,
    height: width * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.04,
    marginTop: height * 0.01,
  },
  backIcon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  titleText: {
    marginHorizontal: width * 0.06,
    marginTop: height * 0.01,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'poppins_bold',
    color: '#1E4B94',
  },
  subtitleText: {
    marginHorizontal: width * 0.06,
    marginTop: height * 0.01,
    fontSize: 14,
    color: '#1E1E1E',
    lineHeight: 15,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: height * 0.02,
  },
  stepsContainer: {
    marginHorizontal: width * 0.06,
    paddingTop: height * 0.01,
  },
  stepItemContainer: {
    flexDirection: 'row',
    marginBottom: height * 0.02,
  },
  leftColumn: {
    alignItems: 'center',
    width: 36,
    marginRight: width * 0.04,
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
    top: 36,
    bottom: -height * 0.02,
    zIndex: 0,
  },
  stepContentContainer: {
    flex: 1,
    paddingRight: width * 0.02,
    paddingBottom: height * 0.01,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#285385',
    marginBottom: height * 0.005,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: height * 0.015,
  },
  reviewButton: {
    backgroundColor: '#285385',
    borderWidth: 1,
    borderColor: '#285385',
    borderRadius: width * 0.02,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    alignSelf: 'flex-start',
  },
  reviewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  footerContainer: {
    width: width,
    paddingTop: height * 0.01,
  },
  submitButton: {
    backgroundColor: '#285385',
    borderRadius: width * 0.02,
    height: height * 0.07,
    marginHorizontal: width * 0.04,
    marginBottom: height * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default GrantApplicationSummaryScreen;