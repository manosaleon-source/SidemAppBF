import { useContext } from 'react';
import { useCartContext } from '../context/CartContext';
import { CartItem } from '../types/global.d';

export const useCart = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalAmount } = useCartContext();
  return { cartItems, addToCart: (c: CartItem) => addToCart(c), removeFromCart, updateQuantity, clearCart, totalAmount };
};

export default useCart;
