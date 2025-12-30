import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getItemCount, toggleCart } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Designers', path: '/designers' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass py-3'
            : 'bg-transparent py-4 md:py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 group">
              <motion.img
                src="/images/logo.png"
                alt="DAOsigner"
                className="h-8 md:h-10 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <span className="text-lg md:text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                DAOsigner
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-white'
                          : 'text-gray-400 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.name}
                        {isActive && (
                          <motion.div
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500"
                            layoutId="navbar-indicator"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Right Section */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Cart Button */}
              <motion.button
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCart}
                aria-label="Open cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                {getItemCount() > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={getItemCount()}
                  >
                    {getItemCount()}
                  </motion.span>
                )}
              </motion.button>

              {/* Sign In - Text link on desktop */}
              <NavLink
                to="/signin"
                className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors"
              >
                Sign In
              </NavLink>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-300 hover:text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  )}
                </svg>
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden glass absolute top-full left-0 right-0 border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="py-4 px-6 space-y-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block py-3 text-base font-medium transition-colors ${
                          isActive
                            ? 'text-purple-400'
                            : 'text-gray-300 hover:text-white'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                <li className="pt-2 border-t border-white/10">
                  <NavLink
                    to="/signin"
                    className="block py-3 text-base font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    Sign In
                  </NavLink>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Page Content */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
