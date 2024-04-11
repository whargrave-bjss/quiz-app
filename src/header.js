import React from 'react';
import { Link } from 'react-router-dom';
import './styles/header.css'; // Make sure the path matches where your CSS file is located

const Header = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">Quizzles</h1>
      <nav className="app-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/question-form" className="nav-link">Make a Quiz</Link>
        <Link to="/questions-display" className="nav-link">Take a Quiz</Link>
      </nav>
    </header>
  );
};

export default Header;
