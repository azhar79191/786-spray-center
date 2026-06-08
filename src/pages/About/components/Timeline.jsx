import { memo } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../../../components/common/SectionTitle'

const Timeline = memo(() => {
  const milestones = [
    { year: '2018', title: 'Founded', description: 'Started as a small shop on Jaranwala Road with a vision to serve farmers.' },
    { year: '2020', title: 'Expansion', description: 'Expanded product range to include international brands like Syngenta and Bayer.' },
    { year: '2021', title: 'Premium Partner', description: 'Became authorized premium partner for 8+ major agricultural brands.' },
    { year: '2025', title: 'Online Presence', description: 'Launched website and WhatsApp ordering for customer convenience.' },
  ]

  return (
    <section className="section-padding bg-surface">
      <div className="container-premium">
        <SectionTitle
          title="Our Journey"
          subtitle="Timeline"
        />

        <div className="max-w-3xl mx-auto">
          {milestones.map((milestone, index) => (
            <motion.article
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-3 sm:gap-6 mb-6 sm:mb-8 last:mb-0"
            >
              {/* Timeline Circle and Line */}
              <div className="flex flex-col items-center flex-shrink-0">
                {/* Circle with Year */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold rounded-full flex items-center justify-center shadow-lg">
                  <time className="text-primary font-bold text-xs sm:text-sm">{milestone.year}</time>
                </div>
                {/* Connecting Line */}
                {index < milestones.length - 1 && (
                  <div className="w-0.5 flex-grow bg-gold/30 mt-2" />
                )}
              </div>
              
              {/* Content Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card flex-grow">
                <h3 className="text-primary font-display font-bold text-base sm:text-lg mb-1.5 sm:mb-2">
                  {milestone.title}
                </h3>
                <p className="text-primary-300 text-xs sm:text-sm leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
})

Timeline.displayName = 'Timeline'

export default Timeline
