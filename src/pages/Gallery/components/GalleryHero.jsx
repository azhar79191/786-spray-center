import { memo } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../../../components/common/SectionTitle'

const GalleryHero = memo(() => {
  return (
    <section className="relative py-24 bg-primary">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=1920&q=80')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />

      <div className="container-premium relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            title="Our Gallery"
            subtitle="Visual Journey"
            light
          />
        </motion.div>
      </div>
    </section>
  )
})

GalleryHero.displayName = 'GalleryHero'

export default GalleryHero
