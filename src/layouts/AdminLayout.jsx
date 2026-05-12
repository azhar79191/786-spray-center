import { useEffect } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaTachometerAlt, 
  FaBox, 
  FaQuestionCircle, 
  FaEnvelope,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaLeaf,
  FaImage,
  FaGlobe,
  FaCog,
  FaStar
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useState } from 'react'

/**
 * Admin Layout
 * Sidebar navigation and protected admin area
 */
const AdminLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Get admin user info
  const getAdminName = () => {
    try {
      const adminUser = localStorage.getItem('adminUser')
      if (adminUser) {
        const user = JSON.parse(adminUser)
        return user.fullName || user.username || 'Admin'
      }
      return 'Admin'
    } catch (error) {
      return 'Admin'
    }
  }

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    toast.success('Logged out successfully')
    navigate('/admin/login')
  }

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: FaTachometerAlt
    },
    {
      name: 'Products',
      path: '/admin/products',
      icon: FaBox
    },
    {
      name: 'Gallery',
      path: '/admin/gallery',
      icon: FaImage
    },
    {
      name: 'Brands',
      path: '/admin/brands',
      icon: FaGlobe
    },
    {
      name: 'Service Requests',
      path: '/admin/service-requests',
      icon: FaCog
    },
    {
      name: 'Testimonials',
      path: '/admin/testimonials',
      icon: FaStar
    },
    {
      name: 'FAQs',
      path: '/admin/faqs',
      icon: FaQuestionCircle
    },
    {
      name: 'Contacts',
      path: '/admin/contacts',
      icon: FaEnvelope
    }
  ]

  const isActive = (path) => {
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-primary text-white
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-primary-50">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
                <FaLeaf className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-gold font-display font-bold text-lg">Admin Panel</h1>
                <p className="text-primary-400 text-xs">Bismillah Spray Center</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${isActive(item.path)
                    ? 'bg-gold text-primary font-semibold'
                    : 'text-primary-400 hover:bg-primary-50 hover:text-white'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-primary-50">
            <div className="mb-3 px-4">
              <p className="text-primary-400 text-xs mb-1">Logged in as</p>
              <p className="text-white font-medium truncate">{getAdminName()}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-primary-400 hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-primary hover:bg-surface rounded-lg transition-colors"
            >
              {sidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
            
            <div className="flex items-center gap-4 ml-auto">
              <Link
                to="/"
                target="_blank"
                className="text-sm text-primary-300 hover:text-gold transition-colors"
              >
                View Website
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-primary-100 py-4 px-4 lg:px-8">
          <p className="text-center text-primary-300 text-sm">
            &copy; {new Date().getFullYear()} Bismillah Spray Center. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default AdminLayout
