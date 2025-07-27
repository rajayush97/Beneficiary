import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
// Get window dimensions
const { width, height } = Dimensions.get('window');

// Item component for the list (represents rate_list_items.xml)
const RateListItem = ({ item }) => {
  return (
    <View style={styles.listItemContainer}>
      <View style={styles.line} />
      <View style={styles.itemContentContainer}>
      <Entypo
          name="dot-single"
          size={24}
          color="#000"
          style={styles.bulletIcon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.itemText} numberOfLines={3} ellipsizeMode="tail">
            {item.text1}
          </Text>
          <Text style={styles.itemPrice}>{item.text2}</Text>
        </View>
      </View>
    </View>
  );
};

const InfoCheckEligibilityScreen = ({ navigation, route }) => {
  const { programId } = route.params;
  const [expanded, setExpanded] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [benefitItems, setBenefitItems] = useState([]);
  const [currentProgram, setCurrentProgram] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch all programs
        const programResponse = await axios.get(
          'https://sbwtest.gov.tt/wrapper/api/programs',
          {
            headers: {
              Cookie: 'frontend_lang=en_US',
            },
          }
        );
        const allPrograms = programResponse.data.data || [];
        setPrograms(allPrograms);

        // 2. Find program by ID and set it
        const matchedProgram = allPrograms.find(p => p.id === Number(programId));
        setCurrentProgram(matchedProgram);

        // 3. Fetch benefit items for that program
        const benefitItemResponse = await axios.get(
          `https://sbwtest.gov.tt/wrapper/api/benefit_item/list/${programId}`,
          {
            headers: {
              Cookie: 'frontend_lang=en_US',
            },
          }
        );
        const rawItems = benefitItemResponse.data.data || [];

        // 🔁 Transform items to your UI structure
        const mappedItems = rawItems.map((item, index) => ({
          id: (index + 1).toString(),
          text1: item?.name?.en_US || 'Item', // ← updated here
          text2: `Up to TT$${parseFloat(item?.listprice || 0).toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}`,
        }));


        setBenefitItems(mappedItems);
      } catch (error) {
        console.error('API error:', error);
      }
    };

    fetchData();
  }, [programId]);


  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require('../assets/images/eva_back.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{currentProgram?.name || 'Program Details'}</Text>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
        scrollIndicatorInsets={{ right: 1 }}
      >
        <View style={styles.contentContainer}>
          {/* Description text with read more option */}
          <Text
            style={styles.descriptionText}
            numberOfLines={expanded ? null : 3}
          >
            {currentProgram?.description || 'Loading program description...'}
          </Text>


          <TouchableOpacity onPress={toggleExpand}>
            <Text style={styles.readMoreText}>
              {expanded ? 'Show less' : 'Show more'}
            </Text>
          </TouchableOpacity>

          {/* Status buttons */}
          <View style={styles.statusButtonsContainer}>
            <TouchableOpacity style={styles.nationalIdButton}>
              <Entypo
                name="check"
                size={10}
                color="#0E8345"
                style={styles.bulletIconCheck}
              />
              <Text style={styles.nationalIdText}>National ID</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.evidenceButton}>
              <Text style={styles.evidenceText}>Evidence of loss</Text>
            </TouchableOpacity>
          </View>

          {/* Indicative text */}
          <Text style={styles.indicativeText}>
            Applicants may receive:
          </Text>

          {/* List items */}
          <FlatList
            data={benefitItems}
            renderItem={({ item }) => <RateListItem item={item} />}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            style={styles.listContainer}
          />
        </View>
      </ScrollView>

      {/* Disclaimer text */}
      <Text style={styles.disclaimerText}>
        Disclaimer: Applicants may receive maximum of TT$ 10,000.00 for household items as part of this grant.
      </Text>

      {/* Check eligibility button */}
      <TouchableOpacity
        style={styles.checkEligibilityButton}
        onPress={() => navigation.navigate('CheckEligibilityForID', { programId })}
      >
        <Text style={styles.buttonText}>Check Eligibility</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    padding: width * 0.035,
    alignSelf: 'flex-start',
  },
  backIcon: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#285385', // equivalent to btn_color
    marginHorizontal: width * 0.05,
    marginTop: height * 0.012,
    fontFamily: 'poppins_bold',
  },
  scrollView: {
    flex: 1,
    marginHorizontal: width * 0.035,
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
  },
  contentContainer: {
    paddingRight: width * 0.02,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 19,
    color: '#363636',
    fontFamily: 'lato_regular',
    marginTop: height * 0.005,
  },
  readMoreText: {
    fontSize: 12,
    color: '#005DB1',
    textAlign: 'right',
    marginTop: height * 0.005,
  },
  statusButtonsContainer: {
    marginTop: height * 0.02,
    flexDirection: 'row'
  },
  nationalIdButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D8F0D4',
    borderRadius: 12,
    paddingVertical: height * 0.01,
    paddingLeft: width * 0.02,
    paddingRight: width * 0.038,
    alignSelf: 'flex-start',
    height: height * 0.035,
  },
  checkIcon: {
    width: width * 0.025,
    height: width * 0.025,
    marginRight: width * 0.022,
    tintColor: '#4CAF50', // green color
  },
  nationalIdText: {
    fontSize: 12,
    color: '#0E8345', // green color
    fontFamily: 'lato_regular',
  },
  evidenceButton: {
    backgroundColor: '#FDF2DC',
    borderRadius: 12,
    paddingVertical: height * 0.01,
    marginLeft: width * 0.02,
    paddingHorizontal: width * 0.038,
    alignSelf: 'flex-start',
    height: height * 0.035,
  },
  evidenceText: {
    fontSize: 12,
    color: '#655322',
    fontFamily: 'lato_regular',
  },
  indicativeText: {
    fontSize: 14,
    lineHeight: 19,
    color: '#363636',
    marginTop: height * 0.02,
    fontFamily: 'lato_regular',
  },
  listContainer: {
    marginTop: height * 0.025,
  },
  listItemContainer: {
    width: '100%',
    backgroundColor: 'white',
  },
  line: {
    height: 1,
    backgroundColor: '#E0E0E0', // line_clr
    width: '100%',
  },
  itemContentContainer: {
    flexDirection: 'row',
    paddingVertical: height * 0.006,
  },
  bulletIcon: {
    marginLeft: width * 0.03,
    alignSelf: 'center',
  },
  bulletIconCheck:{
    marginLeft: width * 0.01,
    marginRight: width * 0.01,
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: width * 0.06,
  },
  itemText: {
    fontSize: 14,
    lineHeight: 21,
    color: 'black',
    marginRight: width * 0.03,
    fontFamily: 'lato_regular',
  },
  itemPrice: {
    fontSize: 14,
    lineHeight: 21,
    color: '#797979',
    fontFamily: 'lato_regular',
    marginTop: height * 0.002,
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 19,
    color: '#363636',
    marginHorizontal: width * 0.06,
    marginTop: height * 0.015,
    fontFamily: 'lato_regular',
  },
  checkEligibilityButton: {
    backgroundColor: '#285385', // btn_color
    borderRadius: 5,
    marginHorizontal: width * 0.06,
    marginTop: height * 0.01,
    marginBottom: height * 0.03,
    minHeight: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.02,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'lato_regular',
  },
});

export default InfoCheckEligibilityScreen;