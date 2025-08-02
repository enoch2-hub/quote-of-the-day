import React from 'react';
import './Controls.css';

// We added onAddToFavoritesClick as a new prop
const Controls = ({ onNewQuoteClick, onAddToFavoritesClick, isLoading }) => {
  return (
    <div className="controls-container">
      <button 
        onClick={onNewQuoteClick} 
        disabled={isLoading}
        className="new-quote-btn"
      >
        {isLoading ? 'Loading...' : 'New Quote'}
      </button>
      
      <button 
        onClick={onAddToFavoritesClick}
        className="add-to-favorites-btn"
      >
        Add to Favorites
      </button>
    </div>
  );
};

export default Controls;