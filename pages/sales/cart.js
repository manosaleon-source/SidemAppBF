import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from '../../components/Sales/CartItem';
import { useRouter } from 'next/router';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/sales/checkout');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onRemove={removeFromCart} />
          ))}
          <button onClick={handleCheckout} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;