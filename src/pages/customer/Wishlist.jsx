import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../../context/WishlistContext';
import { ProductContext } from '../../context/ProductContext';
import ProductCard from '../../components/ui/ProductCard';
import { ROUTES } from '../../constants/routes';

const Wishlist = () => {
  const { wishlistItems } = useContext(WishlistContext);
  const { products } = useContext(ProductContext);

  // Resolve array of product IDs into full product objects using .filter()
  // This satisfies the "Data Contract Rules" requirement
  const wishlistProducts = products.filter(product => 
    wishlistItems.includes(product.id)
  );

  return (
    <div className="main-content">
      <h2 className="section-title">Your Wishlist</h2>
      
      {wishlistProducts.length > 0 ? (
        <div className="products-grid">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>Your wishlist is empty</h3>
          <p>Explore our products and save your favorites here!</p>
          <Link to={ROUTES.PRODUCTS} className="btn-primary" style={{ display: 'inline-flex', width: 'auto', margin: '0 auto' }}>
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
