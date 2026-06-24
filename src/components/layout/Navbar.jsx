import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaBars, 
  FaTimes, 
  FaLeaf,
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

      {/* Main navbar - Hidden on mobile, only visible on md and up */}
      <nav
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-primary/80 backdrop-blur-xl shadow-2xl border-b border-white/10' 
            : 'bg-primary'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-premium">
          <div className="flex items-center justify-between h-20">
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
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
