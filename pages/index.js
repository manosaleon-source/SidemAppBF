import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Sales Dashboard</h1>
      <p className="text-lg mb-8">Manage your sales, orders, and products efficiently.</p>
      <div className="flex space-x-4">
        <Link href="/login">
          <a className="bg-blue-500 text-white px-4 py-2 rounded">Login</a>
        </Link>
        <Link href="/dashboard">
          <a className="bg-green-500 text-white px-4 py-2 rounded">Go to Dashboard</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;