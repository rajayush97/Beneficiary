import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from 'react-redux';
import { fetchFormData, saveDraft, submitFinalForm, uploadFile } from "../services/formService";
import { CheckBox } from "react-native-elements";
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Alert } from 'react-native';

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


  useEffect(() => {
    if (accessToken) {
      handleFetchFormData();
    } else {
      setError("Authentication token is missing. Please log in again.");
    }
  }, [accessToken]);

  useEffect(() => {
  }, [programId]);

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
      setSchema(schema);
      setProgramName(programName);

      const radioInit = {};
      schema.components.forEach(panel => {
        panel.components.forEach(field => {
          if (field.type === "radio" && Array.isArray(field.values)) {
            radioInit[field.key] = field.values.map(option => ({
              id: option.value,
              label: option.label,
              value: option.value,
              selected: false,
            }));
          }
        });
      });
      setRadioButtons(radioInit);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFileUpload = async (fieldKey) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const fileName = res[0].name;
      const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      const fileExists = await RNFS.exists(destPath);
      if (fileExists) {
        await RNFS.unlink(destPath);
      }
      await RNFS.moveFile(res[0].uri, destPath);
      setFormData(prev => ({ ...prev, [fieldKey]: { uri: destPath, name: fileName, type: res[0].type } }));

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the file picker");
      } else {
        console.error("File Picker Error: ", err);
      }
    }
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
        return val?.uri && val?.name && val?.type;
      });

      const documentUpload = {};
      for (let key of fileKeys) {
        try {
          const { id, name } = await uploadFile(accessToken, formData[key], {
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

  const renderField = (field, index = null) => {
    const fieldKey = index !== null ? `${field.key}_${index}` : field.key;

    if (field.widget?.type === "input") {
      return (
        <View key={fieldKey} style={styles.formFieldContainer}>
          {field.label && <Text style={styles.formFieldLabel}>{field.label}</Text>}
          <TextInput
            style={styles.input}
            placeholder={field.placeholder}
            placeholderTextColor='#5e5e5e'
            value={formData[fieldKey] || ""}
            onChangeText={(text) => setFormData({ ...formData, [fieldKey]: text })}
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
      const selectedValue = formData[fieldKey];
      const currentButtons = radioButtons[field.key] || [];
      const handleRadioPress = (selectedValue) => {
        const updatedButtons = currentButtons.map(button => ({
          ...button,
          selected: button.value === selectedValue,
        }));
        setRadioButtons(prev => ({ ...prev, [field.key]: updatedButtons }));
        setFormData(prev => ({ ...prev, [fieldKey]: selectedValue }));
      };

      return (
        <View key={fieldKey} style={styles.formFieldContainer}>
          {field.label && <Text style={styles.formFieldLabel}>{field.label}</Text>}
          {field.values?.map((option) => (
            <CheckBox
              key={option.value}
              title={option.label}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={formData[fieldKey] === option.value}
              onPress={() => handleRadioPress(option.value)}
              containerStyle={{ backgroundColor: "transparent", borderWidth: 0, padding: 0 }}
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

    if (field.type === "select") {
      let dropdownItems = [];
      if (field.dataSrc === "json" && Array.isArray(field.data?.json)) {
        dropdownItems = field.data.json.map(item => ({ label: item, value: item }));
      } else if (field.dataSrc === "values" && Array.isArray(field.data?.values)) {
        dropdownItems = field.data.values.map(option => ({ label: option.label, value: option.value }));
      }

      const handleDropdownSelect = (index) => {
        const selectedItem = dropdownItems[index];
        if (selectedItem) {
          setDropdownValues(prev => ({ ...prev, [field.label]: selectedItem }));
          setFormData(prev => ({ ...prev, [fieldKey]: selectedItem.value }));
          if (field.label.toLowerCase().includes("how many people are in your household")) {
            const n = parseInt(selectedItem.value || 0, 10);
            setHouseholdCount(isNaN(n) ? 1 : n + 1);
            setHouseholdFormIndex(0); // reset household index
          }
        }
      };

      return (
        <View key={fieldKey} style={styles.formFieldContainer}>
          {field.label && <Text style={styles.formFieldLabel}>{field.label}</Text>}

          <ModalDropdown
            options={dropdownItems.map(item => item.label)}
            defaultIndex={0}
            defaultValue={dropdownItems[0]?.label || "Select an option"}
            onSelect={(index) => handleDropdownSelect(index)}
            style={styles.dropdownStyle}
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
            <View style={styles.dropdownButton}>
              <Text style={styles.dropdownText}>
                {dropdownValues[field.label]?.label ?? "Select an option"}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
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
        setFormData(prev => ({
          ...prev,
          [fieldKey]: {
            ...selectedItems,
            [optionValue]: !selectedItems?.[optionValue],
          },
        }));
      };

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
      const uploadedFile = formData[fieldKey];
      const showUploadHeading = field.key === firstFileFieldKey;

      return (
        <View key={fieldKey} style={styles.uploadContainer}>
          {showUploadHeading && (
            <>
              <Text style={styles.uploadHeading}>Upload Documents</Text>
              <View style={styles.uploadInfoBox}>
                <Ionicons name="document-text-outline" style={styles.uploadInfoIcon} />
                <View>
                  <Text style={styles.uploadInfoText}>
                    Accepted File Types: pdf, docx, doc, png, jpg, jpeg
                  </Text>
                  <Text style={styles.uploadInfoText}>Max File Size: 20 Mb</Text>
                </View>
              </View>
            </>

          )}

          <Text style={styles.label}>
            {field.label}
            {field?.validate?.required && <Text style={{ color: "red" }}> *</Text>}
          </Text>

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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
            onPress={() => {
              if (isReviewMode) {
                handleSubmitApplication(programId);
              } else {
                setAppStarted(true);
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
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
              onPress={() => {
                saveDraft(accessToken, 1, formData);
                navigation.goBack();
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