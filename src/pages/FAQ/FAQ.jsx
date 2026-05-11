import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaQuestionCircle } from 'react-icons/fa'
import SEO from '../../components/common/SEO'
import SectionTitle from '../../components/common/SectionTitle'
import FAQItem from '../../components/ui/FAQItem'
import { useFetch } from '../../hooks/useFetch'
import { SkeletonText } from '../../components/loaders/SkeletonLoader'

/**
 * FAQ Page
 * Frequently asked questions with search and category filtering
 */
const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const { data: faqData, loading } = useFetch('/faqs')
  const { data: categoryData } = useFetch('/faqs/categories/all')

  const categories = ['All', ...(categoryData?.data || ['General', 'Products', 'Orders', 'Usage', 'Shipping'])]

  const faqs = faqData?.data || []

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory
    const matchesSearch = !searchQuery || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <SEO 
        title="FAQ" 
        description="Find answers to frequently asked questions about our products, services, orders, and shipping."
      />

      {/* Hero */}
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

            {/* Search */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-gold text-primary'
                    : 'bg-white text-primary-300 hover:bg-primary-700 shadow-card'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="max-w-3xl mx-auto space-y-4">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-card">
                  <SkeletonText lines={2} />
                </div>
              ))
            ) : filteredFAQs.length === 0 ? (
              <div className="text-center py-16">
                <FaQuestionCircle className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                <p className="text-primary-300 text-lg">No questions found matching your search.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All') }}
                  className="btn-primary mt-4"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredFAQs.map((faq, index) => (
                <FAQItem key={faq._id || index} faq={faq} index={index} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQ
