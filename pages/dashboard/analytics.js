import React from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import { useEffect, useState } from 'react';
import { fetchAnalyticsData } from '../../../services/api/orders';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        const data = await fetchAnalyticsData();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    getAnalyticsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <h1>Analytics</h1>
      {analyticsData ? (
        <div>
          <h2>Sales Overview</h2>
          <p>Total Sales: {analyticsData.totalSales}</p>
          <p>Total Orders: {analyticsData.totalOrders}</p>
          <p>Average Order Value: {analyticsData.averageOrderValue}</p>
          {/* Add more analytics data as needed */}
        </div>
      ) : (
        <p>No analytics data available.</p>
      )}
    </DashboardLayout>
  );
};

export default Analytics;