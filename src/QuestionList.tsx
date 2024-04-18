import React, { useContext} from "react";
import { UserContext, useUserContext } from "./UserContext";

export const QuestionList = () => {
    const {questionSet} = useUserContext();
    
    return (
    <>
    <h1>{questionSet.name}</h1>
    <form >
        <ul>
        {questionSet.questions.map(question => (
            <li key={question.id}>{question.question}</li>
        ))}
        </ul>
        <button type="submit">Submit Quiz</button>
    </form>        
    </>)

}