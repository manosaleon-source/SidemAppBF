import { useState } from 'react';
import { useCart } from '../../../hooks/useCart';
import { Button } from '../../common/Button';

const CheckoutForm = ({ onCheckout }) => {
  const { cartItems, totalAmount } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'creditCard',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build `cabecera` and `items` according to backend `/ventas` structure
    const cabecera = {
      codigo: `V-${Date.now()}`,
      fecha_emision: new Date().toISOString(),
      descripcion: `Venta para ${formData.name}`,
      precio_neto: totalAmount, // simplification: no tax split calculation here
      igv: 0,
      precio_total: totalAmount,
      cliente_id: null, // could map to selected customer
      tipo_documento_id: 1,
      usuario_id: 1,
    };
    const items = cartItems.map(it => ({
      productos_id: it.id,
      cantidad: it.quantity || 1,
      precio_unitario: it.price,
      precio_total: (it.price || 0) * (it.quantity || 1),
    }));
    const payload = { cabecera, items };
    if (typeof onCheckout === 'function') {
      onCheckout(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Checkout</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Payment Method:</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option value="creditCard">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>
      <div>
        <h3>Total Amount: ${totalAmount}</h3>
      </div>
      <Button type="submit">Complete Purchase</Button>
    </form>
  );
};

export default CheckoutForm;