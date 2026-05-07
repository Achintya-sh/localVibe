import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { OrderContext } from '../../context/OrderContext';
import OrderCard from '../../components/ui/OrderCard';

function ManageOrders() {
  const { orders, updateOrderStatus } = useContext(OrderContext);
  const location = useLocation();

  const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  function handleStatusChange(orderId, newStatus) {
    updateOrderStatus(orderId, newStatus);
  }

  return (
    <div className="main-content">
      <div className="seller-layout">
        <nav className="seller-sidebar">
          <h3>Seller Menu</h3>
          <Link to="/seller/dashboard" className={`sidebar-link ${location.pathname === '/seller/dashboard' ? 'active' : ''}`}>📊 Dashboard</Link>
          <Link to="/seller/products" className={`sidebar-link ${location.pathname === '/seller/products' ? 'active' : ''}`}>📦 Products</Link>
          <Link to="/seller/products/add" className={`sidebar-link ${location.pathname === '/seller/products/add' ? 'active' : ''}`}>➕ Add Product</Link>
          <Link to="/seller/orders" className={`sidebar-link ${location.pathname === '/seller/orders' ? 'active' : ''}`}>🧾 Orders</Link>
        </nav>

        <div className="seller-main">
          <div className="page-header">
            <h1>Manage Orders</h1>
            <p>{orders.length} order{orders.length !== 1 ? 's' : ''} total</p>
          </div>

          {orders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🧾</div>
              <h2>No orders yet</h2>
              <p>Orders will appear here once customers place them.</p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order}>
                  <div className="order-manage-footer">
                    <label htmlFor={`status-${order.id}`} style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                      Update Status:
                    </label>
                    <select
                      id={`status-${order.id}`}
                      className="order-status-select"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </OrderCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageOrders;
