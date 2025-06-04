// src/components/Navbar.jsx
import { Heart, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to={'/'}>
          <h1 className="text-xl font-heading text-primary">YummyGummies</h1>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          <Link to="/about" className="text-darkText hover:text-primary">
            About
          </Link>
          <Link to="/products" className="text-darkText hover:text-primary">
            Shop
          </Link>
          <Link to="/blogs" className="text-darkText hover:text-primary">
            Blog
          </Link>
          <Link to="/contact-us" className="text-darkText hover:text-primary">
            Contact
          </Link>
        </div>

        {/* Icons */}
        <div className="flex gap-4 md:gap-6 items-center">
          <Link to={'/my-cart'} className="relative">
            <ShoppingCart className="w-6 h-6 text-darkText hover:text-primary " />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1 rounded-full">
              2
            </span>
          </Link>
          {/* <button onClick={() => setOpen(!open)} className="relative">
            <Heart className="w-6 h-6 text-darkText" />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1 rounded-full">
              2
            </span>
          </button> */}
          <Link to={'/login'} className="relative">
            <User className="w-6 h-6 text-darkText hover:text-primary" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
