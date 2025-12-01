import client from '../client';

export const getCustomers = async () => {
  const response = await client.get('/customers');
  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await client.get(`/customers/${id}`);
  return response.data;
};

export const createCustomer = async (customerData) => {
  const response = await client.post('/customers', customerData);
  return response.data;
};

export const updateCustomer = async (id, customerData) => {
  const response = await client.put(`/customers/${id}`, customerData);
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await client.delete(`/customers/${id}`);
  return response.data;
};