import React, { useContext, useState, useMemo } from 'react';
import { ProductContext } from '../../context/ProductContext';
import ProductCard from '../../components/ui/ProductCard';
import SearchBar from '../../components/ui/SearchBar';
import FilterSidebar from '../../components/ui/FilterSidebar';

const Products = () => {
  const { products } = useContext(ProductContext);
  
  // Controlled Inputs: State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ categories: [] });

  // Clean Code Abstraction: Extract unique categories from products
  const availableCategories = useMemo(() => {
    // Using reduce to collect unique categories
    return products.reduce((acc, product) => {
      if (!acc.includes(product.category)) {
        acc.push(product.category);
      }
      return acc;
    }, []);
  }, [products]);

  // Abstraction via HOFs: Apply filtering logic using filter and map
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Check search query
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Check category filters
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, filters]);

  return (
    <div className="main-content">
      <h2 className="section-title">All Products</h2>
      
      <SearchBar 
        value={searchQuery} 
        onChange={setSearchQuery} 
        placeholder="Search for local goods..." 
      />
      
      <div className="products-layout">
        <FilterSidebar 
          filters={filters} 
          onFilterChange={setFilters} 
          categories={availableCategories} 
        />
        
        <div className="products-content">
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                <h3>No products found</h3>
                <p>Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  className="btn-primary" 
                  style={{ display: 'inline-flex', width: 'auto', margin: '0 auto' }}
                  onClick={() => { setSearchQuery(''); setFilters({ categories: [] }); }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
