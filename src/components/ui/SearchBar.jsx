import React from 'react';

const SearchBar = ({ value, onChange, placeholder = "Search products..." }) => {
  // Controlled Component: State is managed by the parent via value and onChange props
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="search-container">
      <span className="search-icon" aria-hidden="true">🔍</span>
      <input 
        type="text" 
        className="search-input" 
        placeholder={placeholder} 
        value={value} 
        onChange={handleChange}
        aria-label="Search products"
      />
    </div>
  );
};

export default SearchBar;
