import axios from "axios";
import debounce from "lodash.debounce";
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * Fetch form schema from the API.
 * @param {string} accessToken - User authentication token.
 * @returns {Promise<{ schema: object, programName: string }>} Form schema and program name.
 */

// services/formService.js

export const fetchUserProfile = async (accessToken) => {
  try {
    const response = await fetch('https://sbwtest.gov.tt/wrapper/api/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Profile fetch failed: ${errorText}`);
    }

    const data = await response.json();
    console.log(data?.partner_id, "datadatadata");

      // Save partner_id to local storage
      if (data?.partner_id) {
        await AsyncStorage.setItem('UserPartnerId', String(data.partner_id));
      }
    
    return data;

  } catch (error) {
    console.error("❌ Error fetching profile:", error.message);
    throw error;
  }
};


export const fetchFormData = async (accessToken) => {
  try {
    const response = await axios.get("https://sbwtest.gov.tt/wrapper/api/form/1", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data) {
      try {
        const parsedSchema = JSON.parse(response.data.data.schema);
        console.log(parsedSchema, "FormSchema.......");
        return { schema: parsedSchema, programName: response.data.data.program_name };
      } catch (parseError) {
        throw new Error(`Error parsing schema: ${parseError.message}`);
      }
    } else {
      throw new Error("Invalid schema structure received from API.");
    }
  } catch (err) {
    throw new Error(err.message || "An unexpected error occurred.");
  }
};

export const saveDraft = debounce(async (accessToken, programId, payload, currentPanelKey) => {
  console.log('submit api called programId', programId);
}, 800);

// formService.js
export const uploadFile = async (accessToken, fileObj, meta) => {
  console.log("🧾 Uploading file with token:", accessToken);
  console.log("File object:", fileObj);

  if (!accessToken) throw new Error("Missing access token during file upload");


  const formData = new FormData();

  const documentDto = {
    programId: meta.programId,
    beneficiaryId: meta.beneficiaryId,
    formId: meta.formId,
    documentName: fileObj.name,
  };

  formData.append("documentDto", JSON.stringify(documentDto));
  formData.append("document", {
    uri: fileObj.uri,
    name: fileObj.name,
    type: fileObj.type,
  });

  const response = await axios.post(
    "https://sbwtest.gov.tt/vendor/api/documents/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: "frontend_lang=en_US",
      },
    }
  );

  const id = response.data?.data?.["Document ID"];
  const location = response.data?.data?.Location;
  const name = location?.split("/").pop();

  return { id: parseInt(id), name };
};

export const submitFinalForm = async (accessToken, programId, payload) => {
  try {
    console.log("📤 Submitting final form...");
    console.log("Program ID----:", programId);
    console.log("Payload (Final):", JSON.stringify(payload, null, 2));

    const structuredPayload = { ...payload };

    const response = await axios.post(
      `https://sbwtest.gov.tt/wrapper/api/program/${programId}/submit`,
      structuredPayload,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Cookie': 'frontend_lang=en_US'
        },
      }
    );

    console.log("Response (Submit):", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Final form submission failed:", error.message);
    throw new Error("Final submission failed: " + error.message);
  }
};