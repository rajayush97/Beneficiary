import CryptoJS from 'crypto-js';

const password = "u4MvmicXqelp#(Mhfh#9hMPIWYTtOCdD";

export const extractItemName = (decryptedText) => {
  const parts = decryptedText.split('@');
  return parts.length > 4 ? parts[4].trim() : null;
};

export const normalizeBase64 = (data) => {
  return data.replace(/(\r\n|\n|\r)/gm, "").trim();
};

export const generateKey = (password, salt) => {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 65536,
    hasher: CryptoJS.algo.SHA256,
  });
};

export const extractBytes = (wordArray, start, length) => {
  let hex = CryptoJS.enc.Hex.stringify(wordArray);
  let extractedHex = hex.substring(start * 2, (start + length) * 2);
  return CryptoJS.enc.Hex.parse(extractedHex);
};

export const decryptData = (encryptedData) => {
  try {
    let normalizedData = normalizeBase64(encryptedData);
    let combined = CryptoJS.enc.Base64.parse(normalizedData);

    let salt = extractBytes(combined, 0, 16); // First 16 bytes
    let iv = extractBytes(combined, 16, 16); // Next 16 bytes
    let encrypted = extractBytes(combined, 32, combined.sigBytes - 32); // Remaining bytes

    let secretKey = generateKey(password, salt);

    let decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encrypted },
      secretKey,
      { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    const decryptedText = CryptoJS.enc.Utf8.stringify(decrypted);

    if (!decryptedText) {
      throw new Error("Decryption failed: Empty result");
    }

    return decryptedText;
  } catch (error) {
    return null;
  }
};

// ✅ Adding `parseDecryptedData` function here
export const parseDecryptedData = (data) => {
  const parts = data.split("@");

  return {
    vendorId: `${parts[0]}`, // First 4 parts form itemCode
    businessName: parts[1], // Item name at index 4
  };
};

export const extractValuesForTransaction = (itemCode) => {
  const parts = itemCode.split("@");
  if (parts.length >= 4) {
    return {
      vendorItemId: parts[0], // "23"
      beneficiaryId: parts[1],
      extractedItemCode: parts[2], // "d-d970-4393-afdc-26ca"
      programId: parts[3] // "50"
    };
  } else {
    console.error("Invalid itemCode format:", itemCode);
    return { vendorItemId: null, beneficiaryId: null, extractedItemCode: null, programId: null };
  }
};