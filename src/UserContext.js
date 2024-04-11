import React, {createContext, useState, useContext} from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [questionSet, setQuestionSet] = useState({
        questions: [],
        name: "",
        made_by: "",
        assigned_to: "",
      });
    
      const addQuestionToSet = (newQuestion) => {
        setQuestionSet(prevSet => ({
          ...prevSet,
          questions: [...prevSet.questions, newQuestion],
        }));
      };
    return (
        <UserContext.Provider value={{currentUser, setCurrentUser, questionSet, setQuestionSet, addQuestionToSet}}>
            {children}
        </UserContext.Provider>
    );
}