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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.article
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-primary-50/50 rounded-2xl p-8 border border-primary-50/30 hover:border-gold/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-6">
                <value.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-white font-display font-bold text-xl mb-3">{value.title}</h3>
              <p className="text-primary-400 text-sm leading-relaxed">{value.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
})

CoreValues.displayName = 'CoreValues'

export default CoreValues
