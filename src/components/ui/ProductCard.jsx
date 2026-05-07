import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import RatingStars from './RatingStars';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  
  if (!product) return null;

  const isWished = isInWishlist(product.id);

  // Side Effect Management: Only trigger external state updates on user action
  const handleWishlistToggle = (e) => {
    e.preventDefault(); // Prevent navigating to product details
    if (isWished) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product.id, 1);
  };

  // Safe fallback for image
  const imageSrc = product.image || `https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}`;

  return (
    <Link to={ROUTES.PRODUCT_DETAILS.replace(':id', product.id)} className="product-card">
      <div className="product-image-container">
        <img src={imageSrc} alt={product.name} className="product-image" loading="lazy" />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        <RatingStars rating={product.rating} />
        <div className="product-price">${Number(product.price).toFixed(2)}</div>
        <div className="product-actions">
          <button className="btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button 
            className={`btn-icon ${isWished ? 'active' : ''}`} 
            onClick={handleWishlistToggle}
            aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWished ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
