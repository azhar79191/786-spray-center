import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import SEO from '../../components/common/SEO'
import ContactForm from '../../components/forms/ContactForm'
import Spinner from '../../components/loaders/Spinner'
import { 
  FaEnvelope, 
  FaPhone, 
  FaWhatsapp, 
  FaSeedling,
  FaShieldAlt,
  FaTruck,
  FaLeaf
} from 'react-icons/fa'
import { CONTACT } from '../../utils/constants'
import { getWhatsAppLink, getPhoneLink, getEmailLink } from '../../utils/helpers'

// Eager load above-the-fold
import ContactHero from './components/ContactHero'

// Lazy load map (below the fold)
const ContactMap = lazy(() => import('./components/ContactMap'))

const features = [
  { icon: FaSeedling, title: 'Expert Advice', desc: 'Free consultation' },
  { icon: FaShieldAlt, title: 'Genuine Products', desc: '100% authentic' },
  { icon: FaTruck, title: 'Fast Delivery', desc: 'Same day service' },
  { icon: FaLeaf, title: 'Best Prices', desc: 'Competitive rates' },
]

const Contact = () => {
  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Visit or call Bismillah Spray Center in Minchinabad. Phone: +92 300 1331616. Address: Behramka Hithar, Tehsil Minchinabad, District Bahawalnagar, Punjab. Open Mon-Sat 8AM-8PM, Sun 9AM-2PM. Expert agricultural advice available."
        keywords="agricultural shop Bahawalnagar contact, pesticide shop contact Minchinabad, agricultural supplier phone number, farming products Minchinabad, delivery Bahawalnagar district, agricultural consultation Punjab"
      />

      {/* Hero */}
      <ContactHero />

      {/* Contact Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container-premium relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <FaWhatsapp className="w-5 h-5" />
              Get In Touch Today
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              Let's Talk About Your <span className="text-gold">Farm</span>
            </h2>
            <p className="text-primary-200 text-lg md:text-xl max-w-2xl mx-auto">
              Have questions about our products or services? We'd love to hear from you!
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left - Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Info Card 1 - Quick Contacts */}
              <div className="bg-primary-90 border border-primary-70 rounded-3xl p-8">
                <h3 className="text-2xl font-display font-bold text-white mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <a 
                    href={getWhatsAppLink(CONTACT.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group"
                  >
                    <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center group-hover:bg-green-500 transition-all">
                      <FaWhatsapp className="w-7 h-7 text-green-400 group-hover:text-white transition-all" />
                    </div>
                    <div className="flex-1">
                      <p className="text-primary-300 text-sm">WhatsApp</p>
                      <p className="text-white font-bold text-lg">{CONTACT.whatsapp}</p>
                    </div>
                  </a>
                  
                  <a 
                    href={getPhoneLink(CONTACT.phone)}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group"
                  >
                    <div className="w-14 h-14 bg-gold/20 rounded-2xl flex items-center justify-center group-hover:bg-gold transition-all">
                      <FaPhone className="w-7 h-7 text-gold group-hover:text-primary transition-all" />
                    </div>
                    <div className="flex-1">
                      <p className="text-primary-300 text-sm">Phone</p>
                      <p className="text-white font-bold text-lg">{CONTACT.phone}</p>
                    </div>
                  </a>

                  <a 
                    href={getEmailLink(CONTACT.email)}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group"
                  >
                    <div className="w-14 h-14 bg-gold/20 rounded-2xl flex items-center justify-center group-hover:bg-gold transition-all">
                      <FaEnvelope className="w-7 h-7 text-gold group-hover:text-primary transition-all" />
                    </div>
                    <div className="flex-1">
                      <p className="text-primary-300 text-sm">Email</p>
                      <p className="text-white font-bold text-lg">{CONTACT.email}</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Info Card 2 - Features */}
              <div className="bg-primary-90 border border-primary-70 rounded-3xl p-8">
                <h3 className="text-2xl font-display font-bold text-white mb-6">Why Choose Us?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-5 bg-white/5 rounded-2xl"
                    >
                      <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-gold" />
                      </div>
                      <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                      <p className="text-primary-300 text-sm">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right - Form Card + Address Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-16"
            >
              <ContactForm />
              
              {/* Info Card 3 - Address (moved from left) */}
              <div className="bg-gold/10 border border-gold/20 rounded-3xl p-8 ">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gold/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <p className="text-primary-300 text-sm mb-1">Visit Us At</p>
                    <p className="text-white font-bold text-lg leading-relaxed">{CONTACT.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map - Lazy loaded */}
      <Suspense fallback={<div className="h-[400px] flex items-center justify-center bg-primary-700"><Spinner /></div>}>
        <ContactMap />
      </Suspense>
    </>
  )
}

export default Contact
