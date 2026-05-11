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
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp className="w-6 h-6" />
      <span className="hidden sm:inline font-semibold text-sm">Chat on WhatsApp</span>
    </motion.a>
  )
}

export default WhatsAppButton
