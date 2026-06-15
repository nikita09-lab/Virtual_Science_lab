import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found</h1>
      <p>🔬 Oops! Looks like you wandered outside the lab.</p>
      <button className="home-btn" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
}
