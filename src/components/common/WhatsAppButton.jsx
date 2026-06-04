import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { getWhatsAppLink } from '../../utils/helpers'
import { CONTACT } from '../../utils/constants'

/**
 * Floating WhatsApp button
 * Always visible for quick customer contact
 */
const WhatsAppButton = () => {
  const whatsappUrl = getWhatsAppLink(
    CONTACT.whatsapp,
    'Assalamualaikum! I would like to inquire about your products and services.'
  )

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 md:bottom-6 right-8 z-40 w-14 h-14 bg-primary text-gold rounded-full shadow-gold-lg flex items-center justify-center hover:bg-primary-50 transition-colors duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Waves */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-30 animate-ping"></span>
      <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-10 animate-pulse"></span>

      {/* Icon */}
      <FaWhatsapp className="w-8 h-8 relative z-10" />
    </motion.a>
  )
}

export default WhatsAppButton