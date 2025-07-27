import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

// Get window dimensions
const { width, height } = Dimensions.get('window');

const MenuScreen = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleClose = () => {
    setIsMenuOpen(false);
    // You might want to navigate back or close the menu here
    // navigation.goBack();
  };

  const handleMenuItemPress = (itemId) => {
    // Handle navigation to different screens based on menu item
    switch (itemId) {
      case 'nav_about':
        navigation.navigate('AboutBenefiTTScreen');
        break;
      case 'nav_vendor_locations':
        navigation.navigate('TermsOfServiceScreen');
        break;
      case 'nav_terms_conditions':
        Linking.openURL("https://mdt.gov.tt/digital-solutions-services/benefitt/terms/")
          .catch(err => console.error("Couldn't open Terms of Service link", err));
        break;
      case 'nav_privacy_policy':
        Linking.openURL("https://mdt.gov.tt/digital-solutions-services/benefitt/policy/")
          .catch(err => console.error("Couldn't open Privacy Policy link", err));
        break;
      case 'nav_help':
        // navigation.navigate('Help');
        break;
      case 'nav_contact_us':
        // navigation.navigate('ContactUs');
        break;
      case 'nav_login':
        // navigation.navigate('Login');
        break;
      default:
        break;
    }
  };

  // Menu items from the nav_menu.xml
  const menuItems = [
    {
      id: 'nav_about',
      title: 'About BenefiTT',
    },
    {
      id: 'nav_vendor_locations',
      title: 'Vendor Locations',
    },
    {
      id: 'nav_terms_conditions',
      title: 'Terms of Service',
    },
    {
      id: 'nav_privacy_policy',
      title: 'Privacy Policy',
    },
    {
      id: 'nav_help',
      title: 'Help',
    },
    {
      id: 'nav_contact_us',
      title: 'Contact Us',
    },
  ];

  // Special login item with icon
  const loginItem = {
    id: 'nav_login',
    title: 'Logout',
    icon: require('../assets/images/Wave-2X.png'),
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.header}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Image
            source={require('../assets/images/Wave-2X.png')}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        {/* Regular menu items */}
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuItemPress(item.id)}
          >
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        {/* Login item with icon */}
        <TouchableOpacity
          style={styles.loginItem}
          onPress={() => handleMenuItemPress(loginItem.id)}
        >
          <Image source={loginItem.icon} style={styles.loginIcon} />
          <Text style={styles.loginText}>{loginItem.title}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: width * 0.078, // Converted from 31px
    paddingTop: height * 0.035, // Converted from 28px
    paddingBottom: height * 0.023, // Converted from 19px
  },
  closeButton: {
    padding: width * 0.013, // Converted from 5px
  },
  closeIcon: {
    width: width * 0.06, // Converted from 24px
    height: width * 0.06, // Converted from 24px
    resizeMode: 'contain',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: width * 0.05, // Converted from 20px
  },
  menuItem: {
    paddingVertical: height * 0.019, // Converted from 15px
  },
  menuItemText: {
    fontSize: 16,
    color: '#000000',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: height * 0.019, // Converted from 15px
  },
  loginItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.019, // Converted from 15px
  },
  loginIcon: {
    width: width * 0.053, // Converted from 21px
    height: width * 0.06, // Converted from 24px
    resizeMode: 'contain',
    marginRight: width * 0.025, // Converted from 10px
  },
  loginText: {
    fontSize: 16,
    color: '#000000',
  },
});

export default MenuScreen;