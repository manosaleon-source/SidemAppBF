import client from '../client';

// Backend endpoints use Spanish naming and DB fields. Map to a friendly front-end model.
const mapProductoToModel = (p) => ({
  id: p.id,
  name: p.descripcion,
  price: p.precio_vender,
  stock: p.stock,
  providerId: p.proveedor_id,
  categoryId: p.categoria_id,
});

export const getProducts = async () => {
  const response = await client.get('/productos');
  return response.data.map(mapProductoToModel);
};

export const getProductById = async (id) => {
  const response = await client.get(`/productos/${id}`);
  return mapProductoToModel(response.data);
};

export const createProduct = async (productData) => {
  // convert model to backend fields
  const payload = {
    descripcion: productData.name,
    precio_compra: productData.purchasePrice,
    precio_vender: productData.price,
    stock: productData.stock,
    categoria_id: productData.categoryId,
    proveedor_id: productData.providerId,
    estado: productData.estado || 1,
  };
  const response = await client.post('/productos', payload);
  return mapProductoToModel(response.data);
};

export const updateProduct = async (id, productData) => {
  // payload uses backend fields; only include provided fields
  const payload = {};
  if (productData.name) payload.descripcion = productData.name;
  if (productData.price) payload.precio_vender = productData.price;
  if (productData.stock !== undefined) payload.stock = productData.stock;
  if (productData.categoryId) payload.categoria_id = productData.categoryId;
  if (productData.providerId) payload.proveedor_id = productData.providerId;
  const response = await client.put(`/productos/${id}`, payload);
  return mapProductoToModel(response.data);
};

export const deleteProduct = async (id) => {
  const response = await client.delete(`/productos/${id}`);
  return response.data;
};