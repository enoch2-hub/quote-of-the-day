import { useState, useEffect } from 'react';
import QuoteDisplay from './components/QuoteDisplay';
import Controls from './components/Controls';
import FavoritesList from './components/FavoritesList'; // We will create this next
import './styles/App.css';

function App() {
  const [quote, setQuote] = useState({ text: 'Finding inspiration...', author: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  // New state to hold our list of favorite quotes
  const [favorites, setFavorites] = useState([]);

  // useEffect now has two responsibilities:
  // 1. Fetching the initial quote.
  // 2. Loading saved favorites from local storage.
  useEffect(() => {
    fetchNewQuote();

    const savedFavorites = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
    setFavorites(savedFavorites);
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

  // New function to add the current quote to favorites
  const addToFavorites = () => {
    // Check if the quote is already in favorites to prevent duplicates
    const isAlreadyFavorite = favorites.some(fav => fav.text === quote.text);
    if (!isAlreadyFavorite) {
      const newFavorites = [...favorites, quote];
      setFavorites(newFavorites);
      localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
    }
  };

  // New function to remove a quote from favorites
  const removeFromFavorites = (quoteToRemove) => {
    const newFavorites = favorites.filter(fav => fav.text !== quoteToRemove.text);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
  };

  return (
    <div className="app-container">
      <header>
        <h1>Quote of the Day</h1>
      </header>
      <main>
        {isLoading ? (
          <p className="loading-message">Loading new quote...</p>
        ) : (
          <QuoteDisplay text={quote.text} author={quote.author} />
        )}
        <Controls 
          onNewQuoteClick={fetchNewQuote} 
          onAddToFavoritesClick={addToFavorites}
          isLoading={isLoading} 
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