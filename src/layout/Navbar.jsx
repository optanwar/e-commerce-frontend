import React, { useState } from 'react'
import { IoCartSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full bg-white shadow sticky top-0 z-50'>
      <div className='container mx-auto px-4 '>
        <nav className='flex justify-between items-center py-4'>
          <div className='text-2xl font-bold text-primary'>  <Link to={`/`} className="text-gray-700 hover:text-primary"><img src="/logo.svg" alt="website logo" /> </Link></div>

          {/* Desktop Menu */}
          <ul className='hidden md:flex space-x-6'>
            <li><Link to={`/products`} className="text-gray-700 hover:text-primary">Products</Link></li>
            <li><Link to={`/about`}  className="text-gray-700 hover:text-primary">About</Link></li>
           
            <li><Link to={`/blog`} className="text-gray-700 hover:text-primary">Blogs</Link></li>
            <li><Link to={`/contact-us`} className="text-gray-700 hover:text-primary">Contact</Link></li>
          </ul>

          <div className='hidden md:flex items-center space-x-4'>
            <button className="bg-primary text-white px-4 py-2 rounded"><IoSearch />           </button>
            <Link to={`/login`} className="text-gray-700 hover:text-primary"><FaRegUserCircle />    </Link>
            <Link to={`/my-cart`} className="text-gray-700 hover:text-primary"><IoCartSharp />     </Link>
           
           
          </div>

          {/* Hamburger icon */}
          <div className='md:hidden'>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                   viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} className="text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                 viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <ul className='flex flex-col items-start space-y-4 px-6'>
          <li><a href="#home" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-primary">Products</a></li>
          <li><a href="#about" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-primary">About</a></li>
          <li><a href="#services" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-primary">Blogs</a></li>
          <li><a href="#contact" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-primary">Contact</a></li>
          <button className="bg-primary text-white px-4 py-2 rounded w-full mt-4">Where to buy</button>
        </ul>
      </div>

      {/* Background overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        />
      )}
    </div>
  )
}

export default Navbar
