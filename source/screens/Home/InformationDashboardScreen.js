import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import store from "../../redux/store";
import styles from "../../styles/Home/InformationDashboardStyle";
import { useDispatch, useSelector } from "react-redux";
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { Linking } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogout } from '../../redux/actions/logoutActions';




// API Constants
const API_URL = 'https://sbwtest.gov.tt/wrapper/api/program';

const InfoDashItem = ({ program }) => {
  const navigation = useNavigation();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [friendlyState, setFriendlyState] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [visitOfficeDetails, setVisitOfficeDetails] = useState({
    address: '',
    reason: '',
  });


  const redeemBenefitsApiCall = async () => {

    const token = store.getState().authentication.authData?.access_token;
    const partnerId = await AsyncStorage.getItem("UserPartnerId");

    await AsyncStorage.setItem('UserProgramId', String(program.id)); // ✅ Fixed

    const requestBody = {
      partner_id: partnerId, // Adjust dynamically as needed
      program_id: program.id,
    };

    try {
      const response = await fetch(
        'https://sbwtest.gov.tt/wrapper/api/benifit/qr_code_item',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();

      // Navigate clearly to RedeemBenefitsScreen passing the API response
      navigation.navigate('RedeemBenefitsScreen', { apiData: data });

    } catch (error) {
      console.error("Error in redeemBenefitsApiCall:", error);
      alert('Failed to redeem benefits. Please try again later.');
    }
  };

  // Mapping object (no API call)
  const stateLabelMap = {
    officer_assigned: 'Officer Assigned',
    application_validation_in_process: 'Application Validation In Process',
    pending_verification: 'Pending Verification',
    enrolled: 'Approved',
    draft: 'Submitted',
  };



  const fetchDynamicReason = async (stateType) => {
    const endpoint =
      stateType === 'visit_office'
        ? 'https://sbwtest.gov.tt/wrapper/api/beneficiary/visit_reasons'
        : 'https://sbwtest.gov.tt/wrapper/api/beneficiary/rejected_reasons';

    const token = store.getState().authentication.authData?.access_token;
    const partnerId = await AsyncStorage.getItem("UserPartnerId");

    const requestBody = {
      beneficiary_id: partnerId,
      program_id: program.id,
    };

    try {
      setLoadingState(true);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();

      if (stateType === 'visit_office') {
        const visitData = data.data && data.data.length > 0 ? data.data[0] : {};
        setFriendlyState('Visit office');
        setVisitOfficeDetails({
          address: visitData.office_address || '',
          reason: visitData.visit_office_reason || '',
        });
      } else {
        const reason =
          data.data && data.data.length > 0
            ? data.data[0].rejection_reason
            : 'Rejected';
        setFriendlyState('Rejected');
        setRejectionReason(reason);
      }
    } catch (error) {
      console.error(`Error fetching ${stateType} reason:`, error);
      setFriendlyState(stateType === 'visit_office' ? 'Visit Office' : 'Rejected');
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    if (program.state === 'visit_office' || program.state === 'rejected') {
      fetchDynamicReason(program.state);
    } else {
      setFriendlyState(stateLabelMap[program.state] || program.state);
    }
  }, [program.state]);

  const handleRedeem = async () => {
    await redeemBenefitsApiCall();
    // navigation.navigate('GenerateQRCode');
  };

  const handleCheckEligibility = () => {
    navigation.navigate('InfoCheckEligibilityScreen', { programId: program.id });
  };

  // Determine the status color
  const getStatusColor = (state) => {
    switch (state) {
      case 'enrolled':
        return '#0E8345';
      case 'rejected':
        return 'transparent';
      case 'pending_verification':
        return '#0E8345';
      case 'application_validation_in_Process':
        return '#0E8345';
      default:
        return '#FDF2DC';
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.cardContent}>
          <Image
            source={{ uri: program.logo }}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.ministryText}>{program.ministry}</Text>

          <View style={styles.dividerLine} />

          <Text style={styles.titleText}>{program.name}</Text>

          {/* Description - Default: 3 Lines */}
          <Text
            style={styles.descriptionText}
            numberOfLines={showFullDescription ? undefined : 5}
            ellipsizeMode="tail"
          >
            {program.description ? program.description : "No description available."}
          </Text>


          <View style={styles.statusEligibilityContainer}>

            {program.state !== 'Not Applied' && (
              <View
                style={[
                  styles.statusContainer,
                  {
                    backgroundColor: getStatusColor(program.state),
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  },
                ]}
              >
                <Text style={styles.statusText}>
                  {loadingState ? 'Loading...' : friendlyState}
                </Text>

                {program.state === 'rejected' && rejectionReason ? (
                  <Text style={[styles.statusText, { marginTop: 5, fontSize: 13, color: 'red' }]}>
                    {rejectionReason}
                  </Text>
                ) : null}

                {program.state === 'visit_office' && visitOfficeDetails.reason ? (
                  <>
                    <Text
                      style={[
                        styles.statusText,
                        {
                          marginTop: 5,
                          fontSize: 13,
                          backgroundColor: 'transparent',
                          color: '#FF0000', // Hard red
                        },
                      ]}
                    >
                      {visitOfficeDetails.address}
                    </Text>

                    <Text
                      style={[
                        styles.statusText,
                        {
                          marginTop: 2,
                          fontSize: 13,
                          backgroundColor: 'transparent',
                          color: '#FF0000',
                        },
                      ]}
                    >
                      {visitOfficeDetails.reason}
                    </Text>

                  </>
                ) : null}
              </View>
            )}

            <View style={{ flex: 1, alignItems: "flex-end" }}>
              {program.state === 'enrolled' && (
                <TouchableOpacity onPress={handleRedeem}>
                  <Text style={styles.eligibilityText}>Redeem Benefits</Text>
                </TouchableOpacity>
              )}

              {program.state === 'Not Applied' && (
                <TouchableOpacity onPress={handleCheckEligibility}>
                  <Text style={styles.eligibilityText}>View Details</Text>
                </TouchableOpacity>
              )}
            </View>

          </View>
        </View>
      </View>
    </View>
  );
};

const fetchUserProfile = async (accessToken) => {
  try {
    const response = await fetch('https://sbwtest.gov.tt/wrapper/api/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Profile fetch failed: ${errorText}`);
    }

    const data = await response.json();

    // Save partner_id to local storage
    if (data?.partner_id) {
      await AsyncStorage.setItem('UserPartnerId', String(data.partner_id));
    }

    return data;

  } catch (error) {
    console.error("❌ Error fetching profile:", error.message);
    throw error;
  }
};

const InformationDashboardScreen = () => {
  const navigation = useNavigation();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  const { loading_profile, profile, profile_error } = useSelector(
    (state) => state.profileDetails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = store.getState().authentication.authData?.access_token;

        // 1️⃣ Fetch and store profile first
        await fetchUserProfile(token);

        // 2️⃣ Then fetch programs
        await fetchPrograms();

      } catch (error) {
        console.error("Error during initialization:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (profile) {

    }
  }, [profile]);

  const fetchPrograms = async () => {
    try {
      const state = store.getState();
      const token = state.authentication.authData?.access_token;

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data.data, "Data=====");

      setPrograms(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPrograms();
    setRefreshing(false);
  }, []);

  const handleLogout = async () => {
    dispatch(userLogout());
    navigation.navigate('LoginScreen');
  };

  const handleBellPress = async () => {
    try {
      const response = await fetch('https://sbwtest.gov.tt/wrapper/api/fcm/get-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'frontend_lang=en_US',
        },
        body: JSON.stringify({
          partner_id: '128',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data);

      // Navigate to a screen (replace this name with your actual screen)
      console.log("Navigating with notifications:", { notifications: data.data.notifications });

      navigation.navigate('NotificationsScreen', { notifications: data.data.notifications });

    } catch (error) {
      console.error('Error fetching notifications:', error);
      Alert.alert('Error', 'Failed to fetch notifications.');
    }
  };

  const handleHistory = async () => {
    setIsMenuOpen(false);
    try {
      const response = await fetch('https://sbwtest.gov.tt/wrapper/api/notifications/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'frontend_lang=en_US',
        },
        body: JSON.stringify({
          partner_id: '128',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data);

      // Navigate to a screen (replace this name with your actual screen)
      console.log("Navigating with history:", { history: data.data});

      navigation.navigate('HistoryScreen', { history: data.data });    

    } catch (error) {
      console.error('Error fetching history:', error);
      Alert.alert('Error', 'Failed to fetch history.');
    }
  };





  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <View style={styles.welcomeRow}>
          <Text style={styles.welcomeTitle}>
            Welcome {profile?.data?.given_name || "User"}
          </Text>
          <TouchableOpacity onPress={handleBellPress} style={{ marginLeft: 100 }}>
            <Feather name="bell" size={24} color="#143D6F" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
            <Feather name="menu" size={24} color="#143D6F" />
          </TouchableOpacity>
        </View>

        <Text style={styles.welcomeSubtitle}>
          Welcome to the Social Benefits Wallet of Trinidad and Tobago. We are proud to serve you.
        </Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            data={programs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <InfoDashItem program={item} />}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>

      <Modal visible={isMenuOpen} animationType="slide" transparent>
        <View style={styles.fullPageMenu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => {
            setIsMenuOpen(false);
            navigation.navigate("AboutBenefiTTScreen"); // 👈 Navigate here
          }}>
            <Text style={styles.menuText}>About Benefit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} disabled={true}>
            <Text style={[styles.menuText, { color: "#A9A9A9" }]}>Vendor Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setIsMenuOpen(false);
              Linking.openURL("https://mdt.gov.tt/digital-solutions-services/benefitt/terms/")
                .catch(err => console.error("Couldn't open link", err));
            }}
          >
            <Text style={styles.menuText}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setIsMenuOpen(false);
              Linking.openURL("https://mdt.gov.tt/digital-solutions-services/benefitt/policy/")
                .catch(err => console.error("Couldn't open link", err));
            }}
          >
            <Text style={styles.menuText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleHistory} style={styles.menuItem}>
            <Text style={styles.menuText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} disabled={true}>
            <Text style={[styles.menuText, { color: "#A9A9A9" }]}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setIsMenuOpen(false);
              Linking.openURL("tel:+1868-800-1673") // Replace with your desired phone number
                .catch(err => console.error("Could not open dialer", err));
            }}
          >
            <Text style={styles.menuText}>Contact Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => {
            setIsMenuOpen(false);
            handleLogout(); // 👈 Navigate here
          }}>
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsMenuOpen(false)} style={styles.closeIconContainer}>
            <Entypo name="cross" size={28} color="#143D6F" />
          </TouchableOpacity>

        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default InformationDashboardScreen;

