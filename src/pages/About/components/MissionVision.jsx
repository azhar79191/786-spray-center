import { memo } from 'react'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

const MissionVision = memo(() => {
  return (
    <section className="section-padding bg-surface">
      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&q=80"
              alt="Our mission"
              className="rounded-3xl shadow-premium w-full h-[450px] object-cover"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
              Our <span className="text-gold">Mission</span> & Vision
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-primary font-semibold text-lg mb-2 flex items-center gap-2">
                  <FaCheck className="text-gold w-5 h-5" aria-hidden="true" />
                  Mission
                </h3>
                <p className="text-primary-300 leading-relaxed">
                  To empower Pakistani farmers with access to premium quality agricultural inputs, expert guidance, and reliable services that maximize crop yields and improve livelihoods.
                </p>
              </div>

              <div>
                <h3 className="text-primary font-semibold text-lg mb-2 flex items-center gap-2">
                  <FaCheck className="text-gold w-5 h-5" aria-hidden="true" />
                  Vision
                </h3>
                <p className="text-primary-300 leading-relaxed">
                  To become the most trusted agricultural solutions provider in Pakistan, recognized for product authenticity, expert knowledge, and unwavering commitment to farmer success.
                </p>
              </div>

              <div>
                <h3 className="text-primary font-semibold text-lg mb-2 flex items-center gap-2">
                  <FaCheck className="text-gold w-5 h-5" aria-hidden="true" />
                  Core Values
                </h3>
                <p className="text-primary-300 leading-relaxed">
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
