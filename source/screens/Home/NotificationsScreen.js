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

export default function NotificationsScreen({ route }) {
  const navigation = useNavigation();
  const { notifications = [] } = route.params || {};

  const renderItem = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.title}>{item.title || 'Notification'}</Text>
      <Text style={styles.message}>{item.message || 'No message provided.'}</Text>
      {/* <Text style={styles.create_date}>{item.create_date || 'No date provided.'}</Text> */}
    </View>
  );

  const clearNotifications = async () => {
    try {
      const response = await fetch('https://sbwtest.gov.tt/wrapper/api/notifications/clear', {
        method: 'DELETE',
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

      Alert.alert('Success', 'Notifications cleared.');
      // Optionally update screen state or go back
      navigation.goBack();
    } catch (error) {
      console.error('Error clearing notifications:', error);
      Alert.alert('Error', 'Failed to clear notifications.');
    }
  };

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
        <Text style={styles.headerTitle}>Notifications</Text>


      </View>
        {/* Full-width underline */}
        <View style={styles.underline} />

      {notifications.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearNotifications}
          activeOpacity={0.7}
        >
          <Text style={styles.clearText}>clear</Text>
        </TouchableOpacity>
      )}

      {notifications.length === 0 ? (
        <Text style={styles.emptyText}>No notifications available.</Text>
      ) : (
        <FlatList
          data={notifications}
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
    padding: 20,
  },
  clearButton: {
    marginLeft: 'auto',
    padding: 10,
  },
  clearText: {
    fontSize: 14,
    color: '#000000',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
  },
  backButton: {
    borderRadius: 8,
  },
  backIcon: {
    width: 22,
    height: 22,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#144184',
    alignSelf: 'center',
    paddingLeft: 20,
  },
  underline: {
    height: 2,
    backgroundColor: '#AFAFAF', // underline color (match your theme)
    width: '100%',
    marginTop: 17,
    padding: 0
  },
  notificationCard: {
    backgroundColor: '#144184',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#ffffff',
  },
  message: {
    fontSize: 12,
    color: '#ffffff',
  },
  create_date: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
    color: '#ffffff',
  },
  emptyText: {
    marginTop: 40,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
