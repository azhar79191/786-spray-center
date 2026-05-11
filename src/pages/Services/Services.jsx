import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaPhone, FaWhatsapp, FaLeaf } from 'react-icons/fa'
import SEO from '../../components/common/SEO'
import SectionTitle from '../../components/common/SectionTitle'
import ServiceCard from '../../components/cards/ServiceCard'
import { SERVICES, CONTACT } from '../../utils/constants'
import { getWhatsAppLink, getPhoneLink } from '../../utils/helpers'

/**
 * Services Page
 * Displays all services offered by Bismillah Spray Center
 */
const Services = () => {
  return (
    <>
      <SEO 
        title="Our Services" 
        description="Professional agricultural services including crop consultation, pest identification, spraying services, soil testing, and equipment repair."
      />

      {/* Hero */}
      <section className="relative py-24 bg-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />

        <div className="container-premium relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="Our Services"
              subtitle="What We Offer"
              light
            />
            <p className="text-primary-400 text-lg max-w-2xl mx-auto mt-4">
              Comprehensive agricultural services to support farmers at every stage of crop production.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gold">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
                Need Professional Agricultural Support?
              </h2>
              <p className="text-primary/70 text-lg mb-8">
                Our team of experts is ready to help you with crop consultation, pest identification, and customized treatment plans.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={getWhatsAppLink(CONTACT.whatsapp, 'Hello, I need agricultural consultation services.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5 mr-2" />
                  WhatsApp Consultation
                </a>
                <a 
                  href={getPhoneLink(CONTACT.phone)}
                  className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <FaPhone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-premium"
            >
              <h3 className="text-primary font-display font-bold text-2xl mb-6">
                Service Request Form
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-primary font-medium text-sm mb-2">Service Type</label>
                  <select className="input-premium">
                    <option>Select a service...</option>
                    {SERVICES.map(s => (
                      <option key={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-primary font-medium text-sm mb-2">Your Name</label>
                  <input type="text" placeholder="Full name" className="input-premium" />
                </div>
                <div>
                  <label className="block text-primary font-medium text-sm mb-2">Phone Number</label>
                  <input type="tel" placeholder="+92-300-1234567" className="input-premium" />
                </div>
                <div>
                  <label className="block text-primary font-medium text-sm mb-2">Message</label>
                  <textarea rows={3} placeholder="Describe your requirements..." className="input-premium resize-none" />
                </div>
                <Link to="/contact" className="btn-primary w-full text-center">
                  Submit Request
                  <FaArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
