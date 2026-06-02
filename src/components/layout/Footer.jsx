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
import { getWhatsAppLink, getPhoneLink, getEmailLink } from '../../utils/helpers'

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
    { name: 'Insecticides', path: '/products?category=Insecticides' },
    { name: 'Herbicides', path: '/products?category=Herbicides' },
    { name: 'Fungicides', path: '/products?category=Fungicides' },
    { name: 'Fertilizers', path: '/products?category=Fertilizers' },
    { name: 'Seeds', path: '/products?category=Seeds' },
  ]

  return (
    <footer className="bg-primary text-white">
      {/* Main footer */}
      <div className="container-premium py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                <FaLeaf className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-gold font-display font-bold text-xl">Bismillah</h3>
                <p className="text-primary-400 text-sm">Spray Center</p>
              </div>
            </div>
            <p className="text-primary-300 text-sm leading-relaxed mb-6">
              Your trusted partner for premium agricultural solutions in Minchinabad, Pakistan.
              Serving farmers with genuine products since 2018.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-300 hover:bg-gold hover:text-primary transition-all duration-300"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-300 hover:bg-gold hover:text-primary transition-all duration-300"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-300 hover:bg-gold hover:text-primary transition-all duration-300"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-300 hover:text-gold transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-gold font-semibold text-lg mb-6">Our Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-300 hover:text-gold transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gold font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={getPhoneLink(CONTACT.phone)}
                  className="flex items-start gap-3 text-primary-300 hover:text-gold transition-colors group"
                >
                  <FaPhone className="w-5 h-5 mt-0.5 text-gold group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppLink(CONTACT.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-primary-300 hover:text-gold transition-colors group"
                >
                  <FaWhatsapp className="w-5 h-5 mt-0.5 text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">+92-{CONTACT.whatsapp.slice(2)}</span>
                </a>
              </li>
              <li>
                <a
                  href={getEmailLink(CONTACT.email)}
                  className="flex items-start gap-3 text-primary-300 hover:text-gold transition-colors group overflow-hidden"
                >
                  <FaEnvelope className="w-5 h-5 mt-0.5 text-gold group-hover:scale-110 transition-transform flex-shrink-0" />

                  <span className="text-xs break-all leading-relaxed">
                    {CONTACT.email}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-300">
                <FaMapMarkerAlt className="w-5 h-5 mt-0.5 text-gold flex-shrink-0" />
                <span className="text-sm">{CONTACT.address}</span>
              </li>
            </ul>

            {/* Business Hours */}
            <div className="mt-6 pt-6 border-t border-primary-50">
              <h5 className="text-gold font-medium text-sm mb-3 flex items-center gap-2">
                <FaClock className="w-4 h-4" />
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
        <div className="container-premium py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Bismillah Spray Center. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-primary-400">
            <Link to="/" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
