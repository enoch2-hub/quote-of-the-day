import { useState, useEffect } from 'react';
import QuoteDisplay from './components/QuoteDisplay';
import Controls from './components/Controls';
import './styles/App.css';

function App() {
  // State to hold the current quote and its author
  const [quote, setQuote] = useState({ text: 'Finding inspiration...', author: '' });
  // State to track if the app is currently fetching a new quote
  const [isLoading, setIsLoading] = useState(false);

  // useEffect runs once when the component mounts to fetch the initial quote
  useEffect(() => {
    fetchNewQuote();
  }, []);

  // Function to fetch a new random quote from the ZenQuotes API
  // const fetchNewQuote = async () => {
  //   setIsLoading(true); // Set loading to true while we fetch
  //   try {
  //     const response = await fetch('https://zenquotes.io/api/random');
  //     const data = await response.json();
      
  //     // ZenQuotes returns an array of one object. We must access the first element
  //     const quoteData = data[0]; 
      
  //     // ZenQuotes uses 'q' for the quote text and 'a' for the author
  //     setQuote({
  //       text: quoteData.q, 
  //       author: quoteData.a
  //     });
      
  //   } catch (error) {
  //     console.error('Failed to fetch quote:', error);
  //     setQuote({ text: 'Failed to load quote. Please try again.', author: '' });
  //   } finally {
  //     setIsLoading(false); // Set loading to false when the fetch is done
  //   }
  // };

  const fetchNewQuote = async () => {
    setIsLoading(true);
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        
        // This API returns a single object directly, not an array.
        // It uses 'content' for the quote and 'author' for the author name.
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

  return (
    <div className="app-container">
      <header>
        <h1>Quote of the Day</h1>
      </header>

      <main>
        {isLoading ? (
          <p className="loading-message">Loading new quote...</p>
        ) : (
          // Use our new QuoteDisplay component and pass it the data as props
          <QuoteDisplay text={quote.text} author={quote.author} />
        )}

        <Controls onNewQuoteClick={fetchNewQuote} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;