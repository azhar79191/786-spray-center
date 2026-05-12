import { memo } from 'react'
import { motion } from 'framer-motion'

const AboutHero = memo(() => {
  return (
    <section className="relative py-24 bg-primary">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />

      <div className="container-premium relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Our Story</span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            About <span className="text-gold">Bismillah</span> Spray Center
          </h1>
          <p className="text-primary-400 text-lg max-w-2xl mx-auto">
            Serving the agricultural community of Minchinabad with genuine products and expert guidance since 2018.
          </p>
        </motion.div>
      </div>
    </section>
  )
})

AboutHero.displayName = 'AboutHero'

export default AboutHero
