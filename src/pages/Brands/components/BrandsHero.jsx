import { memo } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../../../components/common/SectionTitle'

const BrandsHero = memo(() => {
  return (
    <section className="relative py-24 bg-primary">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1920&q=80')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/80" />

      <div className="container-premium relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            title="Our Brand Partners"
            subtitle="Trusted Worldwide"
            light
          />
          <p className="text-primary-400 text-lg max-w-2xl mx-auto mt-4">
            We partner with the world's leading agricultural brands to bring you genuine, high-quality products.
          </p>
        </motion.div>
      </div>
    </section>
  )
})

BrandsHero.displayName = 'BrandsHero'

export default BrandsHero
