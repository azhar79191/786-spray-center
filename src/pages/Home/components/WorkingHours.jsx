import { memo } from 'react'
import { motion } from 'framer-motion'
import { FaClock, FaPhone, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa'
import { BUSINESS_HOURS, CONTACT } from '../../../utils/constants'
import { getWhatsAppLink, getPhoneLink } from '../../../utils/helpers'

/**
 * Working Hours Section
 * Displays business hours and quick contact
 */
const WorkingHours = memo(() => {
  return (
    <section className="py-16 bg-gold">
      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
              Visit Us Today
            </h2>
            <p className="text-primary/70 mb-8">
              Our shop is conveniently located on Main Jaranwala Road, Faisalabad. Visit us for all your agricultural needs.
            </p>

            <div className="space-y-4">
              {BUSINESS_HOURS.map((item) => (
                <div key={item.day} className="flex items-center justify-between bg-white/20 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <FaClock className="w-5 h-5 text-primary" aria-hidden="true" />
                    <span className="text-primary font-medium">{item.day}</span>
                  </div>
                  <span className="text-primary font-semibold">{item.hours}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-premium"
          >
            <h3 className="text-primary font-display font-bold text-2xl mb-6">
              Quick Contact
            </h3>

            <div className="space-y-4">
              <a
                href={getPhoneLink(CONTACT.phone)}
                className="group flex items-center gap-4 p-4 bg-primary-700 rounded-xl hover:bg-primary-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaPhone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-primary-300 group-hover:text-[#D4A017] text-xs">Phone</p>
                  <p className="text-primary group-hover:text-[#D4A017] font-semibold">{CONTACT.phone}</p>
                </div>
              </a>

              <a
                href={getWhatsAppLink(CONTACT.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 bg-primary-700 rounded-xl hover:bg-primary-50 transition-colors"
              >
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaWhatsapp className="w-5 h-5 text-white" />
                </div>

                <div>
                  <p className="text-primary-300 group-hover:text-[#D4A017] transition-colors text-xs">
                    WhatsApp
                  </p>

                  <p className="text-primary group-hover:text-[#D4A017] transition-colors font-semibold">
                    +92-{CONTACT.whatsapp.slice(2)}
                  </p>
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/fQ84ruXiC83vPDm1A"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 bg-primary-700 rounded-xl hover:bg-primary-50 transition-colors"
              >
                <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div>
                    <p className="text-primary-300 group-hover:text-[#D4A017] text-xs">Address
                    </p> 
                  <p className="text-primary group-hover:text-[#D4A017] text-underline-[#D4A017] font-semibold text-sm">
                    {CONTACT.address}
                    </p>
                    </div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

WorkingHours.displayName = 'WorkingHours'

export default WorkingHours
