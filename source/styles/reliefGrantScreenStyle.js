import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "600",
    marginTop: 40,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: "black",
    marginLeft: -5,
  },
  headingTitle: {
    textAlign: "center",
    fontFamily: "Poppins",
    color: "#285385",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
  },
  descriptionContainer: {
    textAlign: "center",
    paddingVertical: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  description: {
    fontFamily: "Lato",
    color: "#717182",
    fontSize: 14,
    lineHeight: 22,
  },
  showButton: {
    fontFamily: "Lato",
    color: "#005DB1",
    textAlign: "right",
    marginTop: 5,
    fontWeight: "bold",
  },
  grantsContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
  },
  

  grantItem: {
    fontSize: 14,
    color: "#000",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  grantsExpanded: {
    maxHeight: 220,
    minHeight: 100,
  },
  grantsCollapsed: {
    maxHeight: 340,
    minHeight: 100,
  },

  sheetHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#285385',
  },
  sheetLine: {
    height: 1,
    backgroundColor: '#ddd',
    width: '100%',
    marginBottom: 15,
  },
  sheetText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginHorizontal: 20,
  },
  sheetItemDetail: {
    fontSize: 26,
    textAlign: 'center',
    color: '#555',
    marginHorizontal: 20,
  },
  sheetButton: {
    backgroundColor: '#285385',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  sheetButtonText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },

  benefitHeading: {
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
  },
  
  benefitListContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  
  benefitItem: {
    flexDirection: "row", // Bullet and text in one line
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  
  bulletPoint: {
    fontSize: 18,
    color: "#285385",
    marginRight: 8,
  },
  
  benefitTextContainer: {
    flexDirection: "column",
    flexShrink: 1, // Ensures text wraps properly
  },
  
  benefitTitle: {
    fontSize: 14,
    color: "#000",
  },
  
  benefitPrice: {
    fontSize: 14,
    color: "#717182",
    marginTop: 3,
  },
  
  
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "#717182",
    paddingVertical: 10,
  },


  buttonContainer: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 }, // Shadow at the top for elevation effect
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Adds a raised effect
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
  },
  
  disclaimerContainer: {
    padding: 5,
    marginBottom: 10,
  },
  
  disclaimerText: {
    fontSize: 14,
    color: "#717182",
    textAlign: "left",
    fontStyle: "italic",
    marginLeft:5
  },
  
  AddItemButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#285385",
    borderRadius: 10,
    padding: 15,
  },
  
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  
});

export default styles;
