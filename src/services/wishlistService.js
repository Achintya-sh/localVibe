import { STORAGE_KEYS } from '../constants/storageKeys';

export const wishlistService = {
  getWishlist: () => {
    const wishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return wishlist ? JSON.parse(wishlist) : [];
  },

  saveWishlist: (wishlist) => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }
};
