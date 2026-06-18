import { memo } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { CONTACT, SOCIAL, BUSINESS_HOURS } from '../../../utils/constants'
import { getWhatsAppLink, getPhoneLink, getEmailLink, getGoogleMapsLink } from '../../../utils/helpers'

/**
 * Contact Info Component
 * Displays contact details and social links
 */
const ContactInfo = memo(() => {
  return (
    <div className="space-y-4">
      {/* Phone */}
      <a 
        href={getPhoneLink(CONTACT.phone)}
        className="flex items-start gap-4 group"
      >
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors">
          <FaPhone className="w-5 h-5 text-gold group-hover:text-primary transition-colors" />
        </div>
        <div>
          <p className="text-primary-300 text-xs mb-1">Phone</p>
          <p className="text-white font-semibold group-hover:text-gold transition-colors">{CONTACT.phone}</p>
        </div>
      </a>

      {/* WhatsApp */}
      <a 
        href={getWhatsAppLink(CONTACT.whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-4 group"
      >
        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-colors">
          <FaWhatsapp className="w-5 h-5 text-green-400 group-hover:text-white transition-colors" />
        </div>
        <div>
          <p className="text-primary-300 text-xs mb-1">WhatsApp</p>
          <p className="text-white font-semibold group-hover:text-green-400 transition-colors">+92-{CONTACT.whatsapp.slice(2)}</p>
        </div>
      </a>

      {/* Email */}
      <a 
        href={getEmailLink(CONTACT.email)}
        className="flex items-start gap-4 group"
      >
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors">
          <FaEnvelope className="w-5 h-5 text-gold group-hover:text-primary transition-colors" />
        </div>
        <div>
          <p className="text-primary-300 text-xs mb-1">Email</p>
          <p className="text-white font-semibold group-hover:text-gold transition-colors">{CONTACT.email}</p>
        </div>
      </a>

      {/* Address */}
      <a 
        href={getGoogleMapsLink(CONTACT.address)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-4 group"
      >
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors">
          <FaMapMarkerAlt className="w-5 h-5 text-gold group-hover:text-primary transition-colors" />
        </div>
        <div>
          <p className="text-primary-300 text-xs mb-1">Address</p>
          <p className="text-white font-semibold group-hover:text-gold transition-colors">{CONTACT.address}</p>
        </div>
      </a>

      {/* Business Hours */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <FaClock className="w-5 h-5 text-gold" />
        </div>
        <div>
          <p className="text-primary-300 text-xs mb-1">Business Hours</p>
          <div className="space-y-1">
            {BUSINESS_HOURS.map((item) => (
              <p key={item.day} className="text-white text-sm">
                <span className="font-medium">{item.day}:</span> {item.hours}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="pt-6">
        <p className="text-primary-300 text-sm mb-4">Follow Us</p>
        <div className="flex items-center gap-3">
          <a 
            href={SOCIAL.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-primary-300 hover:bg-blue-600 hover:text-white transition-all"
            aria-label="Facebook"
          >
            <FaFacebook className="w-5 h-5" />
          </a>
          <a 
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-primary-300 hover:bg-pink-600 hover:text-white transition-all"
            aria-label="Instagram"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a 
            href={SOCIAL.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-primary-300 hover:bg-red-600 hover:text-white transition-all"
            aria-label="YouTube"
          >
            <FaYoutube className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
})

ContactInfo.displayName = 'ContactInfo'

export default ContactInfo
