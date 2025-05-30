import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaBoxOpen,
  FaPlus,
  FaTags,
  FaTruck,
  FaUsers,
  FaTachometerAlt
} from 'react-icons/fa';

const DashboardNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);
  const toggleProductDropdown = () => setProductDropdownOpen(!productDropdownOpen);

  const menuLinkStyle = (path) =>
    `hover:text-primary transition ${
      location.pathname.startsWith(path) ? 'text-primary font-medium' : 'text-gray-700'
    }`;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50 px-4 py-3 md:px-8">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/dashboard" className="text-xl font-bold text-primary">
          eShop Admin
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/dashboard" className={menuLinkStyle('/dashboard')}>
            <FaTachometerAlt className="inline-block mr-1" /> Dashboard
          </Link>

          <div className="relative">
            <button
              onClick={toggleProductDropdown}
              className={`${menuLinkStyle('/dashboard/products')} flex items-center gap-1`}
            >
              <FaBoxOpen /> Products
            </button>
            {productDropdownOpen && (
              <div className="absolute top-10 left-0 bg-white shadow-md rounded-md border py-2 w-52 z-50">
                <Link to="/dashboard/products" className="block px-4 py-2 hover:bg-gray-100">
                  <FaBoxOpen className="inline mr-2" /> All Products
                </Link>
                <Link to="/dashboard/products/create" className="block px-4 py-2 hover:bg-gray-100">
                  <FaPlus className="inline mr-2" /> Create Product
                </Link>
                <Link to="/dashboard/categories" className="block px-4 py-2 hover:bg-gray-100">
                  <FaTags className="inline mr-2" /> Categories
                </Link>
              </div>
            )}
          </div>

          <Link to="/dashboard/orders" className={menuLinkStyle('/dashboard/orders')}>
            <FaTruck className="inline mr-1" /> Orders
          </Link>
          <Link to="/dashboard/customers" className={menuLinkStyle('/dashboard/customers')}>
            <FaUsers className="inline mr-1" /> Customers
          </Link>

          {/* User Profile */}
          <div className="relative">
            <img
              src="https://i.pravatar.cc/300"
              className="w-9 h-9 rounded-full cursor-pointer"
              onClick={toggleUserDropdown}
              alt="User"
            />
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border shadow-md rounded-md py-2 w-40 z-50">
                <Link to="/dashboard/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <FaUserCircle className="mr-2" /> Profile
                </Link>
                <Link to="/dashboard/settings" className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <FaCog className="mr-2" /> Settings
                </Link>
                <button className="flex items-center px-4 py-2 text-left hover:bg-gray-100 w-full">
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-700" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col gap-4 p-5 pt-20">
          <Link to="/dashboard" className={menuLinkStyle('/dashboard')} onClick={toggleMobileMenu}>
            Dashboard
          </Link>

          <div>
            <button onClick={toggleProductDropdown} className="text-gray-700 hover:text-primary w-full text-left">
              Products
            </button>
            {productDropdownOpen && (
              <div className="ml-4 mt-2 flex flex-col gap-2">
                <Link to="/dashboard/products" onClick={toggleMobileMenu}>All Products</Link>
                <Link to="/dashboard/products/create" onClick={toggleMobileMenu}>Create Product</Link>
                <Link to="/dashboard/categories" onClick={toggleMobileMenu}>Categories</Link>
              </div>
            )}
          </div>

          <Link to="/dashboard/orders" className={menuLinkStyle('/dashboard/orders')} onClick={toggleMobileMenu}>
            Orders
          </Link>
          <Link to="/dashboard/customers" className={menuLinkStyle('/dashboard/customers')} onClick={toggleMobileMenu}>
            Customers
          </Link>
          <Link to="/dashboard/profile" onClick={toggleMobileMenu}>Profile</Link>
          <Link to="/dashboard/settings" onClick={toggleMobileMenu}>Settings</Link>
          <button className="text-left text-red-600 mt-4">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
