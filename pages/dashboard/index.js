import React from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import { useAuth } from '../../../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <p className="mt-4">Hello, {user ? user.name : 'Guest'}! Here you can manage your sales, orders, and products.</p>
    </DashboardLayout>
  );
};

export default Dashboard;