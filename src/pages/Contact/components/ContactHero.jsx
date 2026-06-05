import { memo } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../../../components/common/SectionTitle'

/**
 * Contact Hero Component
 */
const ContactHero = memo(() => {
  return (
    <section className="relative py-24 bg-primary">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1920&q=80')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/80" />

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
  )
})

ContactHero.displayName = 'ContactHero'

export default ContactHero
