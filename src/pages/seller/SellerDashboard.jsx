import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { OrderContext } from '../../context/OrderContext';

function SellerDashboard() {
  const { products } = useContext(ProductContext);
  const { orders } = useContext(OrderContext);
  const location = useLocation();

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const lowStockItems = products.filter((p) => p.stock < 5);

  return (
    <div className="main-content">
      <div className="seller-layout">
        <nav className="seller-sidebar">
          <h3>Seller Menu</h3>
          <Link
            to="/seller/dashboard"
            className={`sidebar-link ${location.pathname === '/seller/dashboard' ? 'active' : ''}`}
          >
            📊 Dashboard
          </Link>
          <Link
            to="/seller/products"
            className={`sidebar-link ${location.pathname === '/seller/products' ? 'active' : ''}`}
          >
            📦 Products
          </Link>
          <Link
            to="/seller/products/add"
            className={`sidebar-link ${location.pathname === '/seller/products/add' ? 'active' : ''}`}
          >
            ➕ Add Product
          </Link>
          <Link
            to="/seller/orders"
            className={`sidebar-link ${location.pathname === '/seller/orders' ? 'active' : ''}`}
          >
            🧾 Orders
          </Link>
        </nav>

        <div className="seller-main">
          <div className="page-header">
            <h1>Seller Dashboard</h1>
            <p>Welcome back! Here's an overview of your store.</p>
          </div>

          <div className="dashboard-cards">
            <div className="dash-card">
              <div className="dash-card-icon">📦</div>
              <div className="dash-card-value">{totalProducts}</div>
              <div className="dash-card-label">Total Products</div>
            </div>

            <div className="dash-card">
              <div className="dash-card-icon">🧾</div>
              <div className="dash-card-value">{totalOrders}</div>
              <div className="dash-card-label">Total Orders</div>
            </div>

            <div className="dash-card">
              <div className="dash-card-icon">⚠️</div>
              <div className="dash-card-value">{lowStockItems.length}</div>
              <div className="dash-card-label">Low Stock Items</div>
            </div>
          </div>

          {lowStockItems.length > 0 && (
            <div className="product-table-wrapper">
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Stock</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockItems.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="product-name-cell">
                          <div className="product-thumb">📦</div>
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td className="stock-low">{product.stock} left</td>
                      <td>${product.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
