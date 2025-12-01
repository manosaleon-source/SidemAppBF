import client from '../client';

export const fetchOrders = async () => {
  const response = await client.get('/orders');
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await client.post('/orders', orderData);
  return response.data;
};

export const updateOrder = async (orderId, orderData) => {
  const response = await client.put(`/orders/${orderId}`, orderData);
  return response.data;
};

export const deleteOrder = async (orderId) => {
  const response = await client.delete(`/orders/${orderId}`);
  return response.data;
};