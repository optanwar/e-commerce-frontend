import { ShoppingCart, User, X, Menu } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Package, Heart, LogOut } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile menu open
  const [userMenuOpen, setUserMenuOpen] = useState(false); // user dropdown open
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.auth);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [open]);

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Logout clicked');
    navigate('/login');
  };

  const handleUserIconClick = () => {
    if (!token || !user) {
      navigate('/login');
    } else {
      setUserMenuOpen((prev) => !prev);
    }
  };

  const UserDropdown = () => (
    userMenuOpen && (
     <div
  className="absolute top-8 md:-right-2 lg:-right-3 xl:-right-5 2xl:-right-8  3xl:-right-1 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
  role="menu"
  aria-orientation="vertical"
  aria-labelledby="user-menu-button"
  tabIndex={-1}
>
  <Link
    to="/profile"
    onClick={() => setUserMenuOpen(false)}
    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
  >
    <UserIcon className="w-4 h-4" />
    Profile
  </Link>
  <Link
    to="/orders"
    onClick={() => setUserMenuOpen(false)}
    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
  >
    <Package className="w-4 h-4" />
    Orders
  </Link>
  <Link
    to="/wishlist"
    onClick={() => setUserMenuOpen(false)}
    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
  >
    <Heart className="w-4 h-4" />
    Wishlist
  </Link>
  <button
    onClick={() => {
      setUserMenuOpen(false);
      handleLogout();
    }}
    className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
  >
    <LogOut className="w-4 h-4" />
    Logout
  </button>
</div>
    )
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl font-heading text-primary">YummyGummies</h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          <Link to="/about" className="text-darkText hover:text-primary">About</Link>
          <Link to="/products" className="text-darkText hover:text-primary">Shop</Link>
          <Link to="/blogs" className="text-darkText hover:text-primary">Blog</Link>
          <Link to="/contact-us" className="text-darkText hover:text-primary">Contact</Link>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex gap-6 items-center relative" ref={userMenuRef}>
          <Link to="/my-cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-darkText hover:text-primary" />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1 rounded-full">
              2
            </span>
          </Link>

          <button
            onClick={handleUserIconClick}
            className="relative focus:outline-none"
            aria-label="User menu"
          >
            <User className="w-6 h-6 text-darkText hover:text-primary" />
          </button>

          <UserDropdown />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-darkText" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="text-lg font-semibold text-darkText  flex items-center gap-5">
            <Link to="/my-cart" onClick={() => setOpen(false)} className="relative hover:text-primary">
              <ShoppingCart className="inline-block w-5 h-5" />
              <span className="absolute -top-1 -right-2.5 bg-primary text-white text-xs px-1 rounded-full">
                2
              </span>
            </Link>

            <button
              onClick={handleUserIconClick}
              className="relative focus:outline-none"
              aria-label="User menu"
            >
              <User className="w-6 h-6 text-darkText hover:text-primary" />
            </button>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="focus:outline-none"
          >
            <X className="w-6 h-6 text-darkText" />
          </button>
        </div>

        {/* User Dropdown in Mobile */}
        <div className="px-4 relative" ref={userMenuRef}>
          <div className='absolute -top-12 right-12'>
          <UserDropdown />

          </div>
        </div>

        {/* Mobile Links */}
        <nav className="flex flex-col px-4 py-6 space-y-4 text-darkText font-medium text-base">
          <Link to="/about" onClick={() => setOpen(false)} className="hover:text-primary">About</Link>
          <Link to="/products" onClick={() => setOpen(false)} className="hover:text-primary">Shop</Link>
          <Link to="/blogs" onClick={() => setOpen(false)} className="hover:text-primary">Blog</Link>
          <Link to="/contact-us" onClick={() => setOpen(false)} className="hover:text-primary">Contact</Link>
        </nav>
      </aside>
    </nav>
  );
}
