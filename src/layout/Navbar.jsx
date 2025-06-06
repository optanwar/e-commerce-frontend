import {
  User,
  ShoppingBag,
  Heart,
  LogOut,
  ShoppingCart,
  Info,
  Mail,
  BookOpenText,
  Store,
  Menu as MenuIcon,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import { logout, logoutUser } from '../redux/slices/auth/loginSlice'; // Adjust the import path as needed


export default function Navbar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false); // mobile sidebar open state
  const [anchorEl, setAnchorEl] = useState(null); // desktop user dropdown anchor
  const dropdownOpen = Boolean(anchorEl);

  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
 

  const handleUserClick = (event) => {
    if (!token || !user) {
      navigate('/login');
    } else {
      setAnchorEl(event.currentTarget); // open desktop user dropdown
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(logout()); // Clear user state in Redux
    handleDropdownClose();
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // Prevent background scroll when mobile sidebar open
    document.body.style.overflow = open ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [open]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl font-heading text-primary cursor-pointer">YummyGummies</h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          <Link to="/about" className="flex items-center gap-2 text-darkText hover:text-primary">
            <Info className="w-4 h-4" /> About
          </Link>
          <Link to="/products" className="flex items-center gap-2 text-darkText hover:text-primary">
            <Store className="w-4 h-4" /> Shop
          </Link>
          <Link to="/blogs" className="flex items-center gap-2 text-darkText hover:text-primary">
            <BookOpenText className="w-4 h-4" /> Blog
          </Link>
          <Link
            to="/contact-us"
            className="flex items-center gap-2 text-darkText hover:text-primary"
          >
            <Mail className="w-4 h-4" /> Contact
          </Link>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex gap-6 items-center relative">
          <Link to="/my-cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-darkText hover:text-primary" />
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-xs px-1.5 rounded-full">
              {cartItems.length > 0 ? cartItems.length : ''}
            </span>
          </Link>

          <button
            onClick={handleUserClick}
            className="relative focus:outline-none"
            aria-controls={dropdownOpen ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={dropdownOpen ? 'true' : undefined}
            aria-label="User menu"
          >
            <User className="w-6 h-6 text-darkText hover:text-primary" />
          </button>

          {/* Desktop Dropdown Menu */}
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={dropdownOpen}
            onClose={handleDropdownClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ sx: { mt: 1, minWidth: 180 } }}
          >
            <MenuItem
              className="hover:text-primary"
              component={Link}
              to="/user-profile"
              onClick={handleDropdownClose}
            >
              <User className="w-4 h-4 mr-2" /> Profile
            </MenuItem>
            <MenuItem
              className="hover:text-primary"
              component={Link}
              to="/my-orders"
              onClick={handleDropdownClose}
            >
              <ShoppingBag className="w-4 h-4 mr-2" /> My Orders
            </MenuItem>
            <MenuItem
              className="hover:text-primary"
              component={Link}
              to="/wishlist"
              onClick={handleDropdownClose}
            >
              <Heart className="w-4 h-4 mr-2" /> Wishlist
            </MenuItem>
            <MenuItem className="hover:text-primary" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </MenuItem>
          </Menu>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon className="w-6 h-6 text-darkText" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center justify-start gap-4  ">
            <Link
              to="/my-cart"
              onClick={() => setOpen(false)}
              className="relative hover:text-primary flex items-center gap-1"
            >
              <ShoppingCart className="inline-block w-5 h-5" />
              <span className="absolute -top-1 -right-2.5 bg-primary text-white text-xs px-1 rounded-full">
              {cartItems.length > 0 ? cartItems.length : ''}
              </span>
            </Link>

            {/* Show user icon button only if NOT logged in */}
            {!token || !user ? (
              <button
                onClick={() => {
                  navigate('/login');
                  setOpen(false);
                }}
                className="relative focus:outline-none"
                aria-label="User menu"
              >
                <User className="w-6 h-6 text-darkText hover:text-primary" />
              </button>
            ) : (
              ''
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="focus:outline-none"
          >
            <X className="w-6 h-6 text-darkText" />
          </button>
        </div>

        <nav className="flex flex-col px-4 py-6 space-y-4 text-darkText font-medium text-base">
          {!token || !user ? (
            '' // If logged in, no button but you can optionally put a greeting or something else here
          ) : (
            <div className="text-sm font-semibold text-darkText flex items-center gap-2">
              {' '}
              Hello, {user.name || 'User'} <span className="text-base">👋 </span>{' '}
            </div>
          )}
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 hover:text-primary"
          >
            <Info className="w-4 h-4" /> About
          </Link>
          <Link
            to="/products"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 hover:text-primary"
          >
            <Store className="w-4 h-4" /> Shop
          </Link>
          <Link
            to="/blogs"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 hover:text-primary"
          >
            <BookOpenText className="w-4 h-4" /> Blog
          </Link>
          <Link
            to="/contact-us"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 hover:text-primary"
          >
            <Mail className="w-4 h-4" /> Contact
          </Link>
        </nav>

        {/* Mobile User Dropdown */}
        {token && user && (
          <div className="border-t pt-4 px-4 py-2 space-y-4">
            <Link
              to="/user-profile"
              onClick={handleDropdownClose}
              className="flex items-center gap-2 text-darkText hover:text-primary"
            >
              <User className="w-4 h-4" /> Profile
            </Link>
            <Link
              to="/my-orders"
              onClick={handleDropdownClose}
              className="flex items-center gap-2 text-darkText hover:text-primary"
            >
              <ShoppingBag className="w-4 h-4" />
              My Orders
            </Link>
            <Link
              to="/wishlist"
              onClick={handleDropdownClose}
              className="flex items-center gap-2 text-darkText hover:text-primary"
            >
              <Heart className="w-4 h-4" /> Wishlist
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-darkText hover:text-primary"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </aside>
    </nav>
  );
}
