import React, { useContext} from "react";
import { UserContext } from "../src/UserContext";

export const QuestionList = ({onSubmit}) => {
    const {questionSet} = useContext(UserContext);
    
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