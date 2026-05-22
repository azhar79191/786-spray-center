import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaLeaf } from 'react-icons/fa'

/**
 * Hero Section Component
 * Main landing section with CTA
 */
const HeroSection = memo(() => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80')] bg-cover bg-center" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />

      <div className="container-premium relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                Since 2010
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
              Premium
              <span className="text-gold block">Agricultural</span>
              Solutions
            </h1>

            <p className="text-primary-400 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
              Your trusted partner for genuine pesticides, fertilizers, seeds, and spray machines in Minchinabad, Pakistan.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary text-lg">
                Explore Products
                <FaArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/contact" className="btn-secondary text-lg">
                Contact Us
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-primary-50">
              <div>
                <p className="text-gold text-3xl font-bold">10+</p>
                <p className="text-primary-400 text-sm">Years Experience</p>
              </div>
              <div className="h-12 w-px bg-primary-50" />
              <div>
                <p className="text-gold text-3xl font-bold">1000+</p>
                <p className="text-primary-400 text-sm">Happy Farmers</p>
              </div>
              <div className="h-12 w-px bg-primary-50" />
              <div>
                <p className="text-gold text-3xl font-bold">50+</p>
                <p className="text-primary-400 text-sm">Products</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gold/20 rounded-3xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80"
                alt="Agricultural products"
                className="relative rounded-3xl shadow-premium w-full h-[500px] object-cover"
                loading="eager"
              />

              {/* Floating card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-premium"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <FaLeaf className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-primary font-bold">100% Genuine</p>
                    <p className="text-primary-300 text-sm">Original Products</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection
