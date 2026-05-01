import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ROUTES } from './constants/routes';

// Placeholder Components for teammates to fill in
const Home = () => <div className="main-content"><h2>Home Page</h2><p>Member 2 will build this.</p></div>;
const Products = () => <div className="main-content"><h2>Products</h2><p>Member 2 will build this.</p></div>;
const ProductDetails = () => <div className="main-content"><h2>Product Details</h2><p>Member 2 will build this.</p></div>;
const Cart = () => <div className="main-content"><h2>Cart</h2><p>Member 3 will build this.</p></div>;
const Wishlist = () => <div className="main-content"><h2>Wishlist</h2><p>Member 2 will build this.</p></div>;
const Checkout = () => <div className="main-content"><h2>Checkout</h2><p>Member 3 will build this.</p></div>;
const OrderTracking = () => <div className="main-content"><h2>Order Tracking</h2><p>Member 3 will build this.</p></div>;
const SellerDashboard = () => <div className="main-content"><h2>Seller Dashboard</h2><p>Member 3 will build this.</p></div>;
const ManageProducts = () => <div className="main-content"><h2>Manage Products</h2><p>Member 3 will build this.</p></div>;
const AddProduct = () => <div className="main-content"><h2>Add Product</h2><p>Member 3 will build this.</p></div>;
const EditProduct = () => <div className="main-content"><h2>Edit Product</h2><p>Member 3 will build this.</p></div>;
const ManageOrders = () => <div className="main-content"><h2>Manage Orders</h2><p>Member 3 will build this.</p></div>;

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.PRODUCTS} element={<Products />} />
        <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.WISHLIST} element={<Wishlist />} />
        <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
        <Route path={ROUTES.ORDER_TRACKING} element={<OrderTracking />} />
        
        {/* Seller Routes */}
        <Route path={ROUTES.SELLER_DASHBOARD} element={<SellerDashboard />} />
        <Route path={ROUTES.SELLER_PRODUCTS} element={<ManageProducts />} />
        <Route path={ROUTES.SELLER_ADD_PRODUCT} element={<AddProduct />} />
        <Route path={ROUTES.SELLER_EDIT_PRODUCT} element={<EditProduct />} />
        <Route path={ROUTES.SELLER_ORDERS} element={<ManageOrders />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
