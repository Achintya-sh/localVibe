import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import ProductCard from '../../components/ui/ProductCard';
import { ROUTES } from '../../constants/routes';

const Home = () => {
  const { products } = useContext(ProductContext);

  // Abstraction via HOFs: using .filter() and .map()
  // Select top rated products to feature
  const featuredProducts = products
    .filter(product => product.rating >= 4.5)
    .slice(0, 4); // Show up to 4 featured products

  return (
    <div className="main-content">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Support Local Artisans</h1>
        <p>Discover unique, handmade, and locally sourced products crafted with passion by people in your community.</p>
        <Link to={ROUTES.PRODUCTS} className="hero-btn">
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.length > 0 ? (
            featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Loading featured products...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
