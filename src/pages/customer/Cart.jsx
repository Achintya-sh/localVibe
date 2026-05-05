import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';

function Cart() {
  const { getCartDetails, updateQuantity, removeFromCart, subtotal } =
    useContext(CartContext);

  const cartDetails = getCartDetails();

  // empty cart
  if (cartDetails.length === 0) {
    return (
      <div className="main-content">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  function handleIncrease(productId) {
    const item = cartDetails.find((i) => i.productId === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  }

  function handleDecrease(productId) {
    const item = cartDetails.find((i) => i.productId === productId);
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    }
  }

  function handleRemove(productId) {
    removeFromCart(productId);
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <h1>Shopping Cart</h1>
        <p>{cartDetails.length} item{cartDetails.length !== 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="cart-page">
        <div className="cart-items-list">
          {cartDetails.map((item) => (
            <div className="cart-item-card" key={item.productId}>
              <div className="cart-item-image">🛍️</div>

              <div className="cart-item-details">
                <h3>{item.name || 'Unknown Product'}</h3>
                <div className="item-seller">{item.seller || ''}</div>
                <div className="item-price">{formatCurrency(item.price || 0)}</div>
              </div>

              <div className="cart-quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() => handleDecrease(item.productId)}
                >
                  −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => handleIncrease(item.productId)}
                >
                  +
                </button>
              </div>

              <button
                className="cart-item-remove"
                onClick={() => handleRemove(item.productId)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          {cartDetails.map((item) => (
            <div className="summary-row" key={item.productId}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatCurrency((item.price || 0) * item.quantity)}</span>
            </div>
          ))}

          <div className="summary-row total">
            <span>Total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <Link to="/checkout" className="btn-primary" style={{ marginTop: '1.25rem' }}>
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
