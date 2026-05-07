import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { products, updateProduct } = useContext(ProductContext);

  const existingProduct = products.find((p) => p.id === Number(id));

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [seller, setSeller] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  // fill form with existing data
  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name || '');
      setCategory(existingProduct.category || '');
      setPrice(String(existingProduct.price || ''));
      setStock(String(existingProduct.stock || ''));
      setSeller(existingProduct.seller || '');
      setDescription(existingProduct.description || '');
      setImage(existingProduct.image || '');
    }
  }, [existingProduct]);

  if (!existingProduct) {
    return (
      <div className="main-content">
        <div className="empty-state">
          <div className="empty-state-icon">❓</div>
          <h2>Product not found</h2>
          <p>The product you're trying to edit doesn't exist.</p>
          <Link to="/seller/products" className="btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedData = {
      name,
      category,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      seller,
      description,
      image: image || '/assets/placeholder.jpg',
    };

    updateProduct(existingProduct.id, updatedData);
    navigate('/seller/products');
  }

  return (
    <div className="main-content">
      <div className="seller-layout">
        <nav className="seller-sidebar">
          <h3>Seller Menu</h3>
          <Link to="/seller/dashboard" className={`sidebar-link ${location.pathname === '/seller/dashboard' ? 'active' : ''}`}>📊 Dashboard</Link>
          <Link to="/seller/products" className={`sidebar-link ${location.pathname.startsWith('/seller/products') ? 'active' : ''}`}>📦 Products</Link>
          <Link to="/seller/products/add" className={`sidebar-link ${location.pathname === '/seller/products/add' ? 'active' : ''}`}>➕ Add Product</Link>
          <Link to="/seller/orders" className={`sidebar-link ${location.pathname === '/seller/orders' ? 'active' : ''}`}>🧾 Orders</Link>
        </nav>

        <div className="seller-main">
          <div className="page-header">
            <h1>Edit Product</h1>
            <p>Update the details for "{existingProduct.name}".</p>
          </div>

          <form className="form-card" onSubmit={handleSubmit}>
            <h2>Product Details</h2>

            <div className="form-group">
              <label htmlFor="editName">Product Name</label>
              <input id="editName" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="editCategory">Category</label>
                <input id="editCategory" type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="editSeller">Seller / Brand</label>
                <input id="editSeller" type="text" value={seller} onChange={(e) => setSeller(e.target.value)} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="editPrice">Price ($)</label>
                <input id="editPrice" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="editStock">Stock Quantity</label>
                <input id="editStock" type="number" min="0" step="1" value={stock} onChange={(e) => setStock(e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="editImage">Image URL</label>
              <input id="editImage" type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="editDescription">Description</label>
              <textarea id="editDescription" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <button type="submit" className="btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
