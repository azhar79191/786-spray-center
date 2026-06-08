import { memo } from 'react'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaUsers, FaLeaf, FaAward } from 'react-icons/fa'
import SectionTitle from '../../../components/common/SectionTitle'

const CoreValues = memo(() => {
  const values = [
    { icon: FaShieldAlt, title: 'Integrity', description: 'We deal only in 100% genuine products with complete transparency.' },
    { icon: FaUsers, title: 'Customer First', description: 'Farmer satisfaction is our top priority in every interaction.' },
    { icon: FaLeaf, title: 'Sustainability', description: 'Promoting responsible farming practices for future generations.' },
    { icon: FaAward, title: 'Excellence', description: 'Continuous improvement in product quality and service delivery.' },
  ]

  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-premium">
        <SectionTitle
          title="Our Core Values"
          subtitle="What Drives Us"
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((value, index) => (
            <motion.article
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-primary-50/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-primary-50/30 hover:border-gold/30 transition-all duration-300"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <value.icon className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
              </div>
              <h3 className="text-white font-display font-bold text-lg sm:text-xl mb-2 sm:mb-3">
                {value.title}
              </h3>
              <p className="text-primary-400 text-xs sm:text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
})

CoreValues.displayName = 'CoreValues'

export default CoreValues
