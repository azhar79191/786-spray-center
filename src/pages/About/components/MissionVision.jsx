import { memo } from 'react'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

const MissionVision = memo(() => {
  return (
    <section className="section-padding bg-surface">
      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&q=80"
              alt="Our mission"
              className="rounded-2xl lg:rounded-3xl shadow-premium w-full h-[300px] sm:h-[400px] lg:h-[450px] object-cover"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-4 sm:mb-6">
              Our <span className="text-gold">Mission</span> & Vision
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-primary font-semibold text-base sm:text-lg mb-2 flex items-center gap-2">
                  <FaCheck className="text-gold w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" aria-hidden="true" />
                  Mission
                </h3>
                <p className="text-primary-300 text-sm sm:text-base leading-relaxed">
                  To empower Pakistani farmers with access to premium quality agricultural inputs, expert guidance, and reliable services that maximize crop yields and improve livelihoods.
                </p>
              </div>

              <div>
                <h3 className="text-primary font-semibold text-base sm:text-lg mb-2 flex items-center gap-2">
                  <FaCheck className="text-gold w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" aria-hidden="true" />
                  Vision
                </h3>
                <p className="text-primary-300 text-sm sm:text-base leading-relaxed">
                  To become the most trusted agricultural solutions provider in Pakistan, recognized for product authenticity, expert knowledge, and unwavering commitment to farmer success.
                </p>
              </div>

              <div>
                <h3 className="text-primary font-semibold text-base sm:text-lg mb-2 flex items-center gap-2">
                  <FaCheck className="text-gold w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" aria-hidden="true" />
                  Core Values
                </h3>
                <p className="text-primary-300 text-sm sm:text-base leading-relaxed">
                  Integrity, Customer Focus, Excellence, Sustainability, and Community Development guide every decision we make.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

MissionVision.displayName = 'MissionVision'

export default MissionVision
