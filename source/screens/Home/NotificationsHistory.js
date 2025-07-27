import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HistoryScreen({ route }) {
  const navigation = useNavigation();
  const { history = [] } = route.params || {};
  console.log('Received history:', history);



  const renderItem = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.state}>{item.state || 'History'}</Text>
      <Text style={styles.program_name}>{item.program_name || 'No message provided.'}</Text>
      {/* <Text style={styles.create_date}>{item.create_date || 'No date provided.'}</Text> */}
      {/* Full-width underline */}
      <View style={styles.underline} />
    </View>
  );


  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Image
            source={require('../../assets/images/eva_back.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>History</Text>

      {history.length === 0 ? (
        <Text style={styles.emptyText}>No history available.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      )}
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
    padding: 20,

  },
  underline: {
    height: 2,
    backgroundColor: '#AFAFAF', // underline color (match your theme)
    width: '100%',
    marginTop:5,
    marginBottom:10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    // paddingBottom: 10,
  },
  backButton: {
    padding: 10,
    borderRadius: 8,
  },
  backIcon: {
    width: 22,
    height: 22,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#144184',
    alignSelf: 'flex-start',
    marginVertical: 10,
    left:10
  },
  state: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#363636',
  },
  program_name: {
    fontSize: 12,
    color: '#333',
    marginBottom:10
  },
  emptyText: {
    marginTop: 40,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
