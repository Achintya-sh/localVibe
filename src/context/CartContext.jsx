import React, { createContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cartService.getCart());
  }, []);

  const addToCart = (product, quantity = 1) => {
    const newCart = [...cartItems];
    const existingIndex = newCart.findIndex(item => item.productId === product.id);
    
    if (existingIndex >= 0) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
    }
    
    setCartItems(newCart);
    cartService.saveCart(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = cartItems.filter(item => item.productId !== productId);
    setCartItems(newCart);
    cartService.saveCart(newCart);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);
    
    const newCart = cartItems.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    );
    setCartItems(newCart);
    cartService.saveCart(newCart);
  };

  const clearCart = () => {
    setCartItems([]);
    cartService.clearCart();
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
