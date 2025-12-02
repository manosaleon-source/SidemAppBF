import client from '../client';

const mapClienteToModel = (c) => ({
  id: c.id,
  documento: c.documento,
  name: `${c.nombres || ''} ${c.apellidos || ''}`.trim(),
  email: c.correo,
  telefono: c.telefono,
  direccion: c.direccion,
});

export const getCustomers = async () => {
  const response = await client.get('/clientes');
  return response.data.map(mapClienteToModel);
};

export const getCustomerById = async (id) => {
  const response = await client.get(`/clientes/${id}`);
  return mapClienteToModel(response.data);
};

export const createCustomer = async (customerData) => {
  const payload = {
    documento: customerData.documento,
    nombres: customerData.nombres || customerData.name,
    apellidos: customerData.apellidos || '',
    telefono: customerData.telefono || customerData.phone,
    correo: customerData.email || customerData.correo,
    direccion: customerData.direccion || customerData.address,
    tipo_documento_entidad_id: customerData.tipo_documento_entidad_id || 1,
  };
  const response = await client.post('/clientes', payload);
  return mapClienteToModel(response.data);
};

export const updateCustomer = async (id, customerData) => {
  const payload = {};
  if (customerData.nombres) payload.nombres = customerData.nombres;
  if (customerData.apellidos) payload.apellidos = customerData.apellidos;
  if (customerData.telefono) payload.telefono = customerData.telefono;
  if (customerData.correo) payload.correo = customerData.correo;
  if (customerData.direccion) payload.direccion = customerData.direccion;
  const response = await client.put(`/clientes/${id}`, payload);
  return mapClienteToModel(response.data);
};

export const deleteCustomer = async (id) => {
  const response = await client.delete(`/clientes/${id}`);
  return response.data;
};