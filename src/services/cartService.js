import { STORAGE_KEYS } from '../constants/storageKeys';

export const cartService = {
  getCart: () => {
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
    return cart ? JSON.parse(cart) : [];
  },

  saveCart: (cart) => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  },

  clearCart: () => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
  }
};
