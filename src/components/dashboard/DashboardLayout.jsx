import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Menu,
  LogOut,
  ShoppingCart,
  Package,
  LayoutDashboard,
  User,
} from 'lucide-react';

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, to: '/dashboard' },
    { name: 'Orders', icon: <ShoppingCart size={18} />, to: '/dashboard/orders' },
    { name: 'Products', icon: <Package size={18} />, to: '/dashboard/products' },
    { name: 'Users', icon: <User size={18} />, to: '/dashboard/users' },
  ];

  return (
    <div className="h-screen flex overflow-hidden z-0 ">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="-z-0 fixed  inset-0 bg-black bg-opacity-40  md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`-z-0 fixed overflow-hidden md:fixed top-0 md:top-14 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 text-2xl font-bold text-primary border-b">Admin Panel</div>
        <nav className="flex flex-col gap-1 px-4 py-4">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto p-4">
          <button className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50 rounded-lg font-medium transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-primary">Admin Panel</h1>
          <div />
        </header>

        {/* Scrollable main content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50 h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
