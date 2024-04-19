import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './header';
import { QuestionForm } from './QuestionForm';
import { QuestionsDisplay } from './QuestionsDisplay';
import { UserProvider } from './UserContext';
import { Home } from './Home';

const mockSubmit = (...args: any[]) => {
  console.log('mockSubmit called with args:', args);
};

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <UserProvider>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/question-form" element={<QuestionForm addQuestionsToSet={mockSubmit} />} />
            <Route path="/questions-display" element={<QuestionsDisplay onSubmit={mockSubmit}/>} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
} else {
  console.error('Failed to find the root element');
}


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