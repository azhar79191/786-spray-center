import { memo } from 'react'
import { motion } from 'framer-motion'
import { GiCheckMark, GiTeacher, GiPriceTag, GiTruck } from 'react-icons/gi'
import SectionTitle from '../../../components/common/SectionTitle'
import { WHY_CHOOSE_US } from '../../../utils/constants'

const iconMap = {
  GiCheckMark,
  GiTeacher,
  GiPriceTag,
  GiTruck,
}

/**
 * Why Choose Us Section
 * Highlights company advantages
 */
const WhyChooseUs = memo(() => {
  return (
    <section className="section-padding bg-surface">
      <div className="container-premium">
        <SectionTitle
          title="Why Choose Us"
          subtitle="Our Advantages"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, index) => {
            const IconComponent = iconMap[item.icon] || GiCheckMark
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-gold transition-colors duration-300">
                  <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-gold group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-primary font-display font-bold text-lg md:text-xl mb-2 md:mb-3 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-primary-300 text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
})

WhyChooseUs.displayName = 'WhyChooseUs'

export default WhyChooseUs
