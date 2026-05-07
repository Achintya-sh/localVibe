import React from 'react';

const RatingStars = ({ rating }) => {
  const normalizedRating = Math.max(0, Math.min(5, Math.round(rating || 0)));
  
  // Clean Code Abstraction: Generate an array of 5 elements and map over it
  return (
    <div className="rating-stars" aria-label={`Rating: ${normalizedRating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const isFilled = index < normalizedRating;
        return (
          <span 
            key={index} 
            className={isFilled ? 'star-filled' : 'star-empty'}
            aria-hidden="true"
          >
            {isFilled ? '★' : '☆'}
          </span>
        );
      })}
      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginLeft: '0.5rem', alignSelf: 'center' }}>
        {rating?.toFixed(1)}
      </span>
    </div>
  );
};

export default RatingStars;
