import { useState, useCallback, useMemo } from 'react'
import { useData } from '../contexts/DataContext'

/**
 * Custom hook for testimonial operations
 * Uses preloaded data from DataContext for instant loading
 */
export const useTestimonials = (initialFilters = {}) => {
  const dataContext = useData()
  const [filters, setFilters] = useState(initialFilters)

  // Use preloaded testimonial data
  const allTestimonials = dataContext.testimonials

  // Apply filters
  const testimonials = useMemo(() => {
    let filtered = [...allTestimonials]

    if (filters.rating) {
      filtered = filtered.filter(t => t.rating >= filters.rating)
    }

    if (filters.limit) {
      filtered = filtered.slice(0, filters.limit)
    }

    return filtered
  }, [allTestimonials, filters])

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  // Refresh testimonial data
  const refreshTestimonials = useCallback(() => {
    dataContext.refreshData('testimonials')
  }, [dataContext])

  return {
    testimonials,
    loading: dataContext.loading,
    error: dataContext.error,
    filters,
    updateFilters,
    resetFilters,
    refreshTestimonials,
  }
}

export default useTestimonials
