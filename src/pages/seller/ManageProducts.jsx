import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { formatCurrency } from '../../utils/formatCurrency';

function ManageProducts() {
  const { products, deleteProduct } = useContext(ProductContext);
  const location = useLocation();
  const navigate = useNavigate();

  function handleDelete(productId) {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      deleteProduct(productId);
    }
  }

  function handleEdit(productId) {
    navigate(`/seller/products/edit/${productId}`);
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
          <div className="manage-header">
            <h1>Manage Products</h1>
            <Link to="/seller/products/add" className="btn-primary" style={{ width: 'auto' }}>+ Add Product</Link>
          </div>

          {products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📦</div>
              <h2>No products yet</h2>
              <p>Start by adding your first product to the store.</p>
              <Link to="/seller/products/add" className="btn-primary">Add Product</Link>
            </div>
          ) : (
            <div className="product-table-wrapper">
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="product-name-cell">
                          <div className="product-thumb">📦</div>
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td>{formatCurrency(product.price)}</td>
                      <td>{product.category}</td>
                      <td className={product.stock < 5 ? 'stock-low' : ''}>{product.stock}</td>
                      <td>
                        <div className="product-actions">
                          <button className="btn-secondary" onClick={() => handleEdit(product.id)}>Edit</button>
                          <button className="btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                        </div>
                      </td>
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

export default ManageProducts;
