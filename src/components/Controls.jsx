import React from 'react';
import './Controls.css';

// This component receives a function (onNewQuoteClick) as a prop.
// This is how we pass behavior down from a parent to a child component.
const Controls = ({ onNewQuoteClick, isLoading }) => {
  return (
    <div className="controls-container">
      <button 
        onClick={onNewQuoteClick} 
        disabled={isLoading}
        className="new-quote-btn"
      >
        {isLoading ? 'Loading...' : 'New Quote'}
      </button>
    </div>
  );
};

export default Controls;