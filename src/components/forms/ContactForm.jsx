import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaComment, FaPaperPlane, FaCheckCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { contactService } from '../../services/contactService'
import { validateContactForm } from '../../utils/validations'
import Spinner from '../loaders/Spinner'

/**
 * Contact form component
 * Handles form submission with validation and toast notifications
 */
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
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
      toast.error(error.message || 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 shadow-card text-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-primary font-display font-bold text-2xl mb-3">
          Message Sent Successfully!
        </h3>
        <p className="text-primary-300 mb-6">
          Thank you for contacting us. We will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn-primary"
        >
          Send Another Message
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 shadow-card"
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-primary font-medium text-sm mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300 w-4 h-4" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={`input-premium pl-11 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-primary font-medium text-sm mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300 w-4 h-4" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`input-premium pl-11 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-primary font-medium text-sm mb-2">
            Phone Number
          </label>
          <div className="relative">
            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300 w-4 h-4" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+92-300-1234567"
              className={`input-premium pl-11 ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-primary font-medium text-sm mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaComment className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300 w-4 h-4" />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              className={`input-premium pl-11 ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
          </div>
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
        </div>
      </div>

      {/* Message */}
      <div className="mt-6">
        <label className="block text-primary font-medium text-sm mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your requirements..."
          rows={5}
          className={`input-premium resize-none ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      {/* Submit */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Spinner size="sm" color="primary" />
              Sending...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <FaPaperPlane className="w-4 h-4" />
              Send Message
            </span>
          )}
        </button>
      </div>
    </motion.form>
  )
}

export default ContactForm
