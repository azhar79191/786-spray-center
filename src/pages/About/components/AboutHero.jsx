import { memo } from 'react'
import { motion } from 'framer-motion'

const AboutHero = memo(() => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-primary">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/80" />

      <div className="container-premium relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px w-8 sm:w-12 bg-gold" />
            <span className="text-gold text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Our Story
            </span>
            <div className="h-px w-8 sm:w-12 bg-gold" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight">
            About <span className="text-gold">Bismillah</span> Spray Center
          </h1>
          <p className="text-primary-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Serving the agricultural community of Minchinabad with genuine products and expert guidance since 2018.
          </p>
        </motion.div>
      </div>
    </section>
  )
})

AboutHero.displayName = 'AboutHero'

export default AboutHero
