import { memo } from 'react'
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'
import SectionTitle from '../../../components/common/SectionTitle'

const FAQHero = memo(({ searchQuery, setSearchQuery }) => {
  return (
    <section className="relative py-24 bg-primary">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&q=80')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />

      <div className="container-premium relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Need Help?"
            light
          />

          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-400 w-5 h-5" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                aria-label="Search FAQs"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
})

FAQHero.displayName = 'FAQHero'

export default FAQHero
