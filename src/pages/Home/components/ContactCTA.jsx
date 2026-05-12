import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { CONTACT } from '../../../utils/constants'
import { getWhatsAppLink } from '../../../utils/helpers'

/**
 * Contact CTA Section
 * Call-to-action for contacting the business
 */
const ContactCTA = memo(() => {
  return (
    <section className="py-20 bg-gold">
      <div className="container-premium text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary mb-6">
            Ready to Boost Your Crop Yield?
          </h2>
          <p className="text-primary/70 text-lg max-w-2xl mx-auto mb-8">
            Contact us today for expert advice and premium agricultural products. Our team is ready to help you achieve maximum productivity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-dark text-lg">
              Get in Touch
            </Link>
            <a 
              href={getWhatsAppLink(CONTACT.whatsapp, 'Hello, I would like to inquire about your products.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-green-700"
            >
              <FaWhatsapp className="w-5 h-5 mr-2" />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
})

ContactCTA.displayName = 'ContactCTA'

export default ContactCTA
