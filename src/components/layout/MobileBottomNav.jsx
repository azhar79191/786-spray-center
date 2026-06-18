import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaHome,
  FaInfoCircle,
  FaBox,
  FaTags,
  FaImages,
  FaQuestionCircle,
  FaEnvelope,
  FaCogs,
  FaBars,
  FaTimes,
} from 'react-icons/fa'

const MobileBottomNav = () => {
  const location = useLocation()
  const [showMore, setShowMore] = useState(false)

  const mainNavItems = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Products', path: '/products', icon: FaBox },
    { name: 'Contact', path: '/contact', icon: FaEnvelope },
  ]

  const moreNavItems = [
    { name: 'About', path: '/about', icon: FaInfoCircle },
    { name: 'Services', path: '/services', icon: FaCogs },
    { name: 'Brands', path: '/brands', icon: FaTags },
    { name: 'Gallery', path: '/gallery', icon: FaImages },
  ]

  const allNavItems = [...mainNavItems, ...moreNavItems]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  useEffect(() => {
    setShowMore(false)
  }, [location])

  return (
    <>
      {/* More Menu Overlay */}
      <AnimatePresence>
        {showMore && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMore(false)}
              className="md:hidden fixed inset-0 z-50 bg-black/50"
            />
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="md:hidden fixed bottom-16 left-0 right-0 z-50 bg-primary border-t border-primary-50 rounded-t-2xl shadow-2xl"
            >
              <div className="container-premium py-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-lg">More</h3>
                  <button
                    onClick={() => setShowMore(false)}
                    className="text-primary-400 hover:text-white"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {moreNavItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.path)

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                          active
                            ? 'bg-gold/20 text-gold'
                            : 'text-primary-400 hover:bg-primary-700 hover:text-white'
                        }`}
                        aria-label={item.name}
                        aria-current={active ? 'page' : undefined}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium text-sm">{item.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary border-t border-primary-50 shadow-lg overflow-hidden"
        role="navigation"
        aria-label="Mobile bottom navigation"
      >
        <div className="grid grid-cols-4 h-16 w-full">
          {mainNavItems.map((item) => {
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
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium leading-none">
                  {item.name}
                </span>
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

          {/* More Button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className={`relative flex flex-col items-center justify-center transition-all duration-200 ${
              showMore || moreNavItems.some(item => isActive(item.path))
                ? 'text-gold'
                : 'text-primary-400 hover:text-white'
            }`}
            aria-label="More"
          >
            <FaBars className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium leading-none">More</span>
            {(showMore || moreNavItems.some(item => isActive(item.path))) && (
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
          </button>
        </div>
      </nav>
    </>
  )
}

export default MobileBottomNav