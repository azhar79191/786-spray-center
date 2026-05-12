import { memo } from 'react'
import { motion } from 'framer-motion'

const Stats = memo(() => {
  const stats = [
    { number: '8+', label: 'Years of Service' },
    { number: '1500+', label: 'Happy Farmers' },
    { number: '50+', label: 'Products' },
    { number: '8+', label: 'Brand Partners' },
  ]

  return (
    <section className="py-20 bg-gold">
      <div className="container-premium">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-primary text-4xl md:text-5xl font-display font-bold mb-2">{stat.number}</p>
              <p className="text-primary/70 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

Stats.displayName = 'Stats'

export default Stats
