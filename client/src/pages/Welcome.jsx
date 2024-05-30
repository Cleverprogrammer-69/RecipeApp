import React from "react";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Recipick</h1>
        <h3>Discover and share amazing recipes</h3>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
