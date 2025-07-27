import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');// Ensure this file exports width & height if used.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: width * 0.04,
  },
  headerIcon: {
    width: width * 0.05,
    height: width * 0.05,
  },
  title: {
    fontSize: 24,
    fontFamily: 'poppins_semiBold',
    fontWeight: 'bold',
    color: '#285385',
    marginLeft: width * 0.04,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'lato_regular',
    color: '#777777',
    marginHorizontal: width * 0.04,
    marginTop: height * 0.01,
  },
  staticContent: {
    paddingHorizontal: width * 0.04,
  },
  scrollView: {
    flex: 1,
    marginTop: height * 0.02,
    marginRight: width * 0.01,
  },
  scrollContent: {
    paddingHorizontal: width * 0.04,
    paddingBottom: height * 0.02,
  },
  questionContainer: {
    marginTop: height * 0.02,
  },
  questionBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: width * 0.04,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'lato_regular',
    color: 'black',
    lineHeight: 21,
    marginRight: width * 0.02,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width * 0.02,
  },
  radioLabel: {
    fontSize: 14,
    fontFamily: 'lato_regular',
    marginLeft: width * 0.01,
    color: 'black',
  },

  radioGroup: {
   flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  
  radioButton: {
    borderWidth: 0,
    padding: 0, 
    margin: 0,
    marginLeft: 10, 
  },
  
  radioText: {
    fontSize: 16,
    fontFamily: 'lato_regular',
    color: '#333333',
    marginLeft: 5, 
  },

  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.014,
    marginLeft: width * 0.02,
  },
  errorIcon: {
    width: width * 0.04,
    height: width * 0.04,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'lato_regular',
    color: '#DE1135',
    marginLeft: width * 0.02,
  },
  noteText: {
    fontSize: 12,
    fontFamily: 'lato_regular',
    color: '#777777',
    marginHorizontal: width * 0.04,
    marginTop: height * 0.01,
  },
  button: {
    marginHorizontal: width * 0.04,
    marginTop: height * 0.03,
    height: height * 0.07,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButton: {
    backgroundColor: '#F3F3F3',
  },
  checkButtonText: {
    fontSize: 18,
    fontFamily: 'lato_regular',
    color: '#A6A6A6',
  },
  clearButton: {
    backgroundColor: '#285385',
    marginBottom: height * 0.03,
  },
  clearButtonText: {
    fontSize: 18,
    fontFamily: 'lato_regular',
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#D3D3D3', // Light gray background
  },
  
});

export default styles;
