import { useState } from 'react'
import SEO from '../../components/common/SEO'
import { useFAQs } from '../../hooks/useFAQs'
import FAQHero from './components/FAQHero'
import FAQCategories from './components/FAQCategories'
import FAQList from './components/FAQList'

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // Use preloaded data from DataContext - instant loading!
  const { faqs, categories, loading } = useFAQs()

  const allCategories = ['All', ...categories]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory
    const matchesSearch = !searchQuery || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const clearFilters = () => {
    setSearchQuery('')
    setActiveCategory('All')
  }

  return (
    <>
      <SEO 
        title="Frequently Asked Questions" 
        description="Find answers to common questions about agricultural products, pesticides, fertilizers, seeds, ordering, delivery, product usage, safety guidelines, and farming advice. Expert answers from experienced agronomists."
        keywords="agricultural FAQ Pakistan, pesticide usage questions, fertilizer application guide, seed selection help, farming questions answered, crop protection FAQ, agricultural advice Pakistan"
      />

      <FAQHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <section className="section-padding bg-surface">
        <div className="container-premium">
          <FAQCategories 
            categories={allCategories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <FAQList 
            loading={loading}
            filteredFAQs={filteredFAQs}
            clearFilters={clearFilters}
          />
        </div>
      </section>
    </>
  )
}

export default FAQ
