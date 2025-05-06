import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaUtensils, FaUsers, FaChartBar, FaShoppingCart } from 'react-icons/fa';
import { MdOutlineSlideshow } from 'react-icons/md';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-orange-900 text-white flex flex-col p-4 transition-all duration-300`}
      >
        <button
          onClick={toggleSidebar}
          className={`text-white mb-4 w-full flex items-center gap-2 hover:text-orange-400 ${
            isSidebarOpen ? 'justify-start' : 'justify-center'
          }`}
        >
          <MdOutlineSlideshow className={`text-2xl transform transition-transform duration-300 ${
            isSidebarOpen ? '-rotate-180' : 'rotate-0'
          }`} />
          {isSidebarOpen && <span className="font-bold text-lg">Dashboard</span>}
        </button>
        <nav className={`flex flex-col gap-4 ${isSidebarOpen ? '' : 'items-center'}`}>
          <Link to="/dashboard/home" className={`flex items-center gap-2 hover:text-orange-400 ${isSidebarOpen ? 'w-full' : 'justify-center'}`}>
            <FaHome className="text-2xl" />
            {isSidebarOpen && <span>Home</span>}
          </Link>
          <Link to="/dashboard/menu" className={`flex items-center gap-2 hover:text-orange-400 ${isSidebarOpen ? 'w-full' : 'justify-center'}`}>
            <FaUtensils className="text-2xl" />
            {isSidebarOpen && <span>Manage Menu</span>}
          </Link>
          <Link to="/dashboard/users" className={`flex items-center gap-2 hover:text-orange-400 ${isSidebarOpen ? 'w-full' : 'justify-center'}`}>
            <FaUsers className="text-2xl" />
            {isSidebarOpen && <span>Manage Users</span>}
          </Link>
          <Link to="/dashboard/stats" className={`flex items-center gap-2 hover:text-orange-400 ${isSidebarOpen ? 'w-full' : 'justify-center'}`}>
            <FaChartBar className="text-2xl" />
            {isSidebarOpen && <span>Statistics</span>}
          </Link>
          <Link to="/dashboard/cart" className={`flex items-center gap-2 hover:text-orange-400 ${isSidebarOpen ? 'w-full' : 'justify-center'}`}>
            <FaShoppingCart className="text-2xl" />
            {isSidebarOpen && <span>My Cart</span>}
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
