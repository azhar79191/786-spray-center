import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaHome,
  FaBox,
  FaTags,
  FaImages,
  FaQuestionCircle,
  FaEnvelope,
} from 'react-icons/fa'

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
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary border-t border-primary-50 shadow-lg overflow-hidden"
      role="navigation"
      aria-label="Mobile bottom navigation"
    >
      <div className="grid grid-cols-6 h-16 w-full">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center transition-all duration-200 ${
                active
                  ? 'text-gold'
                  : 'text-primary-400 hover:text-white'
              }`}
              aria-label={item.name}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="w-4 h-4 mb-0.5" />

              {/* Text always visible */}
              <span className="text-[8px] font-medium leading-none">
                {item.name}
              </span>

              {/* Active indicator */}
              {active && (
                <motion.div
                  layoutId="mobileActiveNav"
                  className="absolute top-0 w-8 h-1 bg-gold rounded-b-full"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
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