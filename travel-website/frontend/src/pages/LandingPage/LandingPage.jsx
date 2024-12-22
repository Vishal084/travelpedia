import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to Our Event Platform</h1>
        <p>Plan, organize, and enjoy your events seamlessly!</p>
      </header>
      <div className="landing-buttons">
        <Link to="/login" className="landing-button">
          Login
        </Link>
        <Link to="/signup" className="landing-button">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
