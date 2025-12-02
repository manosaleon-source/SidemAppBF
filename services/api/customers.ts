import client from '../client';
import { Customer as CustomerType } from '../../types/global.d';

const mapToCustomer = (c: any): CustomerType => ({ id: c.id, documento: c.documento, nombres: c.nombres, apellidos: c.apellidos, name: `${c.nombres || ''} ${c.apellidos || ''}`.trim(), correo: c.correo, telefono: c.telefono, direccion: c.direccion });

export const getCustomers = async (): Promise<CustomerType[]> => {
  const response = await client.get('/clientes');
  return (response.data as any[]).map((c: any) => mapToCustomer(c));
};

export const getCustomerById = async (id: number): Promise<CustomerType> => {
  const response = await client.get(`/clientes/${id}`);
  return mapToCustomer(response.data);
};

export const createCustomer = async (customerData: any): Promise<CustomerType> => {
  const payload = { documento: customerData.documento, nombres: customerData.nombres || customerData.name, apellidos: customerData.apellidos || '', telefono: customerData.telefono || customerData.phone, correo: customerData.correo || customerData.email, direccion: customerData.direccion || customerData.address, tipo_documento_entidad_id: customerData.tipo_documento_entidad_id || 1 };
  const response = await client.post('/clientes', payload);
  return mapToCustomer(response.data);
};

export const updateCustomer = async (id: number, customerData: any) => {
  const payload: any = {};
  if (customerData.nombres) payload.nombres = customerData.nombres;
  if (customerData.apellidos) payload.apellidos = customerData.apellidos;
  if (customerData.telefono) payload.telefono = customerData.telefono;
  if (customerData.correo) payload.correo = customerData.correo;
  if (customerData.direccion) payload.direccion = customerData.direccion;
  const response = await client.put(`/clientes/${id}`, payload);
  return mapToCustomer(response.data);
};

export const deleteCustomer = async (id: number) => {
  const response = await client.delete(`/clientes/${id}`);
  return response.data;
};

export default { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer };
