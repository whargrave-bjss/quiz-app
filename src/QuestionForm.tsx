import React, {useContext, useRef, useState} from "react";
import "./styles/questionform.css"
import { Question, QuestionFormProps, useUserContext } from "./UserContext";
import { QuestionList } from "./QuestionList";
import { QuizSetUpForm } from "./QuizSetUpForm";
export const QuestionForm = ({addQuestionsToSet}: QuestionFormProps) => {

const {currentUser, questionSet} = useUserContext();
const [answerType, setAnswerType] = useState("");
const [options, setOptions] = useState([{text: '', isCorrect: false}]);
const questionRef = useRef<HTMLInputElement>(null);
const handleAnswerTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value;
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

const handleOptionChange = (index: number, value: string) => {
  const newOptions = options.map((option, idx) => {
    if (idx === index) {
      return { ...option, text: value };
    }
    return option;
  });
  setOptions(newOptions);
};

const handleCorrectAnswerChange = (correctIndex: number) => {
  const newOptions = options.map((option, index) => ({
    ...option,
    isCorrect: index === correctIndex,
  }));
  setOptions(newOptions)
}

const handleQuestionSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (questionRef.current) {
    const questionInput = questionRef.current.value;
    const correctAnswer = options.find(option => option.isCorrect)?.text || '';

    const formData: Question = {
      id: "",
      question: questionInput,
      type: answerType,
      choices: options.map(option => option.text),
      answer: correctAnswer
    };

    addQuestionsToSet(formData); 
  }
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