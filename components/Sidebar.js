import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Sales', path: '/dashboard/sales' },
    { name: 'Orders', path: '/dashboard/orders' },
    { name: 'Products', path: '/dashboard/products' },
    { name: 'Analytics', path: '/dashboard/analytics' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-full">
      <div className="p-4">
        <h2 className="text-lg font-bold">Dashboard Menu</h2>
        <ul className="mt-4">
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link href={item.path}>
                <a className={`block p-2 rounded ${router.pathname === item.path ? 'bg-gray-700' : ''}`}>
                  {item.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;