import { useState, useMemo } from 'react'
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

  // Create FAQ Schema for SEO
  const faqSchema = useMemo(() => {
    if (!faqs || faqs.length === 0) return null
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.slice(0, 10).map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  }, [faqs])

  const clearFilters = () => {
    setSearchQuery('')
    setActiveCategory('All')
  }

  return (
    <>
      <SEO 
        title="Frequently Asked Questions | Agricultural Products Pakistan" 
        description="Find answers to common questions about agricultural products, pesticides, fertilizers, seeds, ordering, delivery, product usage, safety guidelines at Bismillah Spray Center Minchinabad. Expert farming advice."
        keywords="agricultural FAQ Pakistan, pesticide usage questions, fertilizer application guide, seed selection help, farming questions answered, crop protection FAQ, agricultural advice Bahawalnagar, farming tips Punjab"
      />
      
      {/* Add FAQ Schema */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

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
