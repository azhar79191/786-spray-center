import { useState, useCallback, useMemo } from 'react'
import { useData } from '../contexts/DataContext'

/**
 * Custom hook for gallery operations
 * Uses preloaded data from DataContext for instant loading
 */
export const useGallery = (initialFilters = {}) => {
  const dataContext = useData()
  const [filters, setFilters] = useState(initialFilters)

  // Use preloaded gallery data
  const allGalleryImages = dataContext.gallery

  // Apply filters
  const galleryImages = useMemo(() => {
    let filtered = [...allGalleryImages]

    // Always filter out inactive gallery images
    filtered = filtered.filter(img => img.isActive !== false)

    if (filters.category) {
      filtered = filtered.filter(img => img.category === filters.category)
    }

    if (filters.limit) {
      filtered = filtered.slice(0, filters.limit)
    }

    return filtered
  }, [allGalleryImages, filters])

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  // Refresh gallery data
  const refreshGallery = useCallback(() => {
    dataContext.refreshData('gallery')
  }, [dataContext])

  return {
    galleryImages,
    loading: dataContext.loading,
    error: dataContext.error,
    filters,
    updateFilters,
    resetFilters,
    refreshGallery,
  }
}

export default useGallery
