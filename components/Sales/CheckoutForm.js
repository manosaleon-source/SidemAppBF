import { useState } from 'react';
import { useCart } from '../../../hooks/useCart';
import { Button } from '../../common/Button';

const CheckoutForm = () => {
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
    // Handle checkout process (e.g., API call to create an order)
    console.log('Checkout data:', formData);
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