import React, {useContext} from "react"
import { UserContext } from "./UserContext"
export const QuizSetUpForm = () => {
const {currentUser, setQuestionSet} = useContext(UserContext);


    const handleQuizSubmit = (e) => {
        e.preventDefault();
        const quizName = e.target.elements.quizname.value;
        const madeBy = currentUser;
        const assignedTo = e.target.elements.assignedTo.value;
        
        const newQuestionSet = {
          questions: [],
          name: quizName,
          made_by: madeBy,
          assignedTo: assignedTo
        };
        setQuestionSet(newQuestionSet);
      }
    return(
      
             <form className="quiz-setup" onSubmit={handleQuizSubmit}>
       <label htmlFor="quiz-name">Quiz Name</label>
       <input type="text" name="quizname" id="quizname"/>
       <label htmlFor="quiz-name">Who's it for?</label>
       <input type="text" name="assignedTo" id="assignedTo"/>
       <input type="submit"/>
      </form>
           )
}