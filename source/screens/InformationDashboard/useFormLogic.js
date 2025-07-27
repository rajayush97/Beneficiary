// hooks/useFormLogic.js
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { fetchFormData, saveDraft, submitFinalForm, uploadFile } from "../services/formService";

export const useFormLogic = (accessToken, programId, navigation) => {
  const [schema, setSchema] = useState(null);
  const [programName, setProgramName] = useState(null);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [radioButtons, setRadioButtons] = useState({});
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const [householdCount, setHouseholdCount] = useState(1);
  const [householdFormIndex, setHouseholdFormIndex] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [appStarted, setAppStarted] = useState(false);
  const currentPanel = schema?.components[currentPanelIndex];
  const fields = currentPanel?.components || [];

  const fetchInitialData = async () => {
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
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchInitialData();
    }
  }, [accessToken]);

  const validateCurrentPanel = () => {
    const errors = {};
    const isHouseholdPanel = currentPanel?.key === "personalInformation";

    fields.forEach(field => {
      if (field.key === "dateOfBirth") return;

      const fieldKey = isHouseholdPanel ? `${field.key}_${householdFormIndex}` : field.key;
      const fieldValue = formData[fieldKey];
      const isRequired = field?.validate?.required;

      if (isRequired && field.type === "selectboxes") {
        const selected = fieldValue && Object.values(fieldValue).some(val => val);
        if (!selected) {
          errors[field.key] = `${field.label || field.key} is required`;
        }
      } else if (isRequired && !fieldValue) {
        errors[field.key] = `${field.label || field.key} is required`;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFinalSubmit = async () => {
    if (!validateCurrentPanel()) return;

    const payload = formData;

    if (currentPanel?.key === "personalInformation" && householdFormIndex < householdCount - 1) {
      setHouseholdFormIndex(prev => prev + 1);
      await saveDraft(accessToken, programId, payload);
    } else if (currentPanelIndex < schema.components.length - 1) {
      await saveDraft(accessToken, programId, payload);
      setCurrentPanelIndex(prev => prev + 1);
      setHouseholdFormIndex(0);
    } else {
      setIsReviewMode(true);
      setAppStarted(false);
    }

    setValidationErrors({});
  };

  const handleSubmitApplication = async () => {
    try {
      const fileKeys = Object.keys(formData).filter(key => {
        const val = formData[key];
        return val?.uri && val?.name && val?.type;
      });

      const documentUpload = {};
      for (let key of fileKeys) {
        try {
          const { id, name } = await uploadFile(accessToken, formData[key], {
            programId,
            beneficiaryId: 223,
            formId: 333,
          });
          documentUpload[key] = id;
          documentUpload[`${key}_name`] = name;
        } catch (e) {
          Alert.alert("File Upload Error", `Failed to upload ${key}: ${e.message}`);
          return;
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

      const hasSubmissionError = typeof response.data === "string" &&
        response.data.toLowerCase().includes("multiple form submissions");

      Alert.alert(
        hasSubmissionError ? "Submission Error" : "Success",
        response.data || response.message || "Form submitted.",
        [{ text: "OK", onPress: () => navigation.navigate("HomeScreen") }],
        { cancelable: false }
      );

    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return {
    schema,
    programName,
    formData,
    setFormData,
    currentPanelIndex,
    setCurrentPanelIndex,
    householdFormIndex,
    setHouseholdFormIndex,
    radioButtons,
    setRadioButtons,
    handleFinalSubmit,
    handleSubmitApplication,
    isReviewMode,
    setIsReviewMode,
    appStarted,
    setAppStarted,
    validationErrors,
    currentPanel,
    fields,
    householdCount,
    setHouseholdCount,
  };
};
