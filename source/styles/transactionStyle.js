import { StyleSheet } from "react-native";

const transactionStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 10,
    },
    backButton: {
        position: "absolute",
        top: 60, 
        left: 30,
        zIndex: 10, 
        padding: 10,
    },
    backIcon: {
        width: 24, 
        height: 24, 
        tintColor: "#143D6F", 
    },
    welcomeHeader: {
        marginTop: 90,
        paddingHorizontal: 30,
    },
    welcomeHeaderTitle: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#143D6F",
    },
    

    // Updated invoice container styling
    invoiceContainer: {
        flex: 1, // Takes full available space
        marginHorizontal: 20,
        marginTop: 20,
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    noInvoiceTextContainer: {
        flex: 1, // Take full height
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
    },
    noInvoiceText: {
        fontSize: 24,
        textAlign: "center",
        color: "#000",
        fontWeight: 600
    },
    subHeading:{
        marginTop:10,
        fontSize: 20,
        textAlign: "center",
        color: "#000",
        fontWeight: 400
    },
    
    invoiceList: {
        flexGrow: 1, // Allows the ScrollView to grow
    },
    invoiceItem: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    invoiceText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#143D6F",
    },
    invoiceAmount: {
        fontSize: 16,
        color: "#555",
    },
    
    closeButtonContainer: {
        width: "100%", 
        alignItems: "center",
        paddingVertical: 20,
        marginBottom: 20
    },
    closeButton: {
        width: "80%", 
        paddingVertical: 14,
    },
    closeButtonText: {
        fontSize: 18,
    },
    verifiedWrapper: {
        flex: 1, 
        justifyContent: "center", // Centers vertically in available space
        alignItems: "center", // Centers horizontally
    },
    centeredContainer: {
        flex: 1, 
        justifyContent: "center", // Centers vertically
        alignItems: "center", // Centers horizontally
    },
    
    
    verifiedCircle: {
        width: 80,
        height: 80,
        borderRadius: 40, // Makes it a perfect circle
        borderWidth: 2,
        borderColor: "green", // Green border
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20, // Spacing from text
      },
      
      tickImage: {
        width: 78, // Adjust size as needed
        height: 78, // Adjust size as needed
        resizeMode: "contain", // Ensures the tick is properly fitted inside
      },
      verifiedItemText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#143D6F",
        marginTop: 10,
        textAlign: "center",
    },

    uploadMessageContainer: {
        marginVertical: 10,
        alignItems: "center",
      },
      
      uploadMessageText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
      },
      
      uploadBox: {
        marginTop: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingVertical: 20,
        alignItems: "center",
        backgroundColor: "#F8F8F8",
      },
      
      fileInfoText: {
        fontSize: 12,
        color: "#6E6E6E",
        textAlign: "center",
      },
      
      itemBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        marginTop: 10,
        backgroundColor: "#F0F0F0",
        borderRadius: 10,
      },
      
      itemText: {
        fontSize: 16,
        fontWeight: "500",
      },
      

      //genrate qr code css:
      modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      popup: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 12,
        width: '80%',
        alignItems: 'center',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
      },
      message: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      proceedButton: {
        backgroundColor: '#2E5AAC',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
      },
      
});

export default transactionStyles;
