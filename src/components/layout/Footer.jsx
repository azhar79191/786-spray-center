import { Link } from 'react-router-dom'
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLeaf,
  FaClock
} from 'react-icons/fa'
import { CONTACT, SOCIAL, BUSINESS_HOURS } from '../../utils/constants'
import { getWhatsAppLink, getPhoneLink, getEmailLink, getGoogleMapsLink } from '../../utils/helpers'

/**
 * Premium footer component
 * Multi-column layout with contact info, links, and social media
 */
const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ]

  const productLinks = [
    { name: 'Pesticides', path: '/products?category=Pesticides' },
    { name: 'Insecticides', path: '/products?category=Insecticides' },
    { name: 'Herbicides', path: '/products?category=Herbicides' },
    { name: 'Fungicides', path: '/products?category=Fungicides' },
    { name: 'Fertilizers', path: '/products?category=Fertilizers' },
    { name: 'Seeds', path: '/products?category=Seeds' },
  ]

  const brandLinks = [
    { name: 'Warble Products', path: '/brands' },
    { name: 'FFC Dealer', path: '/brands' },
    { name: 'Engro Fertilizers', path: '/brands' },
    { name: 'Agro Mark', path: '/brands' },
  ]

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-20 w-56 h-56 bg-gold/5 rounded-full blur-3xl" />
      
      <div className="container-premium py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-6">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 md:mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-gold rounded-lg opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300" />
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-gold rounded-lg flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
                  <FaLeaf className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-gold font-display font-bold text-lg md:text-xl group-hover:text-gradient-gold transition-colors duration-300">Bismillah</h3>
                <p className="text-primary-400 text-xs md:text-sm tracking-wider">Spray Center</p>
              </div>
            </div>
            <p className="text-primary-300 text-xs md:text-sm leading-relaxed mb-4 md:mb-6">
              Leading agricultural products supplier in Minchinabad, Bahawalnagar, Punjab. 
              Authorized dealer of Warble, Agro Mark, FFC, Engro, Agro One, Abdullah Haseeb. 
              Quality pesticides, fertilizers, seeds for Pakistani farmers since 2015.
            </p>
            <div className="flex items-center gap-2 md:gap-3">
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-300 hover:bg-gold hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <FaFacebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-300 hover:bg-gold hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <FaInstagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-300 hover:bg-gold hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <FaYoutube className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-semibold text-sm md:text-lg mb-3 md:mb-6">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-300 hover:text-gold transition-colors duration-200 text-xs md:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-gold font-semibold text-sm md:text-lg mb-3 md:mb-6">Our Products</h4>
            <ul className="space-y-2 md:space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-300 hover:text-gold transition-colors duration-200 text-xs md:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-gold font-semibold text-sm md:text-lg mb-3 md:mb-6">Authorized Brands</h4>
            <ul className="space-y-2 md:space-y-3">
              {brandLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-300 hover:text-gold transition-colors duration-200 text-xs md:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gold font-semibold text-sm md:text-lg mb-3 md:mb-6">Contact Us</h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <a
                  href={getPhoneLink(CONTACT.phone)}
                  className="flex items-start gap-2 md:gap-3 text-primary-300 hover:text-gold transition-colors group"
                >
                  <FaPhone className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-gold group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="text-xs md:text-sm">{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppLink(CONTACT.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 md:gap-3 text-primary-300 hover:text-gold transition-colors group"
                >
                  <FaWhatsapp className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-gold group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="text-xs md:text-sm">+92-{CONTACT.whatsapp.slice(2)}</span>
                </a>
              </li>
              <li>
                <a
                  href={getEmailLink(CONTACT.email)}
                  className="flex items-start gap-2 md:gap-3 text-primary-300 hover:text-gold transition-colors group overflow-hidden"
                >
                  <FaEnvelope className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-gold group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="text-xs break-all leading-relaxed">
                    {CONTACT.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={getGoogleMapsLink(CONTACT.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 md:gap-3 text-primary-300 hover:text-gold transition-colors group overflow-hidden"
                >
                  <FaMapMarkerAlt className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-gold group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="text-xs md:text-sm">{CONTACT.address}</span>
                </a>
              </li>
            </ul>

            {/* Business Hours */}
            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-primary-50">
              <h5 className="text-gold font-medium text-xs md:text-sm mb-2 md:mb-3 flex items-center gap-1 md:gap-2">
                <FaClock className="w-3 h-3 md:w-4 md:h-4" />
                Business Hours
              </h5>
              <ul className="space-y-1">
                {BUSINESS_HOURS.map((item) => (
                  <li key={item.day} className="flex justify-between text-xs text-primary-300">
                    <span>{item.day}</span>
                    <span>{item.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-50">
        <div className="container-premium py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-primary-400 text-xs md:text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Bismillah Spray Center. All rights reserved.
          </p>
          <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-primary-400">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
