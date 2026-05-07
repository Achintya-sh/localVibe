import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import RatingStars from '../../components/ui/RatingStars';
import { ROUTES } from '../../constants/routes';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  // Find specific product object from ProductContext
  const product = products.find(p => p.id === parseInt(id, 10));

  if (!product) {
    return (
      <div className="main-content">
        <div className="empty-state">
          <h3>Product Not Found</h3>
          <p>The product you are looking for does not exist or has been removed.</p>
          <Link to={ROUTES.PRODUCTS} className="btn-primary" style={{ display: 'inline-flex', width: 'auto', margin: '0 auto' }}>
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const isWished = isInWishlist(product.id);

  // Side Effect Management
  const handleWishlistToggle = () => {
    if (isWished) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = () => {
    addToCart(product.id, 1);
  };

  const imageSrc = product.image || `https://via.placeholder.com/600x400?text=${encodeURIComponent(product.name)}`;

  return (
    <div className="main-content">
      <Link to={ROUTES.PRODUCTS} style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--text-light)', fontWeight: '600' }}>
        ← Back to Products
      </Link>
      
      <div className="product-details-container">
        <div className="details-image-wrapper">
          <img src={imageSrc} alt={product.name} className="details-image" />
        </div>
        
        <div className="details-info">
          <div className="details-category">{product.category}</div>
          <h1 className="details-title">{product.name}</h1>
          
          <RatingStars rating={product.rating} />
          
          <div className="details-price">${Number(product.price).toFixed(2)}</div>
          
          <p className="details-description">{product.description}</p>
          
          <div className="details-meta">
            <div className="meta-item">
              <span className="meta-label">Seller</span>
              <span>{product.seller || "Local Vendor"}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Availability</span>
              <span style={{ color: product.stock > 0 ? 'var(--success-color)' : 'var(--error-color)', fontWeight: '600' }}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>
          
          <div className="details-actions">
            <button 
              className="btn-primary btn-large" 
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              Add to Cart
            </button>
            <button 
              className={`btn-icon ${isWished ? 'active' : ''}`} 
              style={{ width: 'auto', padding: '0 1.5rem', fontSize: '1.5rem' }}
              onClick={handleWishlistToggle}
              aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isWished ? '♥' : '♡'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
