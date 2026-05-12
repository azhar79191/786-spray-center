import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaPhone, FaWhatsapp, FaCheckCircle } from 'react-icons/fa'
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

    // Validation
    if (!formData.serviceType || !formData.name || !formData.phone || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      await submitServiceRequest(formData)
      toast.success('Service request submitted successfully! We will contact you soon.')
      setIsSubmitted(true)
      setFormData({
        serviceType: '',
        name: '',
        phone: '',
        email: '',
        message: '',
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-primary font-display font-bold text-xl mb-2">
                  Request Submitted!
                </h3>
                <p className="text-primary-300">
                  We will contact you shortly.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-primary font-display font-bold text-2xl mb-6">
                  Service Request Form
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="service-type" className="block text-primary font-medium text-sm mb-2">
                      Service Type <span className="text-red-500">*</span>
                    </label>
                    <select 
                      id="service-type" 
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="input-premium"
                      required
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map(s => (
                        <option key={s.title} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-primary font-medium text-sm mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      id="name" 
                      name="name"
                      type="text" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full name" 
                      className="input-premium"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-primary font-medium text-sm mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input 
                      id="phone" 
                      name="phone"
                      type="tel" 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92-300-1234567" 
                      className="input-premium"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-primary font-medium text-sm mb-2">
                      Email (Optional)
                    </label>
                    <input 
                      id="email" 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com" 
                      className="input-premium"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-primary font-medium text-sm mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={3} 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your requirements..." 
                      className="input-premium resize-none"
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Spinner size="sm" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Submit Request
                        <FaArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
})

ServicesCTA.displayName = 'ServicesCTA'

export default ServicesCTA
