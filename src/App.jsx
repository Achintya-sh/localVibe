import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ROUTES } from './constants/routes';

// Placeholder Components for teammates to fill in
const Home = () => <div className="main-content"><h2>Home Page</h2><p>Member 2 will build this.</p></div>;
const Products = () => <div className="main-content"><h2>Products</h2><p>Member 2 will build this.</p></div>;
const ProductDetails = () => <div className="main-content"><h2>Product Details</h2><p>Member 2 will build this.</p></div>;
const Wishlist = () => <div className="main-content"><h2>Wishlist</h2><p>Member 2 will build this.</p></div>;

// my pages (member 3)
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderTracking from './pages/customer/OrderTracking';


import SellerDashboard from './pages/seller/SellerDashboard';
import ManageProducts from './pages/seller/ManageProducts';
import AddProduct from './pages/seller/AddProduct';
import EditProduct from './pages/seller/EditProduct';
import ManageOrders from './pages/seller/ManageOrders';

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
