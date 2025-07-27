import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import styles from "../styles/RedeemBenefitsScreen/RedeemBenefitsStyle";

const RedeemBenefitsScreen = ({ navigation, route }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Extract received data clearly
  const apiData = route.params?.apiData;

  // Transform apiData clearly into flatlist-friendly format
  const benefitItems = apiData?.data?.map((item, index) => ({
    id: `${index}-${item.product_id}`, // ensure unique ID
    title: item.name.en_US,
    amount: `Up to TT$${item.total_amount}`,
    qrCode: item.code, // you might need this later
    productId: item.product_id,
    cycleId: item.cycle_id,
    templateId: item.template_id,
    transaction: item.transaction
  })) || [];

  const handleBackPress = () => {
    // Navigate back or handle back button action
    navigation.goBack();
  };

  const handleItemSelect = (item) => {
    navigation.navigate('RedemptionStepScreen', { selectedItem: item });
  };


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleItemSelect(item)}
      >
        <View style={styles.itemInnerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle} numberOfLines={3} ellipsizeMode="tail">
              {item.title}
            </Text>
            <Text style={styles.itemAmount}>
              {item.amount}
            </Text>
          </View>
          <Image
            source={require('../assets/images/qr.png')}
            style={styles.qrIcon}
          />
        </View>
        <View style={styles.itemDivider} />
      </TouchableOpacity>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Image
          source={require('../assets/images/eva_back.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Header section */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/badge-check.png')}
          style={styles.badgeIcon}
        />
        <Text style={styles.headerTitle}>
          Disaster Relief Grant
        </Text>
      </View>

      {/* Approved button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.approvedButton}>
          <Text style={styles.approvedButtonText}>Benefit Approved</Text>
        </TouchableOpacity>
      </View>

      {/* Instruction text */}
      <Text style={styles.instructionText}>
        Please select one item to redeem benefits:
      </Text>

      {/* List of benefit items */}
      <FlatList
        data={benefitItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

export default RedeemBenefitsScreen;