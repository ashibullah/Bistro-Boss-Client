import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaUtensils, FaUsers, FaChartBar } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard/home" className="flex items-center gap-2 hover:text-orange-400">
            <FaHome /> Home
          </Link>
          <Link to="/dashboard/menu" className="flex items-center gap-2 hover:text-orange-400">
            <FaUtensils /> Manage Menu
          </Link>
          <Link to="/dashboard/users" className="flex items-center gap-2 hover:text-orange-400">
            <FaUsers /> Manage Users
          </Link>
          <Link to="/dashboard/stats" className="flex items-center gap-2 hover:text-orange-400">
            <FaChartBar /> Statistics
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
