import { memo } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { CONTACT, SOCIAL, BUSINESS_HOURS } from '../../../utils/constants'
import { getWhatsAppLink, getPhoneLink, getEmailLink } from '../../../utils/helpers'

/**
 * Contact Info Component
 * Displays contact details and social links
 */
const ContactInfo = memo(() => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-1"
    >
      <div className="bg-white rounded-2xl p-8 shadow-card sticky top-24">
        <h3 className="text-primary font-display font-bold text-2xl mb-8">
          Contact Information
        </h3>

        <address className="space-y-6 not-italic">
          <a 
            href={getPhoneLink(CONTACT.phone)}
            className="flex items-start gap-4 group"
          >
            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors">
              <FaPhone className="w-5 h-5 text-gold group-hover:text-primary transition-colors" />
            </div>
            <div>
              <p className="text-primary-300 text-xs mb-1">Phone</p>
              <p className="text-primary font-semibold group-hover:text-gold transition-colors">{CONTACT.phone}</p>
            </div>
          </a>

          <a 
            href={getWhatsAppLink(CONTACT.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-colors">
              <FaWhatsapp className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-primary-300 text-xs mb-1">WhatsApp</p>
              <p className="text-primary font-semibold group-hover:text-green-600 transition-colors">+92-{CONTACT.whatsapp.slice(2)}</p>
            </div>
          </a>

          <a 
            href={getEmailLink(CONTACT.email)}
            className="flex items-start gap-4 group"
          >
            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors">
              <FaEnvelope className="w-5 h-5 text-gold group-hover:text-primary transition-colors" />
            </div>
            <div>
              <p className="text-primary-300 text-xs mb-1">Email</p>
              <p className="text-primary font-semibold group-hover:text-gold transition-colors">{CONTACT.email}</p>
            </div>
          </a>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaMapMarkerAlt className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-primary-300 text-xs mb-1">Address</p>
              <p className="text-primary font-semibold">{CONTACT.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaClock className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-primary-300 text-xs mb-1">Business Hours</p>
              <div className="space-y-1">
                {BUSINESS_HOURS.map((item) => (
                  <p key={item.day} className="text-primary text-sm">
                    <span className="font-medium">{item.day}:</span> {item.hours}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </address>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-primary-600">
          <p className="text-primary-300 text-sm mb-4">Follow Us</p>
          <div className="flex items-center gap-3">
            <a 
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center text-primary-300 hover:bg-blue-600 hover:text-white transition-all"
              aria-label="Facebook"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
            <a 
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center text-primary-300 hover:bg-pink-600 hover:text-white transition-all"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a 
              href={SOCIAL.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center text-primary-300 hover:bg-red-600 hover:text-white transition-all"
              aria-label="YouTube"
            >
              <FaYoutube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.aside>
  )
})

ContactInfo.displayName = 'ContactInfo'

export default ContactInfo
