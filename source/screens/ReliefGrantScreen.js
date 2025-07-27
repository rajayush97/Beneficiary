import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/reliefGrantScreenStyle';
import BottomSheet from '../components/BottomSheet';

const ReliefGrantScreen = ({ navigation, route }) => {
  const { programData } = route.params;
  console.log("In ReliefGrantScreen", programData);
  const [benefitItems, setBenefitItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isSheetVisible, setSheetVisible] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchBenefitItems = async () => {
      try {
        const response = await fetch('https://sbwtest.gov.tt/wrapper/api/benefit_item/list/1', {
          method: 'GET',
        });
        const result = await response.json();
        setBenefitItems(result.data);
      } catch (error) {
        console.error('Error fetching benefit items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBenefitItems();
  }, []);


  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require("../assets/images/eva_back.png")} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.headingTitle}>{programData.name}</Text>

      {/* Description */}
      <ScrollView>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            {programData.description
              ? (showFullDescription
                ? programData.description
                : `${programData.description.substring(0, 130)}...`)
              : "No description available."}
          </Text>
        </View>


        <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
          <Text style={styles.showButton}>
            {showFullDescription ? "Show less" : "Show more"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.benefitHeading}>Applicants may receive</Text>

        <View style={styles.benefitListContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            benefitItems.length > 0 ? (
              benefitItems.map((item, index) => (
                <View key={index} style={styles.benefitItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <View style={styles.benefitTextContainer}>
                    <Text style={styles.benefitTitle}>
                      {item.name?.en_US || "No Name Available"}
                    </Text>
                    <Text style={styles.benefitPrice}>Up to TT${item.listprice || "N/A"}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>No benefits available.</Text>
            )
          )}
        </View>


      </ScrollView>

      {/* Add Item Button - Inside White Background Container */}
      <View style={styles.buttonContainer}>

        {/* Disclaimer Section */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>
          Disclaimer: Applicants may receive maximum of TT$ 10,000.00 for household items as part of this grant.
          </Text>
        </View>

        {/* Check Eligibility Button */}
        <TouchableOpacity style={styles.AddItemButton} onPress={() => navigation.navigate('CheckEligibilityScreen')}>
          <Text style={styles.buttonText}>Check Eligibility</Text>
        </TouchableOpacity>

      </View>


      <BottomSheet visible={isSheetVisible} onClose={() => setSheetVisible(false)}>
        <Text style={styles.sheetHeading}>Scan QR Code</Text>

        <View style={styles.sheetLine} />

        <Text style={styles.sheetText}>
          Please scan the item QR code to verify the beneficiary & item.
        </Text>

        <Text style={styles.sheetText}>Item Name: </Text>

        <TouchableOpacity style={styles.sheetButton} onPress={() => { setSheetVisible(false); navigation.navigate('Scan'); }}>
          <MaterialCommunityIcons name="camera" style={styles.sheetButtonText} />
        </TouchableOpacity>
      </BottomSheet>
    </View>
  );
};

export default ReliefGrantScreen;
