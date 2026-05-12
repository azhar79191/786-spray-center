import { memo } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../../../components/common/SectionTitle'

const ServicesHero = memo(() => {
  return (
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
  )
})

ServicesHero.displayName = 'ServicesHero'

export default ServicesHero
