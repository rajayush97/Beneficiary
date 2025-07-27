import registrationQuestionAnswer from "../api/registrationQuestionAnswerApi";

export const putregistrationQuestionAnswer = async () => {
    try {
        const response = await registrationQuestionAnswer.post("question_answers");
        return response.data;
    } catch (error) {
        throw error;
    }
};
