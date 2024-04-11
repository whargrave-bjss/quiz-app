import React, {useContext, useState} from "react";
import "./styles/questionform.css"
import { UserContext } from "./UserContext";
import { QuestionList } from "./QuestionList";
import { QuizSetUpForm } from "./QuizSetupForm";
export const QuestionForm = ({onSubmit}) => {
const {currentUser, questionSet, addQuestionToSet} = useContext(UserContext);
const [answerType, setAnswerType] = useState("");
const [options, setOptions] = useState([{text: '', isCorrect: false}]);

const handleAnswerTypeChange = (e) => {
    const newType = e.target.value;
    setAnswerType(newType);
    if (newType === "Multiple Choice") {
      setOptions(Array(4).fill(null).map(() => ({ text: '', isCorrect: false })));
  } else if (newType === "True/False") {
      setOptions([
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: false }
      ]);
  } else {
      setOptions([{ text: '', isCorrect: true }]); 
  }
};

const handleOptionChange = (index, value) => {
  const newOptions = options.map((option, idx) => {
    if (idx === index) {
      return { ...option, text: value };
    }
    return option;
  });
  setOptions(newOptions);
};

const handleCorrectAnswerChange = (correctIndex) => {
  const newOptions = options.map((option, index) => ({
    ...option,
    isCorrect: index === correctIndex,
  }));
  setOptions(newOptions)
}

const handleQuestionSubmit = (e) => {
  e.preventDefault();
  const questionInput = e.target.elements.question;
  const correctAnswer = options.find(option => option.isCorrect)?.text
  const formData = {
    question: questionInput.value, // Assuming the question input has name="question"
    answerType: answerType, // Assuming this is stored in state
    answers: options.map(option => option.text),
    correctAnswer: correctAnswer,
  };
 addQuestionToSet(formData); // Call the passed-in submit function
};

const renderInputs = () => options.map((option, index) => (
  <div key={index}>
    <input
      type="text"
      className="answer-box"
      value={option.text}
      onChange={(e) => handleOptionChange(index, e.target.value)}
      placeholder={`Option ${index + 1}`}
    />
    <label>
    <input
      type="radio"
      name="correctAnswer"
      checked={option.isCorrect}
      onChange={() => handleCorrectAnswerChange(index)}
    />
    Correct
    </label>
    </div>
  ));

    return (
      <div className="main-container">
        {currentUser ? ( questionSet.name ? (<><div className="form-container">
    <form onSubmit={handleQuestionSubmit}>
        <label htmlFor="question">Question</label>
        <input type="text" name="question" id="question"/>

        <label htmlFor="answerTypeSelect">Answer</label>
        <select id="answerTypeSelect" value={answerType} onChange={handleAnswerTypeChange}>
        <option value="Multiple Choice">Multiple Choice</option>
        <option value="Text">Text</option>
        <option value="True/False">True/False</option>
        </select>
      {answerType && renderInputs()}
        <input type="submit" />
    </form>
    </div>
    
    <div className="list-container">
    <QuestionList />
    </div>
    </>) : (
      <>
      <QuizSetUpForm />
      </>
    ))  : (
      <p>Sorry you are not logged in</p>
    )}
     
    </div>
    )
}