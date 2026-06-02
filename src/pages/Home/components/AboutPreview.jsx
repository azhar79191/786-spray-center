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
    <section className="section-padding bg-primary text-white">
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
              alt="About Bismillah Spray Center"
              className="rounded-3xl shadow-premium w-full h-[400px] object-cover"
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
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">About Us</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Trusted by Farmers Across <span className="text-gold">Punjab</span>
            </h2>

            <p className="text-primary-400 leading-relaxed mb-6">
              Bismillah Spray Center has been serving the agricultural community of Minchinabad and surrounding areas since 2018. We provide genuine, high-quality agricultural inputs including pesticides, fertilizers, seeds, and spraying equipment from world-renowned brands.
            </p>

            <p className="text-primary-400 leading-relaxed mb-8">
              Our team of experienced agronomists offers free crop consultation, pest identification, and customized treatment recommendations to help farmers maximize their yields and profits.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/about" className="btn-primary">
                Learn More
                <FaArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
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
