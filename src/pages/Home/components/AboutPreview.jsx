import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'

/**
 * About Preview Section
 * Brief introduction to the company
 */
const AboutPreview = memo(() => {
  return (
    <section className="section-padding bg-primary text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 left-1/4 w-56 h-56 bg-gold/5 rounded-full blur-3xl" />
      
      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Decorative border around image */}
            <div className="absolute -inset-2 bg-gradient-gold rounded-3xl opacity-20 blur-sm" />
            <img
              src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&q=80"
              alt="About Bismillah Spray Center"
              className="rounded-3xl shadow-premium w-full h-[300px] md:h-[350px] lg:h-[400px] object-cover relative z-10"
              loading="lazy"
              width="800"
              height="400"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 md:w-12 bg-gold" />
              <span className="text-gold text-xs md:text-sm font-semibold tracking-widest uppercase">About Us</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 md:mb-6">
              Trusted by Farmers Across <span className="text-gold">Punjab</span>
            </h2>

            <p className="text-primary-400 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
              Bismillah Spray Center has been serving the agricultural community of Minchinabad and surrounding areas since 2018. We provide genuine, high-quality agricultural inputs including pesticides, fertilizers, seeds, and spraying equipment from world-renowned brands.
            </p>

            <p className="text-primary-400 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
              Our team of experienced agronomists offers free crop consultation, pest identification, and customized treatment recommendations to help farmers maximize their yields and profits.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <Link to="/about" className="btn-primary text-xs md:text-sm">
                Learn More
                <FaArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4" />
              </Link>
              <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-primary text-xs md:text-sm">
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

AboutPreview.displayName = 'AboutPreview'

export default AboutPreview
