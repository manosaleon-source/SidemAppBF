import client from '../client';

// Map frontend order creation to backend `/ventas` API
export const fetchOrders = async () => {
  const response = await client.get('/ventas');
  return response.data;
};
export const getOrders = fetchOrders;

export const getSalesData = async () => {
  try {
    const response = await client.get('/ventas');
    return response.data;
  } catch (err) {
    // Backend returns 404 if not implemented
    return [];
  }
};

export const createOrder = async (orderData) => {
  // front-end sends an orderData that should include cabecera and items, but if it's a simple cart payload provide mapping
  // Ensure we send { cabecera, items } to backend
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

export const updateOrder = async (orderId, orderData) => {
  const response = await client.put(`/ventas/${orderId}`, orderData);
  return response.data;
};

export const deleteOrder = async (orderId) => {
  const response = await client.delete(`/ventas/${orderId}`);
  return response.data;
};