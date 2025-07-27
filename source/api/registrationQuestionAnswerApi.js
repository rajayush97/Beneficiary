import axios from "axios";




const registrationQuestionAnswer = axios.create({
    baseURL: `https://sbwtest.gov.tt/wrapper/api/beneficiary/`,
    headers: {
      'Content-Type': 'application/json', 
    'Cookie': 'frontend_lang=en_US'
    },

  });

export default registrationQuestionAnswer;