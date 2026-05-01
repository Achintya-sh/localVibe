import { STORAGE_KEYS } from '../constants/storageKeys';
import { generateOrderId } from '../utils/generateOrderId';

export const orderService = {
  getOrders: () => {
    const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return orders ? JSON.parse(orders) : [];
  },

  createOrder: (orderData) => {
    const orders = orderService.getOrders();
    const newOrder = {
      ...orderData,
      id: generateOrderId(),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([...orders, newOrder]));
    return newOrder;
  },

  updateOrderStatus: (orderId, status) => {
    const orders = orderService.getOrders();
    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status } : o
    );
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedOrders));
  }
};
