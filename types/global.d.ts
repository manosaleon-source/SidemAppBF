export interface Product {
  id: number;
  name: string;
  price: number;
  stock?: number;
  providerId?: number;
  categoryId?: number;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Customer {
  id?: number;
  documento?: string;
  nombres?: string;
  apellidos?: string;
  name?: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
}

export interface User {
  id: number;
  username: string;
  token?: string;
}

export interface Venta {
  id: number;
  codigo?: string;
  date?: string;
  description?: string;
  total?: number;
  customerName?: string;
  status?: string;
}