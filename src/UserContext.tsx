import { type } from "os";
import React, {createContext, useState, useContext} from "react";


export interface Question {
  id: string;
  question: string;
  type: string;
  choices: string | string[];
  answer: string;
}

interface User {
  id: string;
  name: string;
}

interface QuestionSet {
  id: string;
  questions: Question[]
  name: string;
  made_by: string;
  assigned_to: string;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  questionSet: QuestionSet;
  setQuestionSet: React.Dispatch<React.SetStateAction<QuestionSet>>;
  addQuestionToSet: (newQuestion: Question) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export interface QuestionsDisplayProps {
  onSubmit: (pointsAwarded: number) => void;
}

export interface QuestionFormProps {
  addQuestionsToSet: (questoion: Question) => void;
}
export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [questionSet, setQuestionSet] = useState<QuestionSet>({
    id: "",
    questions: [],
    name: "",
    made_by: "",
    assigned_to: ""
  });
  const addQuestionToSet = (newQuestion: Question) => {
    setQuestionSet((prevSet) => ({
     ...prevSet,
      questions: [...prevSet.questions, newQuestion]
    }))
  };
    return (
        <UserContext.Provider value={{currentUser, setCurrentUser, questionSet, setQuestionSet, addQuestionToSet}}>
            {children}
        </UserContext.Provider>
    );
}