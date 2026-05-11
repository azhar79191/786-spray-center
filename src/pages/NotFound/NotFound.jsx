import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHome, FaArrowLeft } from 'react-icons/fa'
import SEO from '../../components/common/SEO'

/**
 * 404 Not Found Page
 * Custom error page with navigation options
 */
const NotFound = () => {
  return (
    <>
      <SEO 
        title="Page Not Found" 
        description="The page you are looking for does not exist."
      />

      <section className="min-h-[80vh] flex items-center justify-center bg-surface">
        <div className="container-premium text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 404 Number */}
            <div className="relative mb-8">
              <h1 className="text-9xl md:text-[12rem] font-display font-bold text-primary/10 select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl md:text-8xl font-display font-bold text-gold">
                  404
                </span>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Page Not Found
            </h2>
            <p className="text-primary-300 text-lg max-w-md mx-auto mb-8">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/" className="btn-primary">
                <FaHome className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <Link to="/products" className="btn-secondary">
                <FaArrowLeft className="w-5 h-5 mr-2" />
                Browse Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default NotFound
