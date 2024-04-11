import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
export const QuestionsDisplay = ({ onSubmit}) => {
  const {currentUser, questionSet} = useContext(UserContext);
  const [userPoints, setUserPoints] = useState(0);
    const handleSubmit = (event) => {
        event.preventDefault();
      
        const formData = new FormData(event.target);
        let pointsAwarded = 0;
      
        questionSet.questions.forEach((question, index) => {
          const fieldName = `questionChoice-${index}`;
          let userAnswer = formData.get(fieldName);
      
          if (userAnswer === question.answer) {
            pointsAwarded += 1;
          }
        });
      
        setUserPoints(userPoints + pointsAwarded);
        onSubmit(event, pointsAwarded);
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
                  q.choices.map((choice, choiceIndex) => (
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


