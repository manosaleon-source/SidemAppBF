import { useEffect, useState } from 'react';
import { getSalesData } from '../../services/api/orders';
import DashboardLayout from '../../components/DashboardLayout';
import SalesChart from '../../components/Sales/SalesChart';
import SalesTable from '../../components/Sales/SalesTable';

const SalesPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const data = await getSalesData();
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Sales Overview</h1>
      <SalesChart data={salesData} />
      <SalesTable data={salesData} />
    </DashboardLayout>
  );
};

export default SalesPage;