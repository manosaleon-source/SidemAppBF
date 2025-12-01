import { useContext } from 'react'
import { useRouter } from 'next/router'
import { CartContext } from '../../context/CartContext'
import CheckoutForm from '../../components/Sales/CheckoutForm'
import { createOrder } from '../../services/api/orders'

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext)
  const router = useRouter()

  const handleCheckout = async (orderData) => {
    try {
      const order = await createOrder(orderData)
      clearCart()
      router.push(`/sales/order-success?orderId=${order.id}`)
    } catch (error) {
      console.error('Error creating order:', error)
    }
  }

  return (
    <div className="checkout-container">
      <h1 className="text-2xl font-bold">Checkout</h1>
      {cartItems.length > 0 ? (
        <CheckoutForm onCheckout={handleCheckout} />
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  )
}

export default Checkout