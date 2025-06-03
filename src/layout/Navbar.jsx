// src/components/Navbar.jsx
import { Heart, ShoppingCart, User } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-heading text-primary">YummyGummies</h1>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          <a href="#" className="text-darkText hover:text-primary">Home</a>
          <a href="#" className="text-darkText hover:text-primary">Shop</a>
          <a href="#" className="text-darkText hover:text-primary">Contact</a>
        </div>

        {/* Icons */}
        <div className="flex gap-4 items-center">
          <button onClick={() => setOpen(!open)} className="relative">
            <ShoppingCart className="w-6 h-6 text-darkText" />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1 rounded-full">
              2
            </span>
          </button>
          <button onClick={() => setOpen(!open)} className="relative">
            <Heart className="w-6 h-6 text-darkText" />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1 rounded-full">
              2
            </span>
          </button>
          <button onClick={() => setOpen(!open)} className="relative">
            <User className="w-6 h-6 text-darkText" />
          </button>
        </div>
      </div>
    </nav>
  );
}
