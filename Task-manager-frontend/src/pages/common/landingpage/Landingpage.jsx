import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="homepage">
      <div className="homepage-overlay">
        <div className="text-center">
          <h1 className="display-4 fw-bold mb-3">
            Manage Your Tasks. Master Your Time.
          </h1>
          <p className="lead text-muted mb-4">
            Organize your day, stay focused, and track your progress
            effortlessly.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/register" className="btn btn-primary btn-lg">
              🚀 Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg">
              🔐 Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
