import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QuestionForm } from "./QuestionForm";
import { mockCurrentUser, manualQuestionsSet } from "./sampleData";
import { QuestionsDisplay } from "./QuestionsDisplay";
import { UserProvider, UserContext } from "./UserContext";
import { Home } from "./Home";

const mockSubmit = (...args) => {
  console.log('mockSubmit called with args:', args);
};

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    // <QuestionsDisplay questions={manualQuestionsSet} onSubmit={() => {}}/>
    <UserProvider>
    <div>
    <Router>
        <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question-form" element={<QuestionForm onSubmit={mockSubmit}/>} />
        <Route path="/questions-display" element={<QuestionsDisplay />} />
      </Routes>
    </Router>
    </div>
  </UserProvider>
)

// When mocking signed-in User with assigned test
{/* <UserContext.Provider value={{ currentUser: mockCurrentUser, questionSet: manualQuestionsSet }}>
<div>
<Router>
    <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/question-form" element={<QuestionForm onSubmit={mockSubmit}/>} />
    <Route path="/questions-display" element={<QuestionsDisplay />} />
  </Routes>
</Router>
</div>
</UserContext.Provider> */}