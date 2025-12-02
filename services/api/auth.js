import client from '../client';

export const login = async (username, password) => {
  // backend expects username (campo 'usuario') and password
  const response = await client.post('/auth/login', { username, password });
  return response.data;
};

export const logout = async () => {
  const response = await client.post('/auth/logout');
  return response.data;
};

export const register = async (userData) => {
  const response = await client.post('/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await client.get('/auth/me');
  return response.data;
};