import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import SEO from '../../components/common/SEO'
import ContactForm from '../../components/forms/ContactForm'
import TestimonialForm from '../../components/forms/TestimonialForm'
import Spinner from '../../components/loaders/Spinner'

// Eager load above-the-fold
import ContactHero from './components/ContactHero'
import ContactInfo from './components/ContactInfo'

// Lazy load map (below the fold)
const ContactMap = lazy(() => import('./components/ContactMap'))

/**
 * Contact Page
 * Contact form, map, and business information
 * Optimized with component-based architecture
 */
const Contact = () => {
  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with Bismillah Spray Center for agricultural products, consultation, and support."
      />

      {/* Hero */}
      <ContactHero />

      {/* Contact Section */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <ContactInfo />

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

      {/* Testimonial/Feedback Section */}
      <section className="section-padding bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <TestimonialForm />
          </motion.div>
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
