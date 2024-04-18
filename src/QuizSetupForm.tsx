import React, { FormEvent } from "react";
import { useUserContext, QuestionSet } from "./UserContext";


export const QuizSetUpForm = () => {
  const { currentUser, setQuestionSet } = useUserContext();

  const handleQuizSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const quizName = form.quizname.value;
    const assignedTo = form.assignedTo.value;

    const newQuestionSet: QuestionSet = {
      id: Math.random().toString(),
      questions: [],
      name: quizName,
      made_by: currentUser ? currentUser.name : "Unknown User",
      assigned_to: assignedTo,
    };

    setQuestionSet(newQuestionSet);
  };

  return (
    <form className="quiz-setup" onSubmit={handleQuizSubmit}>
      <label htmlFor="quizname">Quiz Name</label>
      <input type="text" name="quizname" id="quizname" />
      <label htmlFor="assignedTo">Who's it for?</label>
      <input type="text" name="assignedTo" id="assignedTo" />
      <input type="submit" />
    </form>
  );
};

