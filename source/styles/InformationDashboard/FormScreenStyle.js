import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
    padding: 8,
  },

  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#333', // Optional: change based on your theme
  },
  introContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingVertical: 50,
  },

  introHeader: {
    alignItems: "flex-start",
    marginBottom: 20,
  },

  introTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#285385',
    textAlign: "left",
  },

  introSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "left",
    marginTop: 20,
    paddingRight: 16,
  },

  introStepsContainer: {
    marginTop: 10,
    marginHorizontal: 16,
  },
  reviewStepsContainer: {
    marginTop: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderColor: '#285385',
  },
  
  reviewButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#285385",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  reviewButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  progressPoint: {
    alignItems: 'center',
    marginRight: 10,
  },
  progressIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#285385',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  verticalLine: {
    width: 2,
    height: 50,
    backgroundColor: '#285385',
    marginBottom: -18,
  },

  verticalLineReview: {
    height: 140, // increase height for review mode
  },

  introStep: {
    flexDirection: "row",   // ✅ keep row here for indicator + content
    alignItems: "flex-start",  // ensure top-alignment
    marginBottom: 16,
    gap: -12, 
  },
  
  stepContentWrapper: {
    flex: 1,
    flexDirection: "column",
    paddingRight: 4,
  }, 

  introStepLabel: {
    fontSize: 18,
    color: "#285385",
    marginBottom: 6,
    flexShrink: 1,        
    flexWrap: "wrap",     
  },
  subHeadingScrollView: {
    maxHeight: 80, 
    marginTop: 4,
    marginBottom: 6,
  },
  introStepSubLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 10,
  },
  
  footerButtonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 16,
    right: 16,
  },
  startButton: {
    paddingVertical: 15,
    paddingHorizontal: 24,
    backgroundColor: "#285385",
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  reviewButton: {
    marginTop: 6,
    marginBottom: 10, // added bottom margin
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#285385",
    borderRadius: 8,
    alignSelf: "flex-start", // keeps it aligned to the left
  },

  reviewButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  //Form CSS

  flexContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  panel: {
    marginTop: 40,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 12,
    elevation: 2,
  },
  panelHeader: {
    backgroundColor: '#f3f3f3',
    padding: 20,
    marginHorizontal: -22,
    marginTop: -10,
    marginBottom: 16,
  },

  panelTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#285385",
  },
  panelSubtitle: {
    fontSize: 14,
    marginBottom: 16,
    color: "#666",
  },

  //Form CSS fields

  formFieldContainer: {
    marginBottom: 20,
  },

  formFieldLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },

  validationError: {
    color: "red",
    fontSize: 12,
    marginTop: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#fff",
    minHeight: 50,
  },

  dropdownStyle: {
    width: "100%",
    marginTop: 8,
    backgroundColor: "#e2e2e2",  
    borderWidth: 1,
    borderColor: "#ccc",       
    borderRadius: 6,
    height: 48,                 
    justifyContent: "center",
  },

  dropdownText: {
    fontSize: 16,
    color: "#5e5e5e",         
  },

  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    height: 48,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  dropdownIcon: {
    fontSize: 16,
    color: "#e2e2e2",
    marginLeft: 8,
  },

  dropdownMenu: {
    width: width - 45,          
    maxHeight: 200,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 8,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  
  dropdownItemSelected: {
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },  

  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 5,
    backgroundColor: "#fff",
  },
  
  button: {
    backgroundColor: "#285385",     
    paddingVertical: 14,               
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 3,                
  },
  
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",                
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },

  uploadInfoBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  
  uploadInfoIcon: {
    fontSize: 28,
    marginBottom: 24,
    color: "#285385",
  },
  
  uploadInfoText: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginTop: 2,
  },
  
  
  uploadContainer: {
    marginBottom: 24,
  },
  
  uploadHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  
  uploadBox: {
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  uploadBoxSuccess: {
    borderColor: "green",
    borderWidth: 1,
  },
  
  uploadRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  uploadFileIcon: {
    fontSize: 20,
    color: "#999",
    marginRight: 10,
  },
  
  uploadFileText: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  
  uploadArrow: {
    fontSize: 18,
    color: "#285385",
  },

  uploadArrowSuccess: {
    fontSize: 18,
    color: "green",
  },

  deleteButton: {
    position: 'absolute',
    top: 20,
    right: 45,
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 4,
    zIndex: 1,
    elevation: 2,
  },
  

  declarationText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    color: "#333",
  },
  declarationHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 14,
    color: "#285385",
  },
  declarationWarningText: {
    textAlign: "center",
    justifyContent: "center", 
    fontWeight: "500",
    fontSize: 18,
    color: "#333",
    marginVertical: 20, 
    marginBottom: 50
  },
  
  declarationIcon: {
    fontSize: 40,
    marginTop:20,
    textAlign: 'center',
    marginVertical: 10,
    transform: [{ rotate: '180deg' }],
  },
  declarationBox: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  declarationSubHeading: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  declarationCheckBoxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingLeft: 0,
  },
  
  declarationCheckBoxText: {
    fontWeight: "700",
    fontSize: 18,
    color: "#333", 
  },
  
  //select box

  selectBoxLabel: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
  },
  
  selectBoxGroup: {
    gap: 0, // Use `rowGap` if your React Native version doesn’t support `gap`
  },
  
  selectBoxItem: {
    width: '100%',
    alignSelf: 'center', // ✅ centers the box horizontally
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  
  
  selectBoxItemText: {
    fontWeight: "500",
    fontSize: 15,
  },
  
  validationErrorText: {
    color: "red",
    fontSize: 13,
    marginTop: 8,
  },
  
  
  
































  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    paddingVertical: 24,
    alignItems: "center",
    backgroundColor: "yellow",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 16,
  },
  progressChart: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  progressStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  errorContainer: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
    fontSize: 16,
  },

  progressChart: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  


});

export default styles;
