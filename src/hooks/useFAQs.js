import { useState, useCallback, useMemo } from 'react'
import { useData } from '../contexts/DataContext'

/**
 * Custom hook for FAQ operations
 * Uses preloaded data from DataContext for instant loading
 */
export const useFAQs = (initialFilters = {}) => {
  const dataContext = useData()
  const [filters, setFilters] = useState(initialFilters)

  // Use preloaded FAQ data
  const allFaqs = dataContext.faqs
  const categories = dataContext.faqCategories

  // Apply filters
  const faqs = useMemo(() => {
    let filtered = [...allFaqs]

    // Always filter out inactive FAQs
    filtered = filtered.filter(faq => faq.isActive !== false)

    if (filters.category) {
      filtered = filtered.filter(faq => faq.category === filters.category)
    }

    if (filters.search) {
      const query = filters.search.toLowerCase()
      filtered = filtered.filter(faq =>
        faq.question?.toLowerCase().includes(query) ||
        faq.answer?.toLowerCase().includes(query)
      )
    }

    if (filters.limit) {
      filtered = filtered.slice(0, filters.limit)
    }

    return filtered
  }, [allFaqs, filters])

  // Group FAQs by category
  const faqsByCategory = useMemo(() => {
    const grouped = {}
    faqs.forEach(faq => {
      const category = faq.category || 'General'
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(faq)
    })
    return grouped
  }, [faqs])

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  // Search FAQs
  const searchFAQs = useCallback((query) => {
    updateFilters({ search: query })
  }, [updateFilters])

  // Refresh FAQ data
  const refreshFAQs = useCallback(() => {
    dataContext.refreshData('faqs')
    dataContext.refreshData('faqCategories')
  }, [dataContext])

  return {
    faqs,
    faqsByCategory,
    categories,
    loading: dataContext.loading,
    error: dataContext.error,
    filters,
    updateFilters,
    resetFilters,
    searchFAQs,
    refreshFAQs,
  }
}

export default useFAQs
