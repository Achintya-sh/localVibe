import { STORAGE_KEYS } from '../constants/storageKeys';
import { initialProducts } from '../data/products';

export const productService = {
  getProducts: () => {
    const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!products) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
      return initialProducts;
    }
    return JSON.parse(products);
  },
  
  getProductById: (id) => {
    const products = productService.getProducts();
    return products.find(p => p.id === Number(id));
  },

  addProduct: (product) => {
    const products = productService.getProducts();
    const newProduct = {
      ...product,
      id: Date.now()
    };
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([...products, newProduct]));
    return newProduct;
  },

  updateProduct: (id, updatedProduct) => {
    const products = productService.getProducts();
    const newProducts = products.map(p => p.id === Number(id) ? { ...p, ...updatedProduct } : p);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(newProducts));
  },

  deleteProduct: (id) => {
    const products = productService.getProducts();
    const newProducts = products.filter(p => p.id !== Number(id));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(newProducts));
  }
};
