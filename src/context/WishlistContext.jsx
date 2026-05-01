import React, { createContext, useState, useEffect } from 'react';
import { wishlistService } from '../services/wishlistService';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    setWishlistItems(wishlistService.getWishlist());
  }, []);

  const addToWishlist = (product) => {
    if (!wishlistItems.find(item => item.id === product.id)) {
      const newWishlist = [...wishlistItems, product];
      setWishlistItems(newWishlist);
      wishlistService.saveWishlist(newWishlist);
    }
  };

  const removeFromWishlist = (productId) => {
    const newWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(newWishlist);
    wishlistService.saveWishlist(newWishlist);
  };

  const isInWishlist = (productId) => {
    return !!wishlistItems.find(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
