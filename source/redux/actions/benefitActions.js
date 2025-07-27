import { BENEFIT_REDEEM_REQUEST, BENEFIT_REDEEM_SUCCESS, BENEFIT_REDEEM_FAIL } from '../constants/benefitConstants';

export const redeemBenefit = () => async (dispatch) => {
    try {
      console.log("🔵 Dispatching BENEFIT_REDEEM_REQUEST...");
      dispatch({ type: BENEFIT_REDEEM_REQUEST });
  
      console.log("🌍 Sending API Request...");
  
      const response = await fetch('http://sbwtest.gov.tt/wrapper/api/benefit/qr_code_item', {
        method: 'POST', // Confirm with backend if this should be GET
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partner_id: 211, program_id: 32 }),
      });
  
      console.log(`📡 API Response Status: ${response.status} ${response.statusText}`);
  
      // Read response text before parsing
      const responseText = await response.text();
      console.log("📄 Raw Response Text:", responseText);
  
      // Try to parse JSON (if response is JSON)
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("⚠️ Response is not valid JSON:", responseText);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
  
      // Log and handle errors properly
      if (!response.ok) {
        console.error("🚨 Server Error:", data);
        throw new Error(`Server Error: ${response.status} - ${JSON.stringify(data)}`);
      }
  
      console.log("✅ API Data:", data);
      dispatch({ type: BENEFIT_REDEEM_SUCCESS, payload: data });
  
    } catch (error) {
      console.error("❌ API Call Failed:", error.message);
      dispatch({ type: BENEFIT_REDEEM_FAIL, payload: error.message });
    }
  };
  
