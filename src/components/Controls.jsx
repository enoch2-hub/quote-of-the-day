import './Controls.css';

const Controls = ({ onNewQuoteClick, onAddToFavoritesClick, onSetDailyFocusClick, onToggleTheme, isLoading, currentTheme }) => {
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

      {/* <button 
        onClick={onSetDailyFocusClick}
        className="set-daily-focus-btn"
      >
        Set Daily Focus
      </button> */}
      
      {/* New button to toggle theme */}
      <button 
        onClick={onToggleTheme}
        className="toggle-theme-btn"
      >
        {currentTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </div>
  );
};

export default Controls;