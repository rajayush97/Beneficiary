import React, { startTransition } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useRoute } from "@react-navigation/native";
import styles from "../../styles/Invoice/InvoiceStyle";


import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const InvoiceScreen = ({  navigation }) => {
    const route = useRoute();
  const { data } = route.params || {}; 
  
  const savePDFToFiles = async (filePath) => {
    try {
      await Share.open({
        url: `file://${filePath}`,
        type: "application/pdf",
        saveToFiles: true, // ✅ Saves to Files app
      });
    } catch (error) {
      console.error("Error saving PDF:", error);
    }
  };

  const generatePDF = async (data) => {
    try {
      const randomNumber = Math.floor(Math.random() * 9000000) + 1000000;
      const fileName = `Invoice_${data?.id || "XXXX"}_${randomNumber}`;
  
      // ✅ Fix: Ensure formattedDate is defined
      const formattedDate = formatDate(data?.createdDate);
  
      const htmlContent = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1, h3 { text-align: center; }
                .container { width: 100%; padding: 20px; border: 1px solid #ccc; border-radius: 10px; }
                .vendor-info, .purchase-info { margin-bottom: 20px; }
                .status { color: green; font-weight: bold; }
                .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                .table th, .table td { border: 1px solid black; padding: 8px; text-align: left; }
                .footer { text-align: right; font-weight: bold; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Invoice #${data?.id || "XXXX"}</h1>
                <h3>Disaster Relief Grant</h3>
  
                <div class="vendor-info">
                    <p><strong>Vendor ID:</strong> ${data?.vendorId || "XXXX"}</p>
                    <p><strong>Issued By:</strong> ${data?.vendorUserName || "Unknown"}</p>
                    <p class="status">✓ Completed</p>
                </div>
  
                <div class="purchase-info">
                  <p><strong>Purchased On:</strong> ${formattedDate}</p> <!-- ✅ Fix applied here -->
                </div>
  
                <table class="table">
                    <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                    </tr>
                    <tr>
                        <td>${data?.itemCategory || "N/A"}</td>
                        <td>1</td>
                        <td>TT$ ${data?.price || "0.00"}</td>
                    </tr>
                </table>
  
                <p class="footer">Total: TT$ ${data?.price || "0.00"}</p>
  
                <p><strong>Issued to:</strong> ${data?.beneficiaryName || "Unknown"}</p>
            </div>
        </body>
        </html>
      `;
  
      const options = {
        html: htmlContent,
        fileName: fileName,
        directory: "Documents",
      };
  
      const pdf = await RNHTMLtoPDF.convert(options);
      Alert.alert(
        "PDF Generated",
        `Saved as: ${fileName}.pdf`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Save to Files", onPress: () => savePDFToFiles(pdf.filePath) }
        ]
      );
  
    } catch (error) {
      console.error("PDF Generation Error:", error);
      Alert.alert("Error", "Failed to generate PDF.");
    }
  };
  

//   // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const dateObj = new Date(dateString.replace(" ", "T")); // Ensure correct format for iOS

    // Format date: "17 Mar 2025"
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // Format time: "06:55 am"
    const formattedTime = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).toLowerCase();

    return `${formattedDate}  ${formattedTime}`;
  };

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return "0.00"; // Handle invalid values
    return parseFloat(price).toFixed(2); // Ensure 2 decimal places
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require("../../assets/images/eva_back.png")} style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.heading}>Invoice #{data?.id || "XXXX"}</Text>
        <Text style={styles.subheading}>Disaster Relief Grant</Text>
        <View style={styles.vendorContainer}>
          <Text style={styles.vendorName}>{data?.businessName || "Vendor Name"}</Text>
          <View style={styles.statusContainer}>
            {/* <Image source={require('../../assets/images/tick.jpeg')} style={styles.statusIcon}></Image> */}
            <Text style={styles.statusText}>✓ Completed</Text>
          </View>
        </View>
        <Text style={styles.vendorDescription}>
          Vendor ID: {data?.vendorId || "XXXX"} {"\n"}
          Issued By: {data?.vendorUserName || "Unknown"}
        </Text>

        <View style={styles.purchaseContainer}>
          <Text style={styles.purchaseText}>Purchased On:</Text>
          <Text style={styles.purchaseTime}>{formatDate(data?.createdDate)}</Text>
        </View>

        <View style={styles.mainItemContainer}>
          <View style={styles.itemContainer}>
            <View style={styles.itemSection}>
              <Text style={styles.itemRows}>Item</Text>
              <Text style={styles.itemDescription}>{data?.itemCategory || "N/A"}</Text>
              <Text style={styles.itemCode}>{data?.itemCode || "N/A"}</Text>
            </View>
            <View style={styles.qtySection}>
              <Text style={styles.itemRows}>Qty</Text>
              <Text style={styles.itemDescriptionforItem}>1</Text>
            </View>
            <View style={styles.priceSection}>
              <Text style={styles.itemRows}>Price</Text>
              <Text style={styles.itemDescriptionforPrice}>TT$ {formatPrice(data?.price)}</Text>
            </View>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.purchaseText}>Total</Text>
            <Text style={styles.purchaseTime}> TT$ {formatPrice(data?.price)}</Text>
          </View>
        </View>


        <Text style={styles.issueText}>Issued to: {data?.beneficiaryName || "Unknown"}</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => generatePDF(data)}>
          <Text style={styles.buttonText}>Download Invoice</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
};

export default InvoiceScreen;

