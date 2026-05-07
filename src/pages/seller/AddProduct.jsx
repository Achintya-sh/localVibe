import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';

function AddProduct() {
  const { addProduct } = useContext(ProductContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [seller, setSeller] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const newProduct = {
      name,
      category,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      seller,
      description,
      image: image || '/assets/placeholder.jpg',
      rating: 0,
      reviews: [],
    };

    addProduct(newProduct);

    setSuccessMessage(`"${name}" has been added successfully!`);
    setName('');
    setCategory('');
    setPrice('');
    setStock('');
    setSeller('');
    setDescription('');
    setImage('');

    setTimeout(() => setSuccessMessage(''), 4000);
  }

  return (
    <div className="main-content">
      <div className="seller-layout">
        <nav className="seller-sidebar">
          <h3>Seller Menu</h3>
          <Link to="/seller/dashboard" className={`sidebar-link ${location.pathname === '/seller/dashboard' ? 'active' : ''}`}>📊 Dashboard</Link>
          <Link to="/seller/products" className={`sidebar-link ${location.pathname === '/seller/products' ? 'active' : ''}`}>📦 Products</Link>
          <Link to="/seller/products/add" className={`sidebar-link ${location.pathname.startsWith('/seller/products/add') ? 'active' : ''}`}>➕ Add Product</Link>
          <Link to="/seller/orders" className={`sidebar-link ${location.pathname === '/seller/orders' ? 'active' : ''}`}>🧾 Orders</Link>
        </nav>

        <div className="seller-main">
          <div className="page-header">
            <h1>Add New Product</h1>
            <p>Fill in the details to list a new product in your store.</p>
          </div>

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          <form className="form-card" onSubmit={handleSubmit}>
            <h2>Product Details</h2>

            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <input id="productName" type="text" placeholder="e.g. Handmade Ceramic Mug" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="productCategory">Category</label>
                <input id="productCategory" type="text" placeholder="e.g. Home Decor" value={category} onChange={(e) => setCategory(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="productSeller">Seller / Brand</label>
                <input id="productSeller" type="text" placeholder="e.g. ClayCraft Studio" value={seller} onChange={(e) => setSeller(e.target.value)} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="productPrice">Price ($)</label>
                <input id="productPrice" type="number" min="0" step="0.01" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="productStock">Stock Quantity</label>
                <input id="productStock" type="number" min="0" step="1" placeholder="0" value={stock} onChange={(e) => setStock(e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="productImage">Image URL (optional)</label>
              <input id="productImage" type="text" placeholder="/assets/my-product.jpg" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="productDescription">Description</label>
              <textarea id="productDescription" placeholder="Describe your product..." value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <button type="submit" className="btn-primary">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
