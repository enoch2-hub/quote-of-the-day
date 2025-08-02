import React from 'react';
import './QuoteDisplay.css';

const QuoteDisplay = ({ text, author }) => {
  return (
    <div className="quote-card">
      <p className="quote-text">"{text}"</p>
      <p className="quote-author">- {author}</p>
    </div>
  );
};

export default QuoteDisplay;