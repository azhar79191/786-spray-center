import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaGlobe } from 'react-icons/fa'
import SEO from '../../components/common/SEO'
import SectionTitle from '../../components/common/SectionTitle'
import { getAllBrands } from '../../services/brandService'
import Spinner from '../../components/loaders/Spinner'

/**
 * Brands Page
 * Displays all brand partners
 */
const Brands = () => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      setLoading(true)
      const response = await getAllBrands({ isActive: true })
      setBrands(response.data || [])
    } catch (error) {
      console.error('Failed to fetch brands:', error)
      setBrands([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO 
        title="Our Brands" 
        description="We are authorized dealers of Syngenta, Bayer, FMC, Engro, Fauji, Pioneer, Honda, and Stihl agricultural products."
      />

      {/* Hero */}
      <section className="relative py-24 bg-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />

        <div className="container-premium relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="Our Brand Partners"
              subtitle="Trusted Worldwide"
              light
            />
            <p className="text-primary-400 text-lg max-w-2xl mx-auto mt-4">
              We partner with the world's leading agricultural brands to bring you genuine, high-quality products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : brands.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-primary-300 text-lg">No brands available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {brands.map((brand, index) => (
                <motion.div
                  key={brand._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center justify-center group"
                >
                  <div className="text-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-w-full h-20 object-contain mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <h3 className="font-semibold text-primary text-sm">{brand.name}</h3>
                    {brand.country && (
                      <p className="text-xs text-primary-300 mt-1">{brand.country}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brand Details */}
      <section className="section-padding bg-primary text-white">
        <div className="container-premium">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Why <span className="text-gold">Partner Brands</span> Matter
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Quality Assurance', desc: 'All products undergo strict quality control and come with manufacturer warranties.' },
              { title: 'Latest Technology', desc: 'Access to cutting-edge agricultural technologies and formulations.' },
              { title: 'Genuine Products', desc: 'Direct sourcing from authorized distributors eliminates counterfeit risks.' },
              { title: 'Technical Support', desc: 'Backed by manufacturer technical support and product training.' },
              { title: 'Competitive Pricing', desc: 'Authorized dealer status ensures best market prices and bulk discounts.' },
              { title: 'Full Range', desc: 'Complete product portfolios from each brand under one roof.' },
            ].map((item, index) => (
              <motion.div
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gold">
        <div className="container-premium text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
            Browse Products by Brand
          </h2>
          <p className="text-primary/70 text-lg max-w-2xl mx-auto mb-8">
            Explore our complete range of products from all partner brands.
          </p>
          <Link to="/products" className="btn-dark text-lg">
            View All Products
            <FaArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}

export default Brands
