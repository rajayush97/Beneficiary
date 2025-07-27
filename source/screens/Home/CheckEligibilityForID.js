import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { CheckBox } from "react-native-elements";
import styles from '../../styles/CheckEligibilityStyle';

const { width, height } = Dimensions.get('window');

const CheckEligibilityForID = ({ navigation, route }) => {
   // Destructure programId from route.params
   const { programId } = route.params;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionsData, setQuestionsData] = useState(null);
  const isAllAnswered = questions.length > 0 && questions.every(q => answers[q.ID]);


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://sbwtest.gov.tt/wrapper/api/eligibility/questions/${programId}`);
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data.QUESTIONS)) {
          setQuestions(data.data.QUESTIONS);
          setQuestionsData(data.data); // Store full API response
        } else {
          setError("Invalid response format.");
        }
        
      } catch (error) {
        setError("Failed to fetch eligibility questions.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);
  };

  const handleCheckEligibility = () => {
    // Extract correct and incorrect answer IDs from response data
    const correctAnswers = questionsData?.COMBINATIONofANS?.correct || [];  
    const incorrectAnswers = questionsData?.COMBINATIONofANS?.incorrect || [];
   
    // Get selected answers
    const selectedYesAnswers = Object.keys(answers).filter(
      (questionId) => answers[questionId] === "yes"
    );
  // Check if all required 'yes' answers are selected
    const allCorrectAnswered = correctAnswers.every((id) => selectedYesAnswers.includes(id));
   // Check if any incorrect answers are selected
    const anyIncorrectAnswered = incorrectAnswers.some((id) => selectedYesAnswers.includes(id));
   
    if (allCorrectAnswered && !anyIncorrectAnswered) {
      navigation.navigate("EligibleForID",  { programId: programId }); // Navigate to Eligible screen
    } else {
      navigation.navigate("NotEligibleForID"); // Navigate to Not Eligible screen
    }
  };
  
  
  const handleClear = () => {
    setAnswers({});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/eva_back.png')} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.staticContent}>
        <Text style={styles.title}>Disaster Relief Grant ID</Text>
        <Text style={styles.subtitle}>
        Please complete all the questions below for the eligibility check. All fields are required for us to assess your eligibility.
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#285385" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
        data={questions}
        renderItem={({ item }) => (
          <QuestionItem
            question={item.QUESTION} 
            questionId={item.ID} 
            selectedAnswer={answers[item.ID] || null} 
            onAnswerChange={(answer) => handleAnswerChange(item.ID, answer)} 
          />
        )}
        keyExtractor={(item) => (item.ID ? item.ID.toString() : Math.random().toString())}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      />
      
      )}

      <Text style={styles.noteText}>
        Note: {"\n\n"}
        - Checking your eligibility does not mean you have submitted an application.{"\n\n"}
        - Being eligible to apply for a benefit does not mean that your application will be approved.
      </Text>


      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isAllAnswered ? '#285385' : '#F3F3F3' }, // Dynamically change background color
        ]}
        onPress={handleCheckEligibility}
        disabled={!isAllAnswered}
      >
        <Text
          style={[
            styles.checkButtonText,
            { color: isAllAnswered ? 'white' : '#A6A6A6' }, // Change text color when enabled
          ]}
        >
          Check Eligibility
        </Text>
      </TouchableOpacity>



      <TouchableOpacity
        style={[styles.button, styles.clearButton]}
        onPress={handleClear}
      >
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const QuestionItem = ({ question, questionId, selectedAnswer, onAnswerChange }) => {
  return (
    <View style={styles.questionContainer}>
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{question}</Text>
        <View style={styles.radioGroup}>
          <CheckBox
            title="Yes"
            checked={selectedAnswer === "yes"} 
            onPress={() => onAnswerChange("yes")}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            containerStyle={styles.radioButton}
            textStyle={styles.radioText}
          />
          <CheckBox
            title="No"
            checked={selectedAnswer === "no"} 
            onPress={() => onAnswerChange("no")}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            containerStyle={styles.radioButton}
            textStyle={styles.radioText}
          />
        </View>
      </View>
    </View>
  );
};


export default CheckEligibilityForID;