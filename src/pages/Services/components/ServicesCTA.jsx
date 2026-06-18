import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaArrowRight, 
  FaPhone, 
  FaWhatsapp, 
  FaCheckCircle, 
  FaMapMarkerAlt, 
  FaSeedling,
  FaShieldAlt,
  FaTruck,
  FaChevronRight
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { SERVICES, CONTACT } from '../../../utils/constants'
import { getWhatsAppLink, getPhoneLink } from '../../../utils/helpers'
import { submitServiceRequest } from '../../../services/serviceRequestService'
import Spinner from '../../../components/loaders/Spinner'

const ServicesCTA = memo(() => {
  const [formData, setFormData] = useState({
    serviceType: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.serviceType || !formData.name || !formData.phone || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }
    setIsSubmitting(true)
    try {
      await submitServiceRequest(formData)
      toast.success('Service request submitted successfully!')
      setIsSubmitted(true)
      setFormData({ serviceType: '', name: '', phone: '', email: '', message: '' })
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      toast.error('Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    { icon: FaSeedling, title: 'Expert Consultation', desc: 'Certified agronomists' },
    { icon: FaShieldAlt, title: 'Guaranteed Results', desc: 'Proven solutions' },
    { icon: FaTruck, title: 'Free Delivery', desc: 'On bulk orders' },
    { icon: FaShieldAlt, title: 'Quality Products', desc: 'Authentic brands' },
  ]

  return (
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
            24/7 Support Available
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            Ready to Transform Your <span className="text-gold">Farm?</span>
          </h2>
          <p className="text-primary-200 text-lg md:text-xl max-w-2xl mx-auto">
            Get expert agricultural services and quality products delivered to your doorstep
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
                  <FaChevronRight className="w-5 h-5 text-primary-300 group-hover:text-gold group-hover:translate-x-1 transition-all" />
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
                  <FaChevronRight className="w-5 h-5 text-primary-300 group-hover:text-gold group-hover:translate-x-1 transition-all" />
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

            {/* Info Card 3 - Location */}
            <div className="bg-gold/10 border border-gold/20 rounded-3xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gold/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <p className="text-primary-300 text-sm mb-1">Visit Us</p>
                  <p className="text-white font-bold text-lg leading-relaxed">{CONTACT.address}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-primary font-display font-bold text-3xl mb-3">
                    Success! 🎉
                  </h3>
                  <p className="text-primary-300 text-lg mb-8">
                    Your request has been submitted. We'll contact you very soon!
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-4 bg-gradient-to-r from-gold to-amber-600 text-primary font-bold rounded-xl"
                  >
                    Send Another Request
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-primary font-display font-bold text-3xl mb-2">
                      Book Your Service
                    </h3>
                    <p className="text-primary-300">Fill out the form below and we'll get back to you shortly</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-primary font-semibold text-sm mb-2">
                        Service Type <span className="text-red-500">*</span>
                      </label>
                      <select 
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-primary-5 border-2 border-primary-10 rounded-2xl text-primary focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all"
                        required
                      >
                        <option value="">Select a service...</option>
                        {SERVICES.map(s => (
                          <option key={s.title} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-primary font-semibold text-sm mb-2">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input 
                          name="name"
                          type="text" 
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name" 
                          className="w-full px-5 py-4 bg-primary-5 border-2 border-primary-10 rounded-2xl text-primary focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-primary font-semibold text-sm mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input 
                          name="phone"
                          type="tel" 
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+92-300-1234567" 
                          className="w-full px-5 py-4 bg-primary-5 border-2 border-primary-10 rounded-2xl text-primary focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-primary font-semibold text-sm mb-2">
                        Email (Optional)
                      </label>
                      <input 
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com" 
                        className="w-full px-5 py-4 bg-primary-5 border-2 border-primary-10 rounded-2xl text-primary focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-primary font-semibold text-sm mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea 
                        name="message"
                        rows={4} 
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your agricultural needs..." 
                        className="w-full px-5 py-4 bg-primary-5 border-2 border-primary-10 rounded-2xl text-primary focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all resize-none"
                        required
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold text-primary font-bold rounded-2xl transition-all hover:shadow-lg hover:shadow-gold/30 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner size="sm" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <FaArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

ServicesCTA.displayName = 'ServicesCTA'

export default ServicesCTA
