import { memo } from 'react'
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'
import SectionTitle from '../../../components/common/SectionTitle'

/**
 * Products Header Component
 * Hero section with search bar
 */
const ProductsHeader = memo(({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <section className="relative py-20 bg-primary">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />

      <div className="container-premium relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <SectionTitle
            title="Our Products"
            subtitle="Premium Quality"
            light
          />

          {/* Search bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="w-full px-6 py-4 pl-14 pr-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                aria-label="Search products"
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-400 w-5 h-5" aria-hidden="true" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gold text-primary font-semibold rounded-lg hover:bg-gold-600 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
})

ProductsHeader.displayName = 'ProductsHeader'

export default ProductsHeader
