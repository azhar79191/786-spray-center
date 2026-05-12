import { useState } from 'react'
import SEO from '../../components/common/SEO'
import { useFetch } from '../../hooks/useFetch'
import FAQHero from './components/FAQHero'
import FAQCategories from './components/FAQCategories'
import FAQList from './components/FAQList'

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

  const clearFilters = () => {
    setSearchQuery('')
    setActiveCategory('All')
  }

  return (
    <>
      <SEO 
        title="FAQ" 
        description="Find answers to frequently asked questions about our products, services, orders, and shipping."
      />

      <FAQHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <section className="section-padding bg-surface">
        <div className="container-premium">
          <FAQCategories 
            categories={categories}
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
