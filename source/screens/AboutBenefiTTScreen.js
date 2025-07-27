import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar
} from 'react-native';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const AboutBenefiTTScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require('../assets/images/eva_back.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* ScrollView for content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.contentContainer}>
          {/* Logo/Image */}
          <Image
            source={require('../assets/images/partnership--finance-partnership-team.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.title}>About BenefiTT</Text>

          {/* Description */}
          <Text style={styles.description}>
            The BenefiTT Wallet initiative aims to digitize the paper-based processes and streamline the distribution of social benefits across all government ministries, departments, and agencies to increase efficiency, accountability and transparency. This system supports personalized services, enabling MDAs to directly deposit benefits into each individual's wallet. The BenefiTT app facilitates direct transactions between beneficiaries and vendors, giving recipients the flexibility to choose their vendors and making the payment process faster and more efficient through digital methods.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    marginLeft: 14,
    marginTop: 14,
    padding: 6,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: 16,
    width: width,
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 16,
  },
  title: {
    marginTop: 24,
    fontFamily: 'poppins_bold',
    color: '#285385',
    fontSize: 24,
  },
  description: {
    marginTop: 16,
    fontFamily: 'lato_regular',
    letterSpacing: 0.32, // 0.02 * 16
    lineHeight: 22, // Base 16 + 6 line spacing
    color: 'black',
    fontSize: 16,
  },
});

export default AboutBenefiTTScreen;