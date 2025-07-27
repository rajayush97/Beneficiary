import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const InformationPortalScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://sbwtest.gov.tt/wrapper/api/programs');
        const data = await response.json();
        setPrograms(data.data); // Assuming data is an array
      } catch (err) {
        setError('Failed to load programs.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const truncateDescription = (description, maxLength = 660) => {
    if (!description || typeof description !== "string") return "No description available.";
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  const renderProgramCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: item.logo }} style={styles.logo} />
        <Text style={styles.ministryName}>{item.ministry}</Text>
      </View>
      <View style={styles.line}></View>
      <Text style={styles.programName}>{item.name}</Text>
      <Text style={styles.description}>{truncateDescription(item.description)}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('ReliefGrantScreen', { programData: item })}>
        <Text style={styles.viewDetails}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
          onPress={() => {
            navigation.goBack();

          }}
          style={styles.backButton}
        >
          <Image source={require("../assets/images/eva_back.png")} style={styles.backIcon} />
        </TouchableOpacity>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Explore the offerings of BenefiTT here!</Text>
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={programs}
          renderItem={renderProgramCard}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

export default InformationPortalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
    marginTop: 40,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
    marginBottom: 40,
    marginLeft: 10,
  },
  loading: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
  error: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    width: width * 0.85,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#DFDFDF',
    width: width * 0.8,
    marginVertical: 10,
    alignSelf: 'center',
  },
  logo: {
    width: width * 0.15,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  ministryName: {
    width: width * 0.6,
    fontSize: 16,
    fontWeight: "600",
    color: "#003366",
  },
  programName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  viewDetails: {
    fontSize: 14,
    color: "#0056b3",
    fontWeight: "bold",
    textAlign: "right",
  },
});
