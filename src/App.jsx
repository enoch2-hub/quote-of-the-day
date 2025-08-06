import { useState, useEffect } from 'react';
import QuoteDisplay from './components/QuoteDisplay';
import Controls from './components/Controls';
import FavoritesList from './components/FavoritesList';
import DailyFocus from './components/DailyFocus'; // This is the missing import
import './styles/App.css';

function App() {
  const [quote, setQuote] = useState({ text: 'Finding inspiration...', author: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [dailyFocus, setDailyFocus] = useState(null);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  useEffect(() => {
    fetchNewQuote();

    const savedFavorites = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
    setFavorites(savedFavorites);
    
    const savedDailyFocus = JSON.parse(localStorage.getItem('dailyFocus'));
    setDailyFocus(savedDailyFocus);
  }, []);

  const fetchNewQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote({
        text: data.content,
        author: data.author
      });
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      setQuote({ text: 'Failed to load quote. Please try again.', author: '' });
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = () => {
    const isAlreadyFavorite = favorites.some(fav => fav.text === quote.text);
    if (!isAlreadyFavorite) {
      const newFavorites = [...favorites, quote];
      setFavorites(newFavorites);
      localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (quoteToRemove) => {
    const newFavorites = favorites.filter(fav => fav.text !== quoteToRemove.text);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
  };
  
  const setDailyFocusQuote = () => {
    setDailyFocus(quote);
    localStorage.setItem('dailyFocus', JSON.stringify(quote));
  };

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <div className={`app-container ${theme}-theme`}>

      <button 
        onClick={toggleTheme}
        className="toggle-theme-btn"
      >
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>


      <header>
        <h1>Quote of the Day</h1>
      </header>

      <DailyFocus dailyFocus={dailyFocus} />

      <main>
        {isLoading ? (
          <p className="loading-message">Loading new quote...</p>
        ) : (
          <QuoteDisplay text={quote.text} author={quote.author} />
        )}
        <Controls 
          onNewQuoteClick={fetchNewQuote} 
          onAddToFavoritesClick={addToFavorites}
          onSetDailyFocusClick={setDailyFocusQuote}
          // onToggleTheme={toggleTheme}
          isLoading={isLoading} 
          // currentTheme={theme}
        />
        <FavoritesList 
          favorites={favorites} 
          onRemoveFromFavorites={removeFromFavorites} 
        />
      </main>
    </div>
  );
}

export default App;