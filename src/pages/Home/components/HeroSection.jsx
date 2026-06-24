import { memo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaLeaf, FaShieldAlt, FaTruck, FaAward, FaCheck } from 'react-icons/fa'
import ParticleField from '../../../components/common/ParticleField'

/**
 * Hero Section Component - Redesigned
 * Modern, eye-catching design with enhanced visuals
 */
const HeroSection = memo(() => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const stats = [
    { number: '8+', label: 'Years Experience', icon: <FaAward className="w-5 h-5" /> },
    { number: '500+', label: 'Happy Farmers', icon: <FaLeaf className="w-5 h-5" /> },
    { number: '50+', label: 'Products', icon: <FaShieldAlt className="w-5 h-5" /> },
  ]

  const features = [
    { text: '100% Genuine Products',
      icon: <FaCheck className="w-4 h-4" /> },
    { text: 'Expert Consultation',
      icon: <FaCheck className="w-4 h-4" /> },
    { text: 'Competitive Prices',
      icon: <FaCheck className="w-4 h-4" /> },
  ]

  return (
    <section className="relative min-h-screen flex items-center bg-primary overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        poster="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&q=80"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-green-crops-in-the-field-1172-large.mp4"
          type="video/mp4"
        />
      </video>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-primary/90" />
      
      {/* Decorative shapes */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      
      {/* Particle field */}
      <div className="absolute inset-0 z-[1]">
        <ParticleField />
      </div>

      <div className="container-premium relative z-10 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content - 7 columns on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-7 w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6 md:mb-8"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full">
                <FaLeaf className="w-4 h-4 text-gold" />
                <span className="text-gold text-xs md:text-sm font-semibold tracking-wide uppercase">
                  Since 2018
                </span>
              </div>
              <div className="h-px w-8 md:w-12 bg-gold/40" />
              <span className="text-primary-300 text-xs md:text-sm font-medium">
                Minchinabad, Pakistan
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-[1.1] mb-6 md:mb-8"
            >
              Elevate Your
              <br />
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Agricultural Success
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-primary-200 text-sm md:text-lg lg:text-xl max-w-xl mb-8 md:mb-10 leading-relaxed"
            >
              Your trusted partner for genuine pesticides, fertilizers, seeds, and spray machines. 
              Expert guidance to maximize your crop yield with premium quality products.
            </motion.p>

            {/* Feature badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-10"
            >
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                    {feature.icon}
                  </div>
                  <span className="text-primary-200 text-xs md:text-sm font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-3 md:gap-4"
            >
              <Link to="/products" className="btn-primary">
                Explore Products
                <FaArrowRight className="ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Get Free Consultation
              </Link>
            </motion.div>

            {/* Stats - All Screens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 md:mt-12"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
                    className="text-center md:text-left p-4 md:p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                        {stat.icon}
                      </div>
                    </div>
                    <p className="text-gold text-2xl md:text-3xl font-bold">{stat.number}</p>
                    <p className="text-primary-300 text-xs md:text-sm mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - 5 columns on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-24 h-24 border-2 border-gold/30 rounded-3xl" />
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-gold rounded-2xl blur-2xl" />
              
              {/* Main image */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-gold rounded-[2rem] blur-xl opacity-50" />
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80"
                  alt="Premium agricultural products"
                  className="relative rounded-[2rem] shadow-gold-lg w-full h-[550px] object-cover"
                  loading="eager"
                  width="800"
                  height="550"
                />

                {/* Floating card 1 */}
                <motion.div
                  className="absolute -top-6 -right-6 bg-white rounded-2xl p-5 shadow-gold-lg"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                      <FaLeaf className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-primary font-bold">100% Genuine</p>
                      <p className="text-primary-300 text-sm">Original Products</p>
                    </div>
                  </div>
                </motion.div>


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
