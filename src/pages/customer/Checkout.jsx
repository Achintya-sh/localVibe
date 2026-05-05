import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { OrderContext } from '../../context/OrderContext';
import { formatCurrency } from '../../utils/formatCurrency';

function Checkout() {
  const navigate = useNavigate();
  const { getCartDetails, subtotal, clearCart } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);

  // form fields
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  const [placedOrder, setPlacedOrder] = useState(null);

  const cartDetails = getCartDetails();

  function handleSubmit(e) {
    e.preventDefault();

    const items = cartDetails.map((item) => ({
      productId: item.productId,
      name: item.name || 'Unknown',
      quantity: item.quantity,
      price: item.price || 0,
    }));

    const orderData = {
      customerName,
      email,
      address: `${address}, ${city}, ${zipCode}`,
      items,
      total: subtotal,
    };

    const newOrder = createOrder(orderData);
    clearCart();
    setPlacedOrder(newOrder);
  }

  // show success after placing order
  if (placedOrder) {
    return (
      <div className="main-content">
        <div className="order-success">
          <div className="order-success-icon">🎉</div>
          <h2>Order Placed!</h2>
          <p>Thank you for shopping with LocalVibe.</p>
          <div className="order-id-display">{placedOrder.id}</div>
          <p>Save this Order ID to track your delivery.</p>
          <Link to={`/orders/${placedOrder.id}`} className="btn-primary">
            Track My Order
          </Link>
        </div>
      </div>
    );
  }

  // nothing in cart
  if (cartDetails.length === 0) {
    return (
      <div className="main-content">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h2>Nothing to checkout</h2>
          <p>Add some products to your cart first.</p>
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <h1>Checkout</h1>
        <p>Complete your order by filling in the details below.</p>
      </div>

      <div className="checkout-page">
        <form className="checkout-form-section" onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>

          <div className="form-group">
            <label htmlFor="customerName">Full Name</label>
            <input
              id="customerName"
              type="text"
              placeholder="John Doe"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Street Address</label>
            <input
              id="address"
              type="text"
              placeholder="123 Main St"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                placeholder="New York"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                id="zipCode"
                type="text"
                placeholder="10001"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Place Order — {formatCurrency(subtotal)}
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Your Cart</h2>

          {cartDetails.map((item) => (
            <div className="checkout-item" key={item.productId}>
              <span className="checkout-item-name">{item.name}</span>
              <span className="checkout-item-qty">×{item.quantity}</span>
              <span className="checkout-item-price">
                {formatCurrency((item.price || 0) * item.quantity)}
              </span>
            </div>
          ))}

          <div className="summary-row total">
            <span>Total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
