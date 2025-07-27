import { StyleSheet } from "react-native";

const invoiceStyles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
      },
      container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
      },
    
      backButton: {
        position: "absolute",
        top: 60,
        left: 10,
        zIndex: 10,
        padding: 10,
      },
      backIcon: {
        width: 24,
        height: 24,
        tintColor: "#000",
      },
      heading: {
        fontFamily: 'Poppins',
        fontSize: 25,
        color: '#000000',
        fontWeight: 'bold',
        marginTop: 100,
        marginLeft: 20
      },
      subheading: {
        fontFamily: 'Lato',
        fontSize: 20,
        color: '#000000',
        marginLeft: 20
      },
      vendorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      vendorName: {
        marginTop: 30,
        fontFamily: 'Lato',
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
        marginLeft: 20
      },
      statusContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        backgroundColor: '#D8F0D4',
        borderRadius: 10,
        height: 25,
        width: 100,
        padding: 3,
        marginTop: 30,
        marginRight: 20
      },
      statusIcon: {
        width: 20,
        height: 20,
      },
      statusText: {
        fontFamily: 'Lato',
        color: '#0E8345'
      },
      vendorDescription: {
        color: '#84888C',
        fontFamily: 'Lato',
        fontSize: 15,
        marginLeft: 20
    
      },
      purchaseContainer: {
        backgroundColor: '#EFF2F6',
        width: '95%',
        height: 'auto',
        borderRadius: 6,
        padding: 25,
        marginVertical: 20,
        marginLeft: 10
      },
      purchaseText: {
        fontFamily: 'Lato',
        fontSize: 16,
        color: '#000000',
      },
      purchaseTime: {
        fontFamily: 'Lato',
        fontSize: 20,
        color: '#000000',
        fontWeight: '700'
    
      },
      itemBorder: {
        borderWidth: 1,
        borderColor: '#EFF2F6',
        padding: 20,
        width: '95%',
        height: 'auto',
        marginLeft: 10,
      },
      itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        backgroundColor: "green"
      },
      itemRows: {
        fontSize: 17,
        color: '#84888C',
        fontFamily: 'Lato',
        marginBottom: 20,
        backgroundColor: 'red'
      },
      itemDescription: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'Lato',
        fontWeight: "bold",
        width: '50%',
      },
      itemCode: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'Lato',
        width: '90%',
      },
      itemDescriptionforItem: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'Lato',
        fontWeight: "bold",
      },
      itemDescriptionforPrice: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'Lato',
        fontWeight: "bold",
      },
      totalContainer: {
        backgroundColor: '#EFF2F6',
        width: 'auto',
        height: 'auto',
        borderRadius: 6,
        padding: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      issueText: {
        color: '#000000',
        fontFamily: 'Lato',
        fontSize: 14,
        fontWeight: 500,
        alignSelf: 'flex-end',
        margin: 5,
        marginRight: 10,
      },
      buttonContainer: {
        marginTop: 20,
        height: 60,
        width: '95%',
        marginLeft: 10,
        backgroundColor: '#285385',
        borderRadius: 10,
        justifyContent: 'center'
      },
      buttonText: {
        color: '#FFFFFF',
        alignSelf: 'center',
        fontSize: 17
      },
    
      mainItemContainer: {
        width: "95%",
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "#EFF2F6",
        padding: 20,
      },
      itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
      },
      itemSection: {
        width: "50%",
      },
      qtySection: {
        width: "25%",
        alignItems: "center",
      },
      priceSection: {
        width: "25%",
        alignItems: "flex-end",
      },
      itemRows: {
        fontSize: 17,
        color: "#84888C",
        fontFamily: "Lato",
        marginBottom: 10,
      },
      itemDescription: {
        color: "#000000",
        fontSize: 16,
        fontFamily: "Lato",
        fontWeight: "bold",
      },
      itemCode: {
        color: "#000000",
        fontSize: 14,
        fontFamily: "Lato",
      },
      itemDescriptionforItem: {
        color: "#000000",
        fontSize: 16,
        fontFamily: "Lato",
        fontWeight: "bold",
      },
      itemDescriptionforPrice: {
        color: "#000000",
        fontSize: 16,
        fontFamily: "Lato",
        fontWeight: "bold",
      },
      totalContainer: {
        backgroundColor: "#EFF2F6",
        borderRadius: 6,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
      },
    
});

export default invoiceStyles;
