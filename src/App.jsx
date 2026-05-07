import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ROUTES } from './constants/routes';

// Member 2 pages (Customer Storefront)
import Home from './pages/customer/Home';
import Products from './pages/customer/Products';
import ProductDetails from './pages/customer/ProductDetails';
import Wishlist from './pages/customer/Wishlist';

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
