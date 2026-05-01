export const generateOrderId = () => {
  return 'ORD-' + Math.floor(1000 + Math.random() * 9000);
};
