import React, { useContext, useState } from "react"
import { UserContext } from "./UserContext";
import { mockCurrentUser } from "./sampleData";
import { Link } from "react-router-dom";
import "./styles/home.css"

export const Home = () =>  {
  const [isLogin, setIsLogin] = useState(true);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const toggleFormMode = () => setIsLogin(!isLogin);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.target as HTMLFormElement).username.value;
    const password = (event.target as HTMLFormElement).password.value;
  
    const url = `${process.env.REACT_APP_API_URL}${isLogin ? '/api/login' : '/api/register'}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      // Handle successful login/register. Store session/token as needed
      console.log(data);
    } else {
      // Handle errors
      console.error('Failed to login/register');
    }
  };
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="home-container">
      {currentUser ? (
        <div className="welcome-container">
          <p className="welcome-message">Welcome back, {currentUser.name}!</p>
          <Link to="/question-form">Make a quiz</Link>
          <Link to="/questions-display">Take a quiz</Link>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        </div>
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Your username"
              required
            />
            <label htmlFor="password" />
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Your password"
              required
            />
            <button type="submit" className="button">
              {isLogin ? "Log In" : "Register"}
            </button>
            <button
              type="button"
              onClick={toggleFormMode}
              className="toggle-button"
            >
              {isLogin
                ? "Need an account? Register"
                : "Have an account? Log In"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
