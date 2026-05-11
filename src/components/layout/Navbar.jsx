import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaBars, 
  FaTimes, 
  FaPhone, 
  FaLeaf,
  FaChevronDown 
} from 'react-icons/fa'

/**
 * Sticky navigation bar
 * Responsive with mobile hamburger menu
 * Uses semantic HTML5 nav element with proper ARIA labels
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Brands', path: '/brands' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [location])

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Top bar */}
      <div className={`hidden lg:block transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden' : 'h-10'}`} role="banner">
        <div className="bg-gold text-primary">
          <div className="container-premium flex items-center justify-between h-10 text-sm">
            <address className="flex items-center gap-4 not-italic">
              <a href="tel:+92-41-1234567" className="flex items-center gap-1 hover:text-white transition-colors">
                <FaPhone className="w-3 h-3" aria-hidden="true" />
                <span>+92-41-1234567</span>
              </a>
            </address>
            <div className="flex items-center gap-4">
              <span>Free delivery on orders above PKR 5,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <motion.nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-primary/95 backdrop-blur-md shadow-lg' 
            : 'bg-primary'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-premium">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3" aria-label="Bismillah Spray Center Home">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center" aria-hidden="true">
                <FaLeaf className="w-5 h-5 text-primary" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-gold font-display font-bold text-lg leading-tight">
                  Bismillah
                </h1>
                <p className="text-primary-400 text-xs tracking-wider">Spray Center</p>
              </div>
            </Link>

            {/* Desktop navigation */}
            <ul className="hidden lg:flex items-center gap-1" role="menubar">
              {navLinks.map((link) => (
                <li key={link.path} role="none">
                  <Link
                    to={link.path}
                    role="menuitem"
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                      isActive(link.path)
                        ? 'text-gold'
                        : 'text-primary-400 hover:text-white'
                    }`}
                    aria-current={isActive(link.path) ? 'page' : undefined}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="btn-primary text-sm"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gold hover:bg-primary-50 rounded-lg transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-primary border-t border-primary-50 overflow-hidden"
            >
              <nav className="container-premium py-4 space-y-1" aria-label="Mobile navigation">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive(link.path)
                          ? 'bg-gold/10 text-gold'
                          : 'text-primary-400 hover:bg-primary-50 hover:text-white'
                      }`}
                      aria-current={isActive(link.path) ? 'page' : undefined}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 px-4">
                  <Link to="/contact" className="btn-primary w-full text-center">
                    Get a Quote
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

export default Navbar
