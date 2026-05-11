import { motion } from 'framer-motion'
import { FaCheck, FaAward, FaUsers, FaTruck, FaShieldAlt, FaLeaf } from 'react-icons/fa'
import SEO from '../../components/common/SEO'
import SectionTitle from '../../components/common/SectionTitle'
import { WHY_CHOOSE_US } from '../../utils/constants'

/**
 * About Page
 * Company story, mission, values, and team
 */
const About = () => {
  const milestones = [
    { year: '2018', title: 'Founded', description: 'Started as a small shop on Jaranwala Road with a vision to serve farmers.' },
    { year: '2020', title: 'Expansion', description: 'Expanded product range to include international brands like Syngenta and Bayer.' },
    { year: '2021', title: 'Premium Partner', description: 'Became authorized premium partner for 8+ major agricultural brands.' },
      { year: '2025', title: 'Online Presence', description: 'Launched website and WhatsApp ordering for customer convenience.' },
  ]

  const values = [
    { icon: FaShieldAlt, title: 'Integrity', description: 'We deal only in 100% genuine products with complete transparency.' },
    { icon: FaUsers, title: 'Customer First', description: 'Farmer satisfaction is our top priority in every interaction.' },
    { icon: FaLeaf, title: 'Sustainability', description: 'Promoting responsible farming practices for future generations.' },
    { icon: FaAward, title: 'Excellence', description: 'Continuous improvement in product quality and service delivery.' },
  ]

  return (
    <>
      <SEO 
        title="About Us" 
        description="Learn about Bismillah Spray Center - your trusted agricultural partner in Minchinabad since 2010."
      />

      {/* Hero */}
      <section className="relative py-24 bg-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />

        <div className="container-premium relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">Our Story</span>
              <div className="h-px w-12 bg-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              About <span className="text-gold">Bismillah</span> Spray Center
            </h1>
            <p className="text-primary-400 text-lg max-w-2xl mx-auto">
              Serving the agricultural community of Minchinabad with genuine products and expert guidance since 2010.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
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
                    <FaCheck className="text-gold w-5 h-5" />
                    Mission
                  </h3>
                  <p className="text-primary-300 leading-relaxed">
                    To empower Pakistani farmers with access to premium quality agricultural inputs, expert guidance, and reliable services that maximize crop yields and improve livelihoods.
                  </p>
                </div>

                <div>
                  <h3 className="text-primary font-semibold text-lg mb-2 flex items-center gap-2">
                    <FaCheck className="text-gold w-5 h-5" />
                    Vision
                  </h3>
                  <p className="text-primary-300 leading-relaxed">
                    To become the most trusted agricultural solutions provider in Pakistan, recognized for product authenticity, expert knowledge, and unwavering commitment to farmer success.
                  </p>
                </div>

                <div>
                  <h3 className="text-primary font-semibold text-lg mb-2 flex items-center gap-2">
                    <FaCheck className="text-gold w-5 h-5" />
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

      {/* Values */}
      <section className="section-padding bg-primary text-white">
        <div className="container-premium">
          <SectionTitle
            title="Our Core Values"
            subtitle="What Drives Us"
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          <SectionTitle
            title="Our Journey"
            subtitle="Timeline"
          />

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">{milestone.year}</span>
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-grow bg-gold/30 mt-2" />
                  )}
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-card flex-grow">
                  <h3 className="text-primary font-display font-bold text-lg mb-2">{milestone.title}</h3>
                  <p className="text-primary-300 text-sm">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gold">
        <div className="container-premium">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '8+', label: 'Years of Service' },
              { number: '1500+', label: 'Happy Farmers' },
              { number: '50+', label: 'Products' },
              { number: '8+', label: 'Brand Partners' },
            ].map((stat, index) => (
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
    </>
  )
}

export default About
