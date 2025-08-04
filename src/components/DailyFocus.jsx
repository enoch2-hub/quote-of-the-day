import React from 'react';
import './DailyFocus.css';

const DailyFocus = ({ dailyFocus }) => {
  // Conditionally render the component only if a dailyFocus quote has been set.
  // If dailyFocus is null, the component returns nothing (null).
  if (!dailyFocus) {
    return null;
  }

  return (
    <div className="daily-focus-container">
      <div className="daily-focus-card">
        <h3>Today's Focus:</h3>
        <p className="daily-focus-text">"{dailyFocus.text}"</p>
        <p className="daily-focus-author">- {dailyFocus.author}</p>
      </div>
    </div>
  );
};

export default DailyFocus;