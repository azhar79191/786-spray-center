import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaComment, FaPaperPlane, FaCheckCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { contactService } from '../../services/contactService'
import { validateContactForm } from '../../utils/validations'
import Spinner from '../loaders/Spinner'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validation = validateContactForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      toast.error('Please fix the errors in the form')
      return
    }
    setIsSubmitting(true)
    try {
      const response = await contactService.submit(formData)
      if (response.success) {
        setIsSubmitted(true)
        toast.success(response.message || 'Message sent successfully!')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 relative z-10"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h3 className="text-primary font-display font-bold text-3xl mb-3">
            Message Sent! 🎉
          </h3>
          <p className="text-primary-300 text-lg mb-8">
            Thank you for contacting us. We'll get back to you within 24 hours!
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-4 bg-gradient-to-r from-gold to-amber-600 text-primary font-bold rounded-xl"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="relative z-10"
        noValidate
      >
        <div className="mb-8">
          <h3 className="text-primary font-display font-bold text-3xl mb-2">
            Send Us a Message
          </h3>
          <p className="text-primary-300">Fill out the form below and we'll get back to you soon</p>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-primary font-semibold text-sm mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-300 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`w-full pl-14 pr-5 py-4 bg-primary-5 border-2 border-primary-10 rounded-2xl text-primary focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-primary font-semibold text-sm mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-300 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full pl-14 pr-5 py-4 bg-primary-5 border-2 border-primary-10 rounded-2xl text-primary focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-primary font-semibold text-sm mb-2">
                Phone Number
              </label>
              <div className="relative">
                <FaPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-300 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92-300-1234567"
                  className={`w-full pl-14 pr-5 py-4 bg-primary-5 border-2 border-primary-10 rounded-2xl text-primary focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-primary font-semibold text-sm mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaComment className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-300 w-5 h-5" />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className={`w-full pl-14 pr-5 py-4 bg-primary-5 border-2 border-primary-10 rounded-2xl text-primary focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
              </div>
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>
          </div>

          <div>
            <label className="block text-primary font-semibold text-sm mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your requirements..."
              rows={5}
              className={`w-full px-5 py-4 bg-primary-5 border-2 border-primary-10 rounded-2xl text-primary focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all resize-none ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold text-primary font-bold rounded-2xl transition-all hover:shadow-lg hover:shadow-gold/30 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Spinner size="sm" color="primary" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <FaPaperPlane className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.form>
    </div>
  )
}

export default ContactForm
