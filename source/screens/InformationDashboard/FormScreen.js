import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from 'react-redux';
import { fetchFormData, saveDraft, submitFinalForm, uploadFile, fetchUserProfile } from "../services/formService";
import { CheckBox } from "react-native-elements";
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";



import styles from "../../styles/InformationDashboard/FormScreenStyle";

const FormScreen = ({ navigation, route }) => {
  const { programId } = route.params;
  const accessToken = useSelector(state => state.authentication.authData?.access_token);
  const [schema, setSchema] = useState(null);
  const [programName, setProgramName] = useState(null);
  const [formData, setFormData] = useState({});
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const [dropdownValues, setDropdownValues] = useState({});
  const [appStarted, setAppStarted] = useState(false);
  const [radioButtons, setRadioButtons] = useState({});
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [householdCount, setHouseholdCount] = useState(1);
  const [householdFormIndex, setHouseholdFormIndex] = useState(0);

  const currentPanel = schema?.components[currentPanelIndex];
  const fields = currentPanel?.components || [];
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [prefilledKeys, setPrefilledKeys] = useState(new Set());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [activeDateField, setActiveDateField] = useState(null);



  useEffect(() => {
    const saveProgramId = async () => {
      console.log(programId, "programId");

      try {
        await AsyncStorage.setItem('UserProgramId', String(programId));
      } catch (e) {
        console.error('Failed to save Program ID:', e);
      }
    };

    if (programId) {
      saveProgramId();
    }
  }, [programId]); //to save programId in local

  useEffect(() => {
    if (accessToken) {
      handleFetchFormData();
      loadLocalFormData();
    } else {
      setError("Authentication token is missing. Please log in again.");
    }
  }, [accessToken]);

  useEffect(() => {
  }, [programId]);

  const loadLocalFormData = async (loadedSchema) => {
    try {
      const savedData = await AsyncStorage.getItem(`formData_${programId}`);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);

        const dropdowns = {};
        const matchedKeys = new Set();

        loadedSchema?.components?.forEach(panel => {
          panel.components.forEach(field => {
            const isHousehold = panel.key === "personalInformation";
            const fieldKey = isHousehold ? `${field.key}_0` : field.key;
            const savedValue = parsedData[fieldKey];

            if (field.type === "select" && savedValue) {
              let label = null;
              if (field.dataSrc === "json" && Array.isArray(field.data?.json)) {
                label = field.data.json.find(item => item === savedValue);
              } else if (field.dataSrc === "values" && Array.isArray(field.data?.values)) {
                const found = field.data.values.find(item => item.value === savedValue);
                label = found?.label;
              }

              if (label) {
                dropdowns[field.label] = { label, value: savedValue };
                matchedKeys.add(fieldKey);
              }
            }

            if (savedValue !== undefined && savedValue !== null && savedValue !== "") {
              matchedKeys.add(fieldKey);
            }
          });
        });
        setDropdownValues(dropdowns);
        setPrefilledKeys(matchedKeys);
      }
    } catch (err) {
      console.error("Error loading local form data:", err);
    }
  };

  const subheadings = {
    personalInformation: "You’ve provided personal information for all household members.",
    disasterInformation: "You’ve detailed the disaster.",
    documentUpload: "You’ve uploaded the required supporting documents.",
    generalInformation: "You’ve provided your contact information, including email, number of household members, address, and city/town.",
  };

  const handleFetchFormData = async () => {
    setError(null);
    try {
      const { schema, programName } = await fetchFormData(accessToken);
      console.log("✅ Schema fetched from API:", schema);
      console.log("📛 Program name:", programName);
      setSchema(schema);
      setProgramName(programName);
      // ✅ Pass schema explicitly here
      setTimeout(() => {
        loadLocalFormData(schema);
      }, 0);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFileUpload = async (fieldKey, index = null) => {  
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      const fileName = res[0].name;
      const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  
      if (await RNFS.exists(destPath)) {
        await RNFS.unlink(destPath);
      }
  
      await RNFS.moveFile(res[0].uri, destPath);
      const newFile = { uri: destPath, name: fileName, type: res[0].type };
  
      setFormData(prev => {
        const updated = { ...prev };
  
        if (fieldKey === "otherSupportingDocuments") {
          const files = Array.isArray(prev[fieldKey]) ? [...prev[fieldKey]] : [];
          if (index !== null && index < files.length) {
            files[index] = newFile;
          } else {
            files.push(newFile);
          }
          updated[fieldKey] = files;
        } else {
          updated[fieldKey] = newFile;
        }
        return updated;
      });
  
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("❌ User cancelled file picker");
      } else {
        console.error("❌ File Picker Error:", err);
      }
    }
  };

  const handleRemoveFile = (fieldKey, index = null) => {
    setFormData(prev => {
      const updated = { ...prev };
  
      if (index !== null) {
        // Multi-file field: remove file at given index
        const files = Array.isArray(prev[fieldKey]) ? [...prev[fieldKey]] : [];
        files.splice(index, 1);
        updated[fieldKey] = files;
      } else {
        // Single file field: clear the file
        updated[fieldKey] = null;
      }
  
      return updated;
    });
  };
  
  const validateCurrentPanel = () => {
    const errors = {};
    const isHouseholdPanel = currentPanel?.key === "personalInformation";
    fields.forEach(field => {
      // Skip specific fields
      if (field.key === "dateOfBirth") {
        return;
      }
      const fieldKey = isHouseholdPanel ? `${field.key}_${householdFormIndex}` : field.key;
      const fieldValue = formData[fieldKey];
      const isRequired = field?.validate?.required;
      // Handle selectboxes separately
      if (isRequired && field.type === "selectboxes") {
        const selected = fieldValue && Object.values(fieldValue).some(val => val);
        if (!selected) {
          errors[field.key] = `${field.label || field.key} is required`;
        }
      }
      // General required check
      else if (isRequired && !fieldValue) {
        errors[field.key] = `${field.label || field.key} is required`;
      }
    });
    setValidationErrors(errors);
    const isValid = Object.keys(errors).length === 0;
    return isValid;
  };

  const firstFileFieldKey = (() => {
    for (const panel of schema?.components || []) {
      for (const component of panel.components) {
        if (component.type === "file") return component.key;
      }
    }
    return null;
  })();

  const handleFinalSubmit = async () => {
    console.log("continue tapped");
    
    const isValid = validateCurrentPanel();
    if (!isValid) {
      return;
    }
    const payload = formData;
    if (currentPanel?.key === "personalInformation" && householdFormIndex < householdCount - 1) {
      setHouseholdFormIndex(prev => prev + 1);
      await saveDraft(accessToken, programId, payload);
    }
    else if (currentPanelIndex < schema.components.length - 1) {
      await saveDraft(accessToken, programId, payload);
      setCurrentPanelIndex(prev => prev + 1);
      setHouseholdFormIndex(0);
    }
    else {
      setIsReviewMode(true);
      setAppStarted(false);
    }
    setValidationErrors({});
  };

  const handleSubmitApplication = async (Id) => {
    const programId = Id;
    try {
      // 1. Upload all file fields and replace with { id, name }
      const fileKeys = Object.keys(formData).filter(key => {
        const val = formData[key];
        return (
          (val && val.uri && val.name && val.type) || // single file
          (Array.isArray(val) && val.every(f => f.uri && f.name && f.type)) // multi-file like otherSupportingDocuments
        );
      });
      
      const documentUpload = {};

      for (let key of fileKeys) {
        const val = formData[key];
      
        if (Array.isArray(val)) {
          // Handle multi-file field like "otherSupportingDocuments"
          const ids = [];
          const names = [];
          for (let file of val) {
            try {
              const { id, name } = await uploadFile(accessToken, file, {
                programId: programId,
                beneficiaryId: 223,
                formId: 333,
              });
              ids.push(id);
              names.push(name);
            } catch (e) {
              console.error(`File upload failed for ${key}:`, e.message);
            }
          }
          documentUpload[key] = ids; // Just IDs
          documentUpload[`${key}_name`] = names.join('\n'); // Names joined with \n
        } else {
          // Handle single file field
          try {
            const { id, name } = await uploadFile(accessToken, val, {
              programId: programId,
              beneficiaryId: 223,
              formId: 333,
            });
            documentUpload[key] = id;
            documentUpload[`${key}_name`] = name;
          } catch (e) {
            console.error(`File upload failed for ${key}:`, e.message);
          }
        }
      }
      

      // 2. Build structured payload
      const structuredPayload = {
        panel: {
          typeOfHousing: formData.typeOfHousing,
          address: formData.address,
          regionalCorporation: formData.regionalCorporation,
          townCity: formData.townCity,
          postcode: formData.postcode,
          howManyPeopleAreInYourHousehold: formData.howManyPeopleAreInYourHousehold,
          totalHouseIncome: formData.totalHouseIncome,
        },
        personalInformation: {
          firstName: formData["firstName_0"],
          lastName: formData["lastName_0"],
          otherName: formData["otherName_0"],
          gender: formData["gender_0"],
          maritalStatus: formData["maritalStatus_0"],
          nationalIdentificationCardNumber1: formData["nationalIdentificationCardNumber1_0"],
          employmentStatus: formData["employmentStatus_0"],
          phoneNumber: formData["phoneNumber_0"],
          incomeAmount: formData["incomeAmount_0"],
        },
        disasterInformation: {
          natureOfDisaster: formData.natureOfDisaster,
          haveYouSufferedDamagesToHousingInfrastructure: formData.haveYouSufferedDamagesToHousingInfrastructure,
          doesAnyMemberOfTheHouseholdRequirePyschoscoialSupportCounselling:
            formData.doesAnyMemberOfTheHouseholdRequirePyschoscoialSupportCounselling,
        },
        documentUpload,
        panel5: {}
      };
      const response = await submitFinalForm(accessToken, programId, structuredPayload);
      if (
        typeof response.data === "string" &&
        response.data.toLowerCase().includes("multiple form submissions")
      ) {
        Alert.alert(
          "Submission Error",
          response.data,
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("HomeScreen");
              },
            },
          ],
          { cancelable: false }
        );
        return;
      }
      // ✅ Success Case
      Alert.alert(
        "Success",
        response.message || "Form submitted successfully",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("HomeScreen");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const updateFormData = async (key, value) => {
    try {
      const updated = { ...formData, [key]: value };
      setFormData(updated);
      await AsyncStorage.setItem(`formData_${programId}`, JSON.stringify(updated));
      // Log data after storing
      const savedData = await AsyncStorage.getItem(`formData_${programId}`);
    } catch (error) {
      console.error("❌ Error saving to local storage:", error);
    }
  };

  // Callback when user picks a date
const handleConfirmDate = (date) => {
  if (activeDateField) {
    updateFormData(activeDateField, date.toISOString()); // or any desired format
  }
  setDatePickerVisible(false);
};

// Callback when user cancels
const handleCancelDate = () => {
  setDatePickerVisible(false);
};

  const renderField = (field, index = null) => {
    const fieldKey = index !== null ? `${field.key}_${index}` : field.key;
    if (field.widget?.type === "input") {
      return (
        <View key={fieldKey} style={styles.formFieldContainer}>
          {field.label && (
            <Text style={styles.formFieldLabel}>
              {field.label}
              {field?.validate?.required && <Text style={{ color: "red" }}> *</Text>}
            </Text>
          )}
          <TextInput
            style={[
              styles.input,
              prefilledKeys.has(fieldKey) && formData[fieldKey] && { backgroundColor: "#f0f0f0" }
            ]}
            placeholder={field.placeholder}
            placeholderTextColor="#5e5e5e"
            value={formData[fieldKey] || ""}
            onChangeText={(text) => updateFormData(fieldKey, text)}
            editable={!(prefilledKeys.has(fieldKey) && formData[fieldKey])}
          />
          {validationErrors[field.key] && (
            <Text style={{ color: "red", fontSize: 12, marginBottom: 8 }}>
              {validationErrors[field.key]}
            </Text>
          )}
        </View>
      );
    }
    if (field.type === "radio") {
      const fieldKey = index !== null ? `${field.key}_${index}` : field.key;
      const selectedValue = formData[fieldKey];
      const handleRadioPress = (value) => {
        setFormData(prev => ({ ...prev, [fieldKey]: value }));
      };

      return (
        <View key={fieldKey} style={styles.formFieldContainer}>
          {field.label && (
            <Text style={styles.formFieldLabel}>
              {field.label}
              {field?.validate?.required && <Text style={{ color: "red" }}> *</Text>}
            </Text>
          )}

          {field.values?.map((option) => (
            <CheckBox
              key={option.value}
              title={option.label}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={selectedValue === option.value}
              onPress={() => handleRadioPress(option.value)}
              containerStyle={{
                backgroundColor: "transparent",
                borderWidth: 0,
                padding: 0,
              }}
              textStyle={{ fontWeight: "normal" }}
            />
          ))}
          {validationErrors[field.key] && (
            <Text style={styles.validationError}>
              {validationErrors[field.key]}
            </Text>
          )}
        </View>
      );
    }

    if (field.type === "datetime") {
      const fieldKey = index !== null ? `${field.key}_${index}` : field.key;
      const selectedDate = formData[fieldKey] ? new Date(formData[fieldKey]) : null;

      const showDatePicker = () => {
        // Show your modal or platform date picker here
        // This example assumes using `DateTimePickerModal` from `react-native-modal-datetime-picker`
        setDatePickerVisible(true);
        setActiveDateField(fieldKey); // <-- you need to track which field is active
      };

      return (
        <View key={fieldKey} style={styles.formFieldContainer}>
          {field.label && (
            <Text style={styles.formFieldLabel}>
              {field.label}
              {field?.validate?.required && <Text style={{ color: "red" }}> *</Text>}
            </Text>
          )}

          <TouchableOpacity
            onPress={() => showDatePicker(fieldKey)}
            disabled={prefilledKeys.has(fieldKey) && formData[fieldKey]}
            style={[
              styles.input,
              {
                justifyContent: "center",
                backgroundColor:
                  prefilledKeys.has(fieldKey) && formData[fieldKey]
                    ? "#f0f0f0"
                    : "#fff",
              },
            ]}
          >
            <Text style={{ color: selectedDate ? "#000" : "#aaa" }}>
              {selectedDate
                ? selectedDate.toISOString().split("T")[0]
                : "Select a date"}
            </Text>
          </TouchableOpacity>


          {validationErrors[field.key] && (
            <Text style={{ color: "red", fontSize: 12, marginBottom: 8 }}>
              {validationErrors[field.key]}
            </Text>
          )}

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={handleCancelDate}
            maximumDate={new Date()}
          />
        </View>
      );
    }

    if (field.type === "select") {
      let dropdownItems = [];
      if (field.dataSrc === "json" && Array.isArray(field.data?.json)) {
        dropdownItems = field.data.json.map(item => ({ label: item, value: item }));
      } else if (field.dataSrc === "values" && Array.isArray(field.data?.values)) {
        dropdownItems = field.data.values.map(option => ({ label: option.label, value: option.value }));
      }
      const fieldKey = index !== null ? `${field.key}_${index}` : field.key;
      const isLocked =
        (field.label?.toLowerCase().includes("town") || field.key?.toLowerCase().includes("town")) &&
        prefilledKeys.has(fieldKey);
      const savedValue = formData[fieldKey];
      const handleDropdownSelect = (index) => {
        const selectedItem = dropdownItems[index];
        if (selectedItem) {
          setDropdownValues(prev => ({ ...prev, [field.label]: selectedItem }));
          updateFormData(fieldKey, selectedItem.value); // 👈 Use this instead
          if (field.label.toLowerCase().includes("how many people are in your household")) {
            const n = parseInt(selectedItem.value || 0, 10);
            setHouseholdCount(isNaN(n) ? 1 : n + 1);
            setHouseholdFormIndex(0); // reset household index
          }
        }
      };

      return (
        <View key={fieldKey} style={styles.formFieldContainer}>
          {field.label && (
            <Text style={styles.formFieldLabel}>
              {field.label}
              {field?.validate?.required && <Text style={{ color: "red" }}> *</Text>}
            </Text>
          )}
          <ModalDropdown
            options={dropdownItems.map(item => item.label)}
            defaultIndex={-1}
            defaultValue={
              (() => {
                const savedValue = formData[fieldKey];
                const matchedItem = dropdownItems.find(item => item.value === savedValue);
                const displayLabel = matchedItem
                  ? matchedItem.label
                  : isLocked && savedValue
                    ? savedValue  // fallback to raw value if locked and unmatched
                    : "Select an option";
                return displayLabel;
              })()
            }
            onSelect={(index) => !isLocked && handleDropdownSelect(index)} // 🔒 block if locked
            disabled={isLocked} // 🔒 Disable dropdown if locked
            style={[
              styles.dropdownStyle,
              isLocked && { backgroundColor: "#f0f0f0", opacity: 1 } // ✅ light gray like input, keep text visible
            ]}
            textStyle={styles.dropdownText}
            dropdownStyle={styles.dropdownMenu}
            renderRow={(option, index, isSelected) => (
              <View
                style={[
                  styles.dropdownItem,
                  isSelected && styles.dropdownItemSelected
                ]}
              >
                <Text style={styles.dropdownItemText}>{option}</Text>
              </View>
            )}
          >
            <View style={[
              styles.dropdownButton,
              isLocked && { backgroundColor: "#f0f0f0" }  // ✅ apply gray background when locked
            ]}>
              <Text style={styles.dropdownText}>
                {
                  (() => {
                    const savedValue = formData[fieldKey];
                    const matchedItem = dropdownItems.find(item => item.value === savedValue);
                    const displayLabel = matchedItem
                      ? matchedItem.label
                      : isLocked && savedValue
                        ? savedValue
                        : "Select an option";
                    return displayLabel;
                  })()
                }
              </Text>

              <Text style={[styles.dropdownIcon, isLocked && { color: "#888" }]}>▼</Text>
            </View>
          </ModalDropdown>

          {validationErrors[field.key] && (
            <Text style={{ color: "red", fontSize: 12, marginBottom: 8 }}>
              {validationErrors[field.key]}
            </Text>
          )}
        </View>
      );
    }

    if (field.type === "selectboxes") {
      const options = Array.isArray(field.values) ? field.values : [];
      const selectedItems = formData[fieldKey] || {};

      const handleCheckboxToggle = (optionValue) => {
        const updated = {
          ...selectedItems,
          [optionValue]: !selectedItems?.[optionValue],
        };
        console.log("🟩 Toggled SelectBox:", fieldKey, updated);
        setFormData(prev => ({
          ...prev,
          [fieldKey]: updated,
        }));
      };

      console.log("🟨 SelectBox field:", fieldKey, selectedItems);

      return (
        <View key={fieldKey} style={styles.formFieldContainer}>
          {field.label && (
            <Text style={styles.selectBoxLabel}>
              {field.label}
            </Text>
          )}

          <View style={styles.selectBoxGroup}>
            {options.map(option => (
              <CheckBox
                key={option.value}
                title={option.label}
                checked={!!selectedItems?.[option.value]}
                onPress={() => handleCheckboxToggle(option.value)}
                checkedColor="#007bff"
                containerStyle={styles.selectBoxItem}
                textStyle={styles.selectBoxItemText}
              />
            ))}
          </View>

          {validationErrors[field.key] && (
            <Text style={styles.validationErrorText}>
              {validationErrors[field.key]}
            </Text>
          )}
        </View>
      );
    }

    if (field.type === "file") {
      // 🔥 ADD THIS CODE
      if (field.key === "fireReport") {
        if (formData["natureOfDisaster"] !== "fire") {
          field.validate = { ...field.validate, required: false };
        } else {
          field.validate = { ...field.validate, required: true };
        }
      }

      // Special handling for multiple "otherSupportingDocuments"
      if (field.key === "otherSupportingDocuments") {
        const uploadedFiles = Array.isArray(formData[field.key]) ? formData[field.key].filter(f => f) : [];
        const filesToRender = [...uploadedFiles, null]; // Always exactly one extra empty input
      
        return filesToRender.map((file, index) => (
          <View key={`${field.key}-${index}`} style={styles.uploadContainer}>
            <Text style={styles.label}>
              Supporting Document {index + 1}
            </Text>
      
            <View style={{ position: "relative" }}>
              <TouchableOpacity
                style={[
                  styles.uploadBox,
                  file && styles.uploadBoxSuccess
                ]}
                onPress={() => handleFileUpload(field.key, index)}
                activeOpacity={0.8}
              >
                <View style={styles.uploadRow}>
                  <Ionicons name="document-text-outline" style={styles.uploadFileIcon} />
                  <Text style={styles.uploadFileText}>
                    {file?.name || "No file selected"}
                  </Text>
                  <Feather name="upload" style={[
                    styles.uploadArrow,
                    file && styles.uploadArrowSuccess
                  ]} />
                </View>
              </TouchableOpacity>
      
              {/* 🗑️ Delete button */}
              {file && (
                <TouchableOpacity
                  onPress={() => handleRemoveFile(field.key, index)}
                  style={styles.deleteButton}
                >
                  <Feather name="trash-2" size={20} color="red" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ));
      }
      
      const uploadedFile = formData[fieldKey];

      if (field.key === "fireReport" && formData["natureOfDisaster"] !== "fire") {
        return null;
      }
      
      const showUploadHeading = field.key === firstFileFieldKey;
      
      return (
        <View key={fieldKey} style={styles.uploadContainer}>
          {showUploadHeading && (
            <>
              <Text style={styles.uploadHeading}>Upload Documents</Text>
              <View style={styles.uploadInfoBox}>
                <Ionicons name="document-text-outline" style={styles.uploadInfoIcon} />
                <View>
                  <Text style={styles.uploadInfoText}>Accepted File Types: pdf, docx, doc, png, jpg, jpeg</Text>
                  <Text style={styles.uploadInfoText}>Max File Size: 20 Mb</Text>
                </View>
              </View>
            </>
          )}
      
          <Text style={styles.label}>
            {field.label}
            {field?.validate?.required && <Text style={{ color: "red" }}> *</Text>}
          </Text>
      
          <View style={{ position: "relative" }}>
            <TouchableOpacity
              style={[
                styles.uploadBox,
                uploadedFile && styles.uploadBoxSuccess
              ]}
              onPress={() => handleFileUpload(fieldKey)}
              activeOpacity={0.8}
            >
              <View style={styles.uploadRow}>
                <Ionicons name="document-text-outline" style={styles.uploadFileIcon} />
                <Text style={styles.uploadFileText}>
                  {uploadedFile?.name || "No file selected"}
                </Text>
                <Feather name="upload" style={[
                  styles.uploadArrow,
                  uploadedFile && styles.uploadArrowSuccess
                ]} />
              </View>
            </TouchableOpacity>
      
            {/* 🗑️ Delete button for single-file fields */}
            {uploadedFile && (
              <TouchableOpacity
                onPress={() => handleRemoveFile(fieldKey)}
                style={styles.deleteButton}
              >
                <Feather name="trash-2" size={20} color="red" />
              </TouchableOpacity>
            )}
          </View>
      
          {validationErrors[field.key] && (
            <Text style={styles.validationErrorText}>
              {validationErrors[field.key]}
            </Text>
          )}
        </View>
      );
      
    }
    
    return null;
  };

  // Step 1: Show intro screen before form
  if (!appStarted) {
    return (
      <SafeAreaView style={styles.introContainer}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => {
            if (appStarted && currentPanelIndex > 0) {
              setCurrentPanelIndex(prev => prev - 1);
              setHouseholdFormIndex(0);
            } else {
              navigation.goBack();
            }
          }}
          style={styles.backButton}
        >
          <Image source={require("../../assets/images/eva_back.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.introHeader}>
          <Text style={styles.introTitle}>Grant Application Process</Text>
          <Text style={styles.introSubtitle}>
            To successfully submit your grant application, please complete each of the following steps in order
          </Text>
        </View>
        {/* Wrap the steps container in a ScrollView */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View
            style={[
              styles.introStepsContainer,
              isReviewMode && !appStarted && styles.reviewStepsContainer
            ]}
          >
            {schema && schema.components.map((panel, index) => {
              const isLastPanel = index === schema.components.length - 1;
              if (isReviewMode && isLastPanel) return null;

              return (
                <View key={panel.key} style={styles.introStep}>
                  <View style={styles.progressPoint}>
                    <View style={styles.progressIndicator}>
                      <Text style={styles.indicatorText}>{index + 1}</Text>
                    </View>
                    {index < schema.components.length - 1 &&
                      !(isReviewMode && index === schema.components.length - 2) && (
                        <View style={[
                          styles.verticalLine,
                          isReviewMode && styles.verticalLineReview // 👈 Apply taller line in review mode
                        ]} />
                      )}
                  </View>
                  <View style={styles.stepContentWrapper}>
                    {panel.title && <Text style={styles.introStepLabel}>{panel.title}</Text>}
                    {isReviewMode && (
                      <Text style={styles.introStepSubLabel}>
                        {subheadings[panel.key] || subheadings.generalInformation}
                      </Text>
                    )}
                    {isReviewMode && (
                      <TouchableOpacity
                        style={styles.reviewButton}
                        onPress={() => {
                          setCurrentPanelIndex(index);
                          setHouseholdFormIndex(0);
                          setAppStarted(true);
                        }}
                      >
                        <Text style={styles.reviewButtonText}>Review</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.footerButtonContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={async () => {
              if (isReviewMode) {
                handleSubmitApplication(programId);
              } else {
                try {
                  const profile = await fetchUserProfile(accessToken);
                  const registrationFields = profile?.profile_data?.registration_fields || [];
                  console.log("👤 User profile fetched:", JSON.stringify(registrationFields, null, 2));
                  const mappedData = {};
                  const matchedKeys = new Set();
                  const fieldMapping = {
                    "Name": (value) => {
                      const [firstName, ...rest] = value.trim().split(/\s+/);
                      const lastName = rest.join(" ");
                      return { firstName, lastName };
                    },
                    "National ID Number": (value) => ({ nationalIdentificationCardNumber1: value }),
                    "Phone Number": (value) => ({ phoneNumber: value }),
                    "Town": (value) => ({ townCity: value }),
                    "Town/City": (value) => ({ townCity: value }),
                    "Drivers License Number": (value) => ({ driversPermitNumber: value }),
                  };

                  registrationFields.forEach((field, index) => {
                    const [key, value] = Object.entries(field)[0];
                    const mapper = fieldMapping[key.trim()];
                    const isHouseholdField = (formKey) => {
                      return schema?.components?.some(panel =>
                        panel.key === "personalInformation" &&
                        panel.components.some(c => c.key === formKey)
                      );
                    };

                    const addHouseholdIndex = (key) => {
                      return isHouseholdField(key) ? `${key}_0` : key;
                    };

                    if (mapper) {
                      const result = mapper(value);
                      Object.entries(result).forEach(([formKey, formValue]) => {
                        const finalKey = addHouseholdIndex(formKey);
                        mappedData[finalKey] = formValue;
                        matchedKeys.add(finalKey);
                        console.log(`🗺️ [fieldMapping] Set "${finalKey}" =`, formValue);
                      });
                    }
                    else {
                      schema?.components?.forEach(panel => {
                        panel.components.forEach(component => {
                          if (
                            component.label?.trim().toLowerCase() === key.trim().toLowerCase() ||
                            component.key?.trim().toLowerCase() === key.trim().replace(/\s/g, '').toLowerCase() ||
                            key.trim().toLowerCase().includes(component.label?.trim().toLowerCase())
                          ) {
                            const finalKey = panel.key === "personalInformation"
                              ? `${component.key}_0` : component.key;
                            mappedData[finalKey] = value;
                            matchedKeys.add(finalKey);
                          }
                        });
                      });
                    }
                  });
                  const updatedFormData = { ...formData, ...mappedData };
                  setFormData(updatedFormData);
                  setPrefilledKeys(matchedKeys);
                  await AsyncStorage.setItem(`formData_${programId}`, JSON.stringify(updatedFormData));

                  // 🔁 Update dropdown values
                  const updatedDropdowns = {};
                  schema?.components?.forEach(panel => {
                    panel.components.forEach(field => {
                      if (field.type === "select") {
                        const fieldKey = panel.key === "personalInformation" ? `${field.key}_0` : field.key;
                        const savedValue = mappedData[fieldKey];
                        if (!savedValue) return;

                        let label = null;
                        if (field.dataSrc === "json" && Array.isArray(field.data?.json)) {
                          label = field.data.json.find(item => item === savedValue);
                        } else if (field.dataSrc === "values" && Array.isArray(field.data?.values)) {
                          const found = field.data.values.find(item => item.value === savedValue);
                          label = found?.label;
                        }

                        if (label) {
                          updatedDropdowns[field.label] = { label, value: savedValue };
                          matchedKeys.add(fieldKey);
                        }
                      }
                    });
                  });
                  setDropdownValues(updatedDropdowns);

                  // 🔘 Update radio buttons
                  const updatedRadios = { ...radioButtons };
                  schema?.components?.forEach(panel => {
                    panel.components.forEach(field => {
                      if (field.type === "radio") {
                        const fieldKey = panel.key === "personalInformation" ? `${field.key}_0` : field.key;
                        const selected = mappedData[fieldKey];
                        if (!selected) return;

                        if (selected) {
                          updatedRadios[field.key] = field.values.map(option => ({
                            id: option.value,
                            label: option.label,
                            value: option.value,
                            selected: option.value === selected, // ✅ Reflect correct selection
                          }));
                          matchedKeys.add(fieldKey); // ✅ Lock the field
                        }
                      }
                    });
                  });
                  setRadioButtons(updatedRadios);
                  setPrefilledKeys(matchedKeys);

                  // ✅ All done — start the app
                  setAppStarted(true);

                } catch (error) {
                  Alert.alert("Profile Fetch Failed", error.message);
                }
              }
            }}

          >
            <Text style={styles.startButtonText}>
              {isReviewMode ? "Submit Application" : "Start Application"}
            </Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.flexContainer}>
      <TouchableOpacity
        onPress={() => {
          if (appStarted && currentPanelIndex > 0) {
            setCurrentPanelIndex(prev => prev - 1);
            setHouseholdFormIndex(0); // optional: reset if you're in a household loop
          } else {
            navigation.goBack();
          }
        }}
        style={styles.backButton}
      >

        <Image source={require("../../assets/images/eva_back.png")} style={styles.backIcon} />
      </TouchableOpacity>

      {schema && schema.components.length > 0 ? (
        <>
          <ScrollView>
            <View key={`${currentPanel.key}-${householdFormIndex}`} style={styles.panel}>
              {/* ✅ COMMON HEADING FOR ALL PANELS */}
              <View style={styles.panelHeader}>
                <Text style={styles.panelTitle}>
                  {currentPanel?.key === "personalInformation"
                    ? `${programName} - Household Member ${householdFormIndex + 1}`
                    : programName}
                </Text>
                <Text style={styles.panelSubtitle}>Please fill in the information below</Text>
              </View>

              {/* ✅ PANEL-SPECIFIC RENDERING */}
              {currentPanel?.key === "declarationOfTruth" ? (
                <>
                  {fields.map(field => renderField(field))}
                  <Text style={styles.declarationHeading}>Declaration of Truth</Text>
                  <AntDesign name="exclamationcircleo" style={styles.declarationIcon} />

                  <Text style={styles.declarationWarningText}>
                    A material or false statement or omiision made in connection with this application is sufficient ause for denial of the social services
                  </Text>


                  <View style={styles.declarationBox}>
                    <Text style={styles.declarationSubHeading}>Please read it carefully</Text>
                    <Text style={styles.declarationWarningText}>
                      I acknowledge that it is my responsibility to ensure that all information submitted is correct and that I will promptly notify the MSDFS of any changes or inaccuracies.
                      I confirm that the funds requested will be used solely for the purposes outlined in this application and that I and/or my organization complies with all eligibility requirements set forth by the grant programme.
                    </Text>

                    <CheckBox
                      title="I agree with the information stated above."
                      checked={formData.agreedToDeclaration || false}
                      onPress={() =>
                        setFormData(prev => ({
                          ...prev,
                          agreedToDeclaration: !prev.agreedToDeclaration,
                        }))
                      }
                      containerStyle={styles.declarationCheckBoxContainer}
                      textStyle={styles.declarationCheckBoxText}
                    />

                  </View>
                </>
              ) : (
                fields.map(field =>
                  currentPanel?.key === "personalInformation"
                    ? renderField(field, householdFormIndex)
                    : renderField(field)
                )
              )}
            </View>
          </ScrollView>

          {/* Button Area */}
          <View style={styles.buttonContainer}>
            {currentPanelIndex > 0 && (
              <TouchableOpacity onPress={() => setCurrentPanelIndex(currentPanelIndex - 1)} />
            )}

            <TouchableOpacity
              onPress={handleFinalSubmit}
              style={[
                styles.button,
                currentPanel?.key === "declarationOfTruth" && !formData.agreedToDeclaration && { backgroundColor: '#ccc' },
              ]}
              disabled={currentPanel?.key === "declarationOfTruth" && !formData.agreedToDeclaration}
            >
              <Text style={styles.buttonText}>
                {currentPanelIndex === schema?.components?.length - 1 ? "Review" : "Continue"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                try {
                  await AsyncStorage.multiSet([
                    ['formDrafted', 'true'],
                    ['formDraftedProgramId', programId.toString()],
                  ]); // or store any specific value like a draft ID
                  saveDraft(accessToken, 1, formData);
                  navigation.navigate('InformationDashboardScreen')
                } catch (error) {
                  console.error('Error saving to local storage:', error);
                }
              }}
              style={[styles.button, styles.saveCloseButton]}
            >
              <Text style={styles.buttonText}>Save & Close</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.errorContainer}>No form schema available.</Text>
      )}
    </SafeAreaView>
  );
};

export default FormScreen;