import client from '../client';
import { Product } from '../../types/global.d';

const toModel = (p: any): Product => ({ id: p.id, name: p.descripcion, price: p.precio_vender, stock: p.stock, providerId: p.proveedor_id, categoryId: p.categoria_id });

export const getProducts = async (): Promise<Product[]> => {
  const response = await client.get('/productos');
  return (response.data as any[]).map((p: any) => toModel(p));
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await client.get(`/productos/${id}`);
  return toModel(response.data);
};

export const createProduct = async (productData: any) => {
  const payload = { descripcion: productData.name, precio_compra: productData.purchasePrice, precio_vender: productData.price, stock: productData.stock, categoria_id: productData.categoryId, proveedor_id: productData.providerId, estado: productData.estado || 1 };
  const response = await client.post('/productos', payload);
  return toModel(response.data);
};

export const updateProduct = async (id: number, productData: any) => {
  const payload: any = {};
  if (productData.name) payload.descripcion = productData.name;
  if (productData.price) payload.precio_vender = productData.price;
  if (productData.stock !== undefined) payload.stock = productData.stock;
  if (productData.categoryId) payload.categoria_id = productData.categoryId;
  if (productData.providerId) payload.proveedor_id = productData.providerId;
  const response = await client.put(`/productos/${id}`, payload);
  return toModel(response.data);
};

export const deleteProduct = async (id: number) => {
  const response = await client.delete(`/productos/${id}`);
  return response.data;
};

export default { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
