import React from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import CheckoutForm from '../../components/Sales/CheckoutForm';
import { useCartContext } from '../../context/CartContext';
import { createOrder } from '../../services/api/orders';
import { createCustomer } from '../../services/api/customers';

const Checkout: React.FC = () => {
  const { cartItems, clearCart } = useCartContext();
  const router = useRouter();
  const handleCheckout = async (orderData: any, formData: any) => {
    try {
      // create customer if no cliente id
      if ((!orderData.cabecera || !orderData.cabecera.cliente_id) && formData) {
        const customerPayload = {
          documento: formData.documento || '',
          nombres: formData.name || '',
          apellidos: formData.apellidos || '',
          correo: formData.email || '',
          telefono: formData.telefono || '',
          direccion: formData.address || '',
          tipo_documento_entidad_id: 1,
        };
        try {
          const customer = await createCustomer(customerPayload);
          if (!orderData.cabecera) orderData.cabecera = {};
          orderData.cabecera.cliente_id = customer.id;
        } catch (err) { console.warn('Could not create customer, proceeding without cliente_id'); }
      }
      const order = await createOrder(orderData) as any;
      clearCart();
      router.push(`/sales/order-success?orderId=${order.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  return (
    <div className="checkout-container">
      <h1 className="text-2xl font-bold">Checkout</h1>
      {cartItems.length > 0 ? <CheckoutForm onCheckout={handleCheckout} /> : <p>Your cart is empty.</p>}
    </div>
  );
};

export default Checkout;
