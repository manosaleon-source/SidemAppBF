import client from '../client';

export const login = async (username: string, password: string) => {
  const response = await client.post('/auth/login', { username, password });
  return response.data;
};

export const logout = async () => {
  const response = await client.post('/auth/logout');
  return response.data;
};

export const register = async (userData: any) => {
  const response = await client.post('/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await client.get('/auth/me');
  return response.data;
};

export default { login, logout, register, getCurrentUser };
