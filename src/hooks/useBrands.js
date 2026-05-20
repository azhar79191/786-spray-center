import { useState, useCallback, useMemo } from 'react'
import { useData } from '../contexts/DataContext'

/**
 * Custom hook for brand operations
 * Uses preloaded data from DataContext for instant loading
 */
export const useBrands = (initialFilters = {}) => {
  const dataContext = useData()
  const [filters, setFilters] = useState(initialFilters)

  // Use preloaded brand data
  const allBrands = dataContext.brandList

  // Apply filters
  const brands = useMemo(() => {
    let filtered = [...allBrands]

    if (filters.featured !== undefined) {
      filtered = filtered.filter(brand => brand.featured === filters.featured)
    }

    if (filters.search) {
      const query = filters.search.toLowerCase()
      filtered = filtered.filter(brand =>
        brand.name?.toLowerCase().includes(query) ||
        brand.description?.toLowerCase().includes(query)
      )
    }

    if (filters.limit) {
      filtered = filtered.slice(0, filters.limit)
    }

    return filtered
  }, [allBrands, filters])

  // Get featured brands
  const featuredBrands = useMemo(() => {
    return allBrands.filter(brand => brand.featured)
  }, [allBrands])

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  // Search brands
  const searchBrands = useCallback((query) => {
    updateFilters({ search: query })
  }, [updateFilters])

  // Get brand by ID
  const getBrandById = useCallback((id) => {
    return allBrands.find(brand => brand._id === id)
  }, [allBrands])

  // Refresh brand data
  const refreshBrands = useCallback(() => {
    dataContext.refreshData('brandList')
  }, [dataContext])

  return {
    brands,
    featuredBrands,
    loading: dataContext.loading,
    error: dataContext.error,
    filters,
    updateFilters,
    resetFilters,
    searchBrands,
    getBrandById,
    refreshBrands,
  }
}

export default useBrands
