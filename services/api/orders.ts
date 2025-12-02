import client from '../client';

export const fetchOrders = async () => {
  const response = await client.get('/ventas');
  return response.data;
};

export const createOrder = async (orderData: any) => {
  const payload = {
    cabecera: orderData.cabecera || {
      codigo: orderData.codigo || `V-${Date.now()}`,
      fecha_emision: orderData.fecha_emision || new Date().toISOString(),
      descripcion: orderData.descripcion || '',
      precio_neto: orderData.precio_neto || 0,
      igv: orderData.igv || 0,
      precio_total: orderData.precio_total || 0,
      cliente_id: orderData.cliente_id || null,
      tipo_documento_id: orderData.tipo_documento_id || 1,
      usuario_id: orderData.usuario_id || 1,
    },
    items: orderData.items || []
  };
  const response = await client.post('/ventas', payload);
  return response.data;
};

export const updateOrder = async (orderId: number, orderData: any) => {
  const response = await client.put(`/ventas/${orderId}`, orderData);
  return response.data;
};

export const deleteOrder = async (orderId: number) => {
  const response = await client.delete(`/ventas/${orderId}`);
  return response.data;
};

export const getOrders = fetchOrders;
export const getSalesData = fetchOrders;

export default { fetchOrders, createOrder, updateOrder, deleteOrder };
