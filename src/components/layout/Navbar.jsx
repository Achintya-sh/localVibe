import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Store } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';

export const Navbar = () => {
  const { cartItems } = useContext(CartContext) || { cartItems: [] };
  const { wishlistItems } = useContext(WishlistContext) || { wishlistItems: [] };

  const cartCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const wishlistCount = wishlistItems?.length || 0;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={ROUTES.HOME} className="navbar-logo">
          <Store className="icon" />
          <span>LocalVibe</span>
        </Link>
        
        <div className="navbar-links">
          <Link to={ROUTES.PRODUCTS} className="nav-link">Shop</Link>
          <Link to={ROUTES.SELLER_DASHBOARD} className="nav-link seller-link">Seller Dashboard</Link>
        </div>

        <div className="navbar-icons">
          <Link to={ROUTES.WISHLIST} className="icon-link">
            <Heart className="icon" />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </Link>
          <Link to={ROUTES.CART} className="icon-link">
            <ShoppingCart className="icon" />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};
