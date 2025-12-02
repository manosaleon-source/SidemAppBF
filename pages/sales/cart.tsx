import React from 'react';
import { useContext } from 'react';
import { useCartContext } from '../../context/CartContext';
import CartItem from '../../components/Sales/CartItem';
import { useRouter } from 'next/router';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCartContext();
  const router = useRouter();
  const handleCheckout = () => router.push('/sales/checkout');
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
          ))}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <strong>Total:</strong> ${totalAmount.toFixed(2)}
            </div>
            <button onClick={handleCheckout} className="mt-0 bg-blue-500 text-white px-4 py-2 rounded">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
