import React, { createContext, useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productService.getProducts());
  }, []);

  const addProduct = (product) => {
    const newProduct = productService.addProduct(product);
    setProducts(productService.getProducts());
    return newProduct;
  };

  const updateProduct = (id, updatedProduct) => {
    productService.updateProduct(id, updatedProduct);
    setProducts(productService.getProducts());
  };

  const deleteProduct = (id) => {
    productService.deleteProduct(id);
    setProducts(productService.getProducts());
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
