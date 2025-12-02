import { useEffect, useState } from 'react';
import { getOrders } from '../../../services/api/orders';
import DashboardLayout from '../../../components/DashboardLayout';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!orders || orders.length === 0) return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div>No orders data available (backend endpoint might not be implemented)</div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Customer</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.customerName}</td>
              <td className="py-2 px-4 border-b">${(order.total || 0).toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{order.status || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default OrdersPage;