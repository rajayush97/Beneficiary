import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');// Ensure this file exports width & height if used.

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
      },
      main: {
        flex: 1,
        backgroundColor: 'white',
        width: width,
        height: height,
      },
      backButton: {
        width: width * 0.1,
        height: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: width * 0.035, // 14dp equivalent
        marginTop: height * 0.02, // 14dp equivalent
      },
      iconSmall: {
        width: width * 0.05, // 20dp equivalent
        height: width * 0.05, // 20dp equivalent
      },
      titleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.03, // 20dp equivalent
        marginStart: width * 0.035, // 14dp equivalent
      },
      checkIconContainer: {
        width: width * 0.05,
        height: width * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
      },
      titleText: {
        marginStart: width * 0.035, // 14dp equivalent
        fontSize: width * 0.06, // 24sp equivalent
        fontFamily: 'poppins_bold',
        color: '#285385', // Specified blue color
      },
      benefitButton: {
        backgroundColor: '#0E8345',
        paddingHorizontal: width * 0.035, // 14dp equivalent
        paddingVertical: height * 0.01, // Equivalent of maxHeight: 24dp
        borderRadius: 4,
        alignSelf: 'flex-end',
        marginTop: height * 0.035, // 25dp equivalent
        marginEnd: width * 0.035, // 14dp equivalent
      },
      benefitButtonText: {
        color: 'white',
        fontSize: width * 0.025, // 10sp equivalent
        fontFamily: 'lato_black',
      },
      stepsDescription: {
        fontSize: width * 0.03, // 12sp equivalent
        color: '#797979',
        fontFamily: 'poppins_regular',
        marginTop: height * 0.005, // 25dp equivalent
        marginStart: width * 0.11, // 45dp equivalent
        marginEnd: width * 0.008, // 3dp equivalent
      },
      recyclerView: {
        marginTop: height * 0.005, // 25dp equivalent
        marginHorizontal: width * 0.035, // 14dp equivalent
        marginBottom: height * 0.18, // Space for the card at bottom
        height: '100%',
        flex: 1
      },
      stepItem: {
        flexDirection: 'row',
        paddingVertical: height * 0.005,
        alignItems: 'center',
        backgroundColor: 'white',
      },
      circularTextView: {
        width: width * 0.1, // Approx 40dp
        height: width * 0.1, // Approx 40dp
        borderRadius: width * 0.05, // Half of width to make it circular
        backgroundColor: '#285385', // Blue color
        alignItems: 'center',
        justifyContent: 'center',
        padding: width * 0.03, // 12dp equivalent
        margin: width * 0.02, // 8dp equivalent
      },
      circularText: {
        color: 'white',
        fontSize: width * 0.04, // 16sp equivalent
        fontFamily: 'lato_regular',
        textAlign: 'center',
      },
      stepTextContainer: {
        marginStart: width * 0.03, // 24dp equivalent
      },
      stepTitle: {
        fontSize: width * 0.04, // 16sp equivalent
        color: 'black',
        fontFamily: 'lato_bold',
        lineHeight: width * 0.06, // lineSpacingExtra equivalent
      },
      stepDescription: {
        fontSize: width * 0.03, // 12sp equivalent
        color: '#797979',
        fontFamily: 'lato_regular',
        lineHeight: width * 0.045, // lineSpacingExtra equivalent
      },
      cardContainer: {
        width: width,
        position: 'absolute',
        bottom: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10,
      },
      card: {
        width: width,
        backgroundColor: 'white',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        paddingHorizontal: 8, // Fixed 8dp
      },
      cardTitle: {
        fontSize: 18, // Fixed 18sp
        color: 'black',
        fontFamily: 'poppins_semibold',
        textAlign: 'center',
        marginVertical: 10, // Fixed 18dp
      },
      divider: {
        height: 2,
        backgroundColor: '#E0E0E0', // line_clr
        width: width, // Use full screen width
        alignSelf: 'center',
        position: 'relative',
        left: -8, // Offset to account for parent padding
      },
      cardDescription: {
        fontSize: 12, // Fixed 12sp
        color: '#797979',
        fontFamily: 'poppins_regular',
        textAlign: 'center',
        marginVertical: 18, // Fixed 18dp
        paddingHorizontal: 8,
      },
      scanButton: {
        flexDirection: 'row',
        minHeight: 56, // Fixed 56dp
        backgroundColor: '#285385', // Blue color
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginVertical: 18, // Fixed 18dp
        marginHorizontal: 8,
        padding: 8,
      },
      cameraIcon: {
        width: 36, // Fixed 36dp
        height: 36, // Fixed 36dp
      }
  
});

export default styles;
