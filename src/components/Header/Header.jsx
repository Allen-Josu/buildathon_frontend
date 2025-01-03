// src/components/Header/Header.jsx
import React from 'react';
import './Header.css'; // CSS for styling

const Header = () => {
  return (
    <div>
      {/* Header with Navigation Links */}
      <header className="header">
        <div className="header-logo">
          <h1>Edubuddy</h1>
        </div>
        <nav className="header-nav">
          <ul>
            <li><a href="#notes">Notes</a></li>
            <li><a href="#grade-predictor">Grade Predictor</a></li>
            <li><a href="#model-question-paper">Model Question Paper</a></li>
            <li><a href="#pyq">PYQ</a></li>
            <li><a href="#attendance-calculator">Attendance Calculator</a></li>
          </ul>
        </nav>
        <button className="signin-btn">Sign In</button>
      </header>

      {/* Sections that will be scrolled to */}
      
    </div>
  );
};

export default Header;
