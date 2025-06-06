import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  Menu,
  LogOut,
  ShoppingCart,
  Package,
  LayoutDashboard,
  User,
  Star,
  BadgePlus,
  ListChecks,
  Tag,
} from 'lucide-react';

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, to: '/dashboard' },
    { name: 'Orders', icon: <ShoppingCart size={18} />, to: '/dashboard/orders' },
    { name: 'Products', icon: <Package size={18} />, to: '/dashboard/products' },
    { name: 'Categories', icon: <ListChecks size={18} />, to: '/dashboard/categories' },
    { name: 'Create Product', icon: <BadgePlus size={18} />, to: '/dashboard/create-product' },
    { name: 'Users', icon: <User size={18} />, to: '/dashboard/users' },
    { name: 'Reviews', icon: <Star size={18} />, to: '/dashboard/reviews' },
    { name: 'Coupons', icon: <Tag size={18} />, to: '/dashboard/coupons' },
  ];

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg z-50 md:z-0 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="p-4 text-2xl font-bold text-primary border-b font-heading">
            <Link to="/dashboard">YummyGummies</Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col gap-1 px-4 py-4 overflow-y-auto">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
                    isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50 rounded-lg font-medium transition">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Mobile Top Bar */}
        <header className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-primary">Admin Panel</h1>
          <div />
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
