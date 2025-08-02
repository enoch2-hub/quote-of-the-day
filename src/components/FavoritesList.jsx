import React from 'react';
import './FavoritesList.css';

const FavoritesList = ({ favorites, onRemoveFromFavorites }) => {
  return (
    <div className="favorites-container">
      <h2>My Favorite Quotes</h2>
      {favorites.length > 0 ? (
        <ul className="favorites-list">
          {favorites.map((fav, index) => (
            <li key={index} className="favorite-item">
              <p className="favorite-text">"{fav.text}"</p>
              <p className="favorite-author">- {fav.author}</p>
              <button 
                onClick={() => onRemoveFromFavorites(fav)}
                className="remove-btn"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-favorites">No favorites added yet.</p>
      )}
    </div>
  );
};

export default FavoritesList;