import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import SEO from '../../components/common/SEO'
import SectionTitle from '../../components/common/SectionTitle'
import ContactForm from '../../components/forms/ContactForm'
import { CONTACT, SOCIAL, BUSINESS_HOURS } from '../../utils/constants'
import { getWhatsAppLink, getPhoneLink, getEmailLink } from '../../utils/helpers'

/**
 * Contact Page
 * Contact form, map, and business information
 */
const Contact = () => {
  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with Bismillah Spray Center for agricultural products, consultation, and support."
      />

      {/* Hero */}
      <section className="relative py-24 bg-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />

        <div className="container-premium relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="Get in Touch"
              subtitle="Contact Us"
              light
            />
            <p className="text-primary-400 text-lg max-w-2xl mx-auto mt-4">
              Have questions about our products or services? We are here to help you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
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

                <div className="space-y-6">
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
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-primary-600">
                  <p className="text-primary-300 text-sm mb-4">Follow Us</p>
                  <div className="flex items-center gap-3">
                    <a 
                      href={SOCIAL.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center text-primary-300 hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <FaFacebook className="w-5 h-5" />
                    </a>
                    <a 
                      href={SOCIAL.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center text-primary-300 hover:bg-pink-600 hover:text-white transition-all"
                    >
                      <FaInstagram className="w-5 h-5" />
                    </a>
                    <a 
                      href={SOCIAL.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center text-primary-300 hover:bg-red-600 hover:text-white transition-all"
                    >
                      <FaYoutube className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] bg-primary-700">
        {CONTACT.googleMapsEmbed ? (
          <iframe
            src={CONTACT.googleMapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bismillah Spray Center Location"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-primary-400">Map loading...</p>
          </div>
        )}
      </section>
    </>
  )
}

export default Contact
