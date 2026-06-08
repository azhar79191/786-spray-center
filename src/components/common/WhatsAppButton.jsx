import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { getWhatsAppLink } from '../../utils/helpers'
import { CONTACT } from '../../utils/constants'

/**
 * Modern Minimalist WhatsApp Button
 * Sleek, professional, and elegant design
 */
const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const whatsappUrl = getWhatsAppLink(
    CONTACT.whatsapp,
    'Assalamualaikum! I would like to inquire about your products and services.'
  )
  
  // Track WhatsApp clicks for analytics
  const handleWhatsAppClick = () => {
    // Track with Google Analytics if available
    if (window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'WhatsApp Button',
        value: 1
      })
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-[100]">
      {/* Subtle pulse rings - only 2 rings */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{
          opacity: isHovered ? 0 : 1,
        }}
      >
        {/* Ring 1 */}
        <motion.div
          className="absolute w-16 h-16 rounded-full border-2 border-green-400/30"
          animate={{
            scale: [1, 1.3],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
        
        {/* Ring 2 */}
        <motion.div
          className="absolute w-16 h-16 rounded-full border-2 border-green-500/20"
          animate={{
            scale: [1, 1.5],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 1,
          }}
        />
      </motion.div>

      {/* Main Button Container */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.8 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          aria-label="Contact us on WhatsApp"
          title="Chat with us on WhatsApp - Bismillah Spray Center"
          className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg cursor-pointer overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-green-600"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Shine effect - subtle */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={isHovered ? {
              x: ['-100%', '100%'],
            } : {}}
            transition={{
              duration: 0.6,
            }}
          />

          {/* WhatsApp Icon */}
          <motion.div
            className="relative z-10"
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? [0, -10, 10, 0] : 0,
            }}
            transition={{
              scale: { duration: 0.2 },
              rotate: { duration: 0.5 },
            }}
          >
            <FaWhatsapp className="w-7 h-7 text-white drop-shadow-lg" />
          </motion.div>

          {/* Subtle border */}
          <div className="absolute inset-0 rounded-full ring-2 ring-white/20" />
        </motion.a>

        {/* Compact Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="relative">
                {/* Arrow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900" />
                
                {/* Tooltip content - compact */}
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl text-sm font-medium whitespace-nowrap">
                  Chat on WhatsApp
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Small notification dot */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  )
}

export default WhatsAppButton
