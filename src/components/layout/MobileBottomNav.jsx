import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaHome, 
  FaBox, 
  FaTags, 
  FaImages, 
  FaQuestionCircle, 
  FaEnvelope 
} from 'react-icons/fa'

/**
 * Mobile Bottom Navigation Bar
 * Fixed bottom navigation with icons for mobile devices
 * Only visible on screens smaller than 768px (md breakpoint)
 */
const MobileBottomNav = () => {
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Products', path: '/products', icon: FaBox },
    { name: 'Brands', path: '/brands', icon: FaTags },
    { name: 'Gallery', path: '/gallery', icon: FaImages },
    { name: 'FAQ', path: '/faq', icon: FaQuestionCircle },
    { name: 'Contact', path: '/contact', icon: FaEnvelope },
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur-md border-t border-primary-50 shadow-lg"
      role="navigation"
      aria-label="Mobile bottom navigation"
    >
      <div className="grid grid-cols-6 h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center gap-1 transition-colors duration-200 ${
                active ? 'text-gold' : 'text-primary-400 hover:text-white'
              }`}
              aria-label={item.name}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span className="text-[10px] font-medium">{item.name}</span>
              
              {/* Active indicator */}
              {active && (
                <motion.div
                  layoutId="mobileActiveNav"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gold rounded-b-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  aria-hidden="true"
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default MobileBottomNav
