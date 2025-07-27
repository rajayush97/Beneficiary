import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    paddingHorizontal: width * 0.04,
  },
  backButton: {
    minWidth: 20,
    minHeight: 20,
  },
  menuButton: {
    minWidth: 20,
    minHeight: 20,
  },
  welcomeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  
  welcomeTitle: {
    fontWeight: '600',
    fontSize: 24,
    color: '#285385',
    fontFamily: 'poppins_semiBold',
    fontWeight: 'bold',
    marginStart: width * 0.04,
    marginTop: height * 0.025,
  },
  welcomeSubtitle: {
    fontWeight: '400',
    fontSize: 12,
    color: '#777777',
    fontFamily: 'lato_regular',
    marginHorizontal: width * 0.04,
  },
  vendorIdText: {
    fontWeight: '400',
    fontSize: 12,
    color: '#000000',
    marginHorizontal: width * 0.04,
    marginTop: height * 0.025,
  },
  listContainer: {
    paddingHorizontal: width * 0.045,
    paddingTop: height * 0.03,
    paddingBottom: height * 0.025,
  },
  
  // InfoDashItem styles
  outerContainer: {
    backgroundColor: '#FFFFFF',
    padding: 0,
    marginBottom: height * 0.02,
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 15,
      },
    }),
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  cardContent: {
    padding: width * 0.035,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  logo: {
    width: width * 0.11,
    height: width * 0.11,
    minWidth: width * 0.11,
    minHeight: width * 0.11,
  },
  ministryText: {
    fontSize: 12,
    color: '#000000',
    fontFamily: 'lato_bold',
    fontWeight: 'bold',
    marginStart: width * 0.05,
    position: 'absolute',
    left: width * 0.14, // logo width + padding
    top: height * 0.035,
    maxWidth: '80%',
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: height * 0.012,
    width: '100%',
  },
  titleText: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'poppins_bold',
    fontWeight: 'bold',
    marginTop: height * 0.015,
  },
  descriptionText: {
    fontSize: 12,
    color: '#363636',
    fontFamily: 'lato_regular',
    fontWeight: '400',
    marginTop: height * 0.01,
    lineHeight: 18,
  },
  statusEligibilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.015,
    width: '100%',
  },
 
  statusText: {
    fontWeight: '600',
    fontSize: 12,
    fontFamily: 'lato_regular',
    color: '#000',
  },
  eligibilityText: {
    fontSize: 12,
    color: '#007AFF',
    fontFamily: 'lato_regular',
    fontWeight: '400',
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.025,
  },

  
 
  menuIcon: {
    width: 24,
    height: 24,
    marginTop:-45,
    tintColor: "#000",
  },

 
  
  closeButton: {
    alignSelf: "center",
    backgroundColor: "#143D6F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeIconContainer: {
    position: "absolute",
    top: 180,
    right: 20,
    padding: 10,
  },
  closeIcon: {
    width: 20,
    height: 20,
    tintColor: "#000",
  },
  fullPageMenu: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    marginTop: -120, // ✅ Adds spacing
  },
  menuItem: {
    width: "90%",
    padding: 15,
    borderBottomWidth: 0,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
    fontFamily: 'Lato',
    lineHeight: 18, // Reduce line height
  },
  logoutcon: {
    width: "90%",
    padding: 15,
    borderBottomWidth: 0,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    
  },
  loginIcon: {
    width: 20,
    height: 20,
    tintColor: "#143D6F",
  },
 
  
});

export default styles;
