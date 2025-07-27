import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');// Ensure this file exports width & height if used.

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
      },
      backButton: {
        marginLeft: width * 0.035,
        marginTop: height * 0.017,
        padding: width * 0.012,
      },
      backIcon: {
        width: width * 0.05,
        height: width * 0.05,
        minWidth: width * 0.05,
        minHeight: width * 0.05,
      },
      headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: width * 0.035,
        marginTop: height * 0.017,
      },
      badgeIcon: {
        width: width * 0.05,
        height: width * 0.05,
        minWidth: width * 0.05,
        minHeight: width * 0.05,
      },
      headerTitle: {
        marginLeft: width * 0.035,
        fontFamily: 'poppins_bold',
        fontSize: 24,
        color: '#285385', // btn_color as specified
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: height * 0.012,
        marginRight: width * 0.035,
      },
      approvedButton: {
        backgroundColor: '#0E8345',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.03,
        borderRadius: 50,
        height: height * 0.049,
        justifyContent: 'center',
      },
      approvedButtonText: {
        color: 'white',
        fontFamily: 'lato_black',
        fontSize: 10,
        textAlign: 'center',
      },
      instructionText: {
        marginHorizontal: width * 0.035,
        marginTop: height * 0.031,
        fontFamily: 'poppins_regular',
        fontSize: 11,
        color: 'black',
      },
      flatList: {
        marginHorizontal: width * 0.035,
        flex: 1,
      },
      listContent: {
        paddingBottom: height * 0.025,
        flexGrow: 1,
      },
      itemContainer: {
        width: '100%',
      },
      itemInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.012,
        marginLeft: width * 0.038,
      },
      itemDivider: {
        height: 1,
        backgroundColor: '#E0E0E0', // line_clr approximation
        width: '100%',
      },
      tickIcon: {
        width: width * 0.05,
        height: width * 0.05,
      },
      textContainer: {
        flex: 1,
      },
      itemTitle: {
        fontFamily: 'lato_regular',
        fontSize: 14,
        color: 'black',
        width: width * 0.7, // Already using responsive width
        marginTop: height * 0.006,
      },
      itemAmount: {
        fontFamily: 'lato_regular',
        fontSize: 14,
        color: '#797979',
      },
      qrIcon: {
        width: width * 0.06,
        height: width * 0.06,
        marginRight: width * 0.05,
      },
  
});

export default styles;
