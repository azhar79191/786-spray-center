import { memo } from 'react'
import { motion } from 'framer-motion'
import { FaGlobe } from 'react-icons/fa'

const WhyBrandsMatter = memo(() => {
  const benefits = [
    { title: 'Quality Assurance', desc: 'All products undergo strict quality control and come with manufacturer warranties.' },
    { title: 'Latest Technology', desc: 'Access to cutting-edge agricultural technologies and formulations.' },
    { title: 'Genuine Products', desc: 'Direct sourcing from authorized distributors eliminates counterfeit risks.' },
    { title: 'Technical Support', desc: 'Backed by manufacturer technical support and product training.' },
    { title: 'Competitive Pricing', desc: 'Authorized dealer status ensures best market prices and bulk discounts.' },
    { title: 'Full Range', desc: 'Complete product portfolios from each brand under one roof.' },
  ]

  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-premium">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
          Why <span className="text-gold">Partner Brands</span> Matter
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-primary-50/30 rounded-2xl p-6 border border-primary-50/20"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                <FaGlobe className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-primary-400 text-sm">{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
})

WhyBrandsMatter.displayName = 'WhyBrandsMatter'

export default WhyBrandsMatter
