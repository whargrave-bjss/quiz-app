import React, { useContext, useState } from "react";
import { useUserContext, Question, QuestionsDisplayProps } from "./UserContext";


export const QuestionsDisplay = ({ onSubmit}: QuestionsDisplayProps) => {
  const {currentUser, questionSet} = useUserContext();
  const [userPoints, setUserPoints] = useState(0);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        const formData = new FormData(event.currentTarget);
        let pointsAwarded = 0;
      
        questionSet.questions.forEach((question: Question, index: number) => {
          const fieldName = `questionChoice-${index}`;
          let userAnswer = formData.get(fieldName);
      
          if (userAnswer === question.answer) {
            pointsAwarded += 1;
          }
        });
      
        setUserPoints(userPoints + pointsAwarded);
        onSubmit(pointsAwarded);
      };
    
    return(
        <>
        {currentUser && currentUser.name == questionSet.assigned_to ? (
        <div><form onSubmit={handleSubmit}>
        {questionSet.questions.map((q, index) => (
          <div key={index}>
            <div className="question">
               {q.question}
            </div>
            <div className="choices">
              {
                q.type === "text" ? (
                  <input
                    name={`questionChoice-${index}`} 
                    type="text"
                  />
                ) : (
                  (typeof q.choices ==='string' ? [q.choices] : q.choices).map((choice, choiceIndex: number) => (
                    <div key={choiceIndex}>
                      <input
                        id={`choice-${index}-${choiceIndex}`}
                        type="radio"
                        name={`questionChoice-${index}`}
                        value={choice}
                      />
                      <label htmlFor={`choice-${index}-${choiceIndex}`}>
                        {choice}
                      </label>
                    </div>
                  ))
                )
              }
            </div>
          </div>
        ))}
        <input type="submit" />
      </form>
      <h2>{userPoints}</h2>
      </div>) : (
        <p>You don't have any assigned tests</p>
      )}
      
      </>
    );
  };


