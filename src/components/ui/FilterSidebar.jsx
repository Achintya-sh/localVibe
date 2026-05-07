import React from 'react';

const FilterSidebar = ({ filters, onFilterChange, categories = [] }) => {
  // Controlled Component logic: updating object state without overwriting
  const handleCategoryChange = (category) => {
    const currentCategories = filters.categories || [];
    let newCategories;
    
    if (currentCategories.includes(category)) {
      newCategories = currentCategories.filter(c => c !== category);
    } else {
      newCategories = [...currentCategories, category];
    }
    
    // Spread the old state first to avoid overwriting data
    onFilterChange({
      ...filters,
      categories: newCategories
    });
  };

  return (
    <aside className="products-sidebar">
      <div className="section-title" style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>
        Filters
      </div>
      
      <div className="filter-group">
        <h4>Categories</h4>
        {categories.length > 0 ? (
          categories.map(category => (
            <label key={category} className="filter-label">
              <input 
                type="checkbox" 
                className="filter-checkbox"
                checked={(filters.categories || []).includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))
        ) : (
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>No categories available</p>
        )}
      </div>
    </aside>
  );
};

export default FilterSidebar;
