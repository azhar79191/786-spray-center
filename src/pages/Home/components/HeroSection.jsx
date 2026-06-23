import { memo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaLeaf } from 'react-icons/fa'
import ParticleField from '../../../components/common/ParticleField'

/**
 * Hero Section Component
 * Main landing section with CTA and video background
 */
const HeroSection = memo(() => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Video autoplay failed, no action needed, poster will show
      })
    }
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        poster="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&q=80"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-green-crops-in-the-field-1172-large.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      
      {/* Lighter overlay to show background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-primary/40" />
      {/* Particle field — above overlay, below content */}
      <div className="absolute inset-0 z-[1]">
        <ParticleField />
      </div>

      <div className="container-premium relative z-10 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="h-px w-8 md:w-12 bg-gold" />
              <span className="text-gold text-xs md:text-sm font-semibold tracking-widest uppercase">
                Since 2010
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-display font-bold text-white leading-tight mb-4 md:mb-6">
              Premium
              <span className="text-gold inline md:block"> Agricultural</span>
              Solutions
            </h1>

            <p className="text-primary-300 text-sm md:text-lg lg:text-xl max-w-full md:max-w-lg mb-6 md:mb-8 leading-relaxed">
              Your trusted partner for genuine pesticides, fertilizers, seeds, and spray machines in Minchinabad, Pakistan.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4 mb-8 lg:mb-0">
              <Link to="/products" className="btn-primary text-base md:text-lg">
                Explore Products
                <FaArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <Link to="/contact" className="btn-secondary text-base md:text-lg">
                Contact Us
              </Link>
            </div>

            {/* Stats - Mobile Only */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 lg:hidden"
            >
              <div className="grid grid-cols-3 gap-4 border-t border-primary-60 pt-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center"
                >
                  <p className="text-gold text-xl font-bold">10+</p>
                  <p className="text-primary-400 text-xs mt-1">Years Experience</p>
                </motion.div>
                <div className="flex justify-center">
                  <div className="h-10 w-px bg-primary-60" />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-center"
                >
                  <p className="text-gold text-xl font-bold">1000+</p>
                  <p className="text-primary-400 text-xs mt-1">Happy Farmers</p>
                </motion.div>
                <div className="hidden sm:flex justify-center">
                  <div className="h-10 w-px bg-primary-60" />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="text-center"
                >
                  <p className="text-gold text-xl font-bold">50+</p>
                  <p className="text-primary-400 text-xs mt-1">Products</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Desktop Only */}
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
                width="800"
                height="500"
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

            {/* Stats - Desktop Only */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-primary-60">
              <div className="text-center">
                <p className="text-gold text-3xl font-bold">10+</p>
                <p className="text-primary-400 text-sm">Years Experience</p>
              </div>
              <div className="h-12 w-px bg-primary-60" />
              <div className="text-center">
                <p className="text-gold text-3xl font-bold">1000+</p>
                <p className="text-primary-400 text-sm">Happy Farmers</p>
              </div>
              <div className="h-12 w-px bg-primary-60" />
              <div className="text-center">
                <p className="text-gold text-3xl font-bold">50+</p>
                <p className="text-primary-400 text-sm">Products</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection
