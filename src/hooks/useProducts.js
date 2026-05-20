import { useState, useCallback, useEffect, useMemo } from 'react'
import { useData } from '../contexts/DataContext'
import apiClient from '../api/axios.js'

/**
 * Custom hook for product operations
 * Uses preloaded data from DataContext for instant loading
 * Falls back to API calls for specific queries
 */
export const useProducts = (initialFilters = {}) => {
  const dataContext = useData()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState(initialFilters)

  // Use preloaded data from context
  const featuredProducts = dataContext.featuredProducts
  const categories = dataContext.categories
  const brands = dataContext.brands

  // Calculate pagination from filtered products
  const pagination = useMemo(() => {
    const itemsPerPage = filters.limit || 12
    const currentPage = filters.page || 1
    const totalItems = products.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    return {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
    }
  }, [products.length, filters.limit, filters.page])

  // Fetch products with filters - uses preloaded data when possible
  const fetchProducts = useCallback(async (customFilters = {}) => {
    const mergedFilters = { ...filters, ...customFilters }
    setLoading(true)
    setError(null)

    try {
      // Use preloaded data if no specific filters
      if (!mergedFilters.search && !mergedFilters.category && !mergedFilters.brand) {
        const allProducts = dataContext.products
        const page = mergedFilters.page || 1
        const limit = mergedFilters.limit || 12
        const start = (page - 1) * limit
        const end = start + limit
        
        setProducts(allProducts.slice(start, end))
        setLoading(false)
        return { success: true, data: allProducts.slice(start, end) }
      }

      // Apply filters to preloaded data
      const filtered = dataContext.filterProducts(mergedFilters)
      const page = mergedFilters.page || 1
      const limit = mergedFilters.limit || 12
      const start = (page - 1) * limit
      const end = start + limit
      
      setProducts(filtered.slice(start, end))
      return { success: true, data: filtered.slice(start, end) }
    } catch (err) {
      setError(err.message || 'Failed to fetch products')
      return null
    } finally {
      setLoading(false)
    }
  }, [filters, dataContext])

  // Fetch featured products - uses preloaded data
  const fetchFeatured = useCallback(async (limit = 6) => {
    return { success: true, data: featuredProducts.slice(0, limit) }
  }, [featuredProducts])

  // Fetch categories - uses preloaded data
  const fetchCategories = useCallback(async () => {
    return { success: true, data: categories }
  }, [categories])

  // Fetch brands - uses preloaded data
  const fetchBrands = useCallback(async () => {
    return { success: true, data: brands }
  }, [brands])

  // Search products - uses preloaded data
  const searchProducts = useCallback(async (searchQuery) => {
    setLoading(true)
    setError(null)

    try {
      const results = dataContext.searchProducts(searchQuery)
      const limit = filters.limit || 12
      setProducts(results.slice(0, limit))
      return { success: true, data: results }
    } catch (err) {
      setError(err.message || 'Search failed')
      return null
    } finally {
      setLoading(false)
    }
  }, [dataContext, filters.limit])

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  // Fetch single product - uses preloaded data first
  const fetchProductById = useCallback(async (id) => {
    setLoading(true)
    setError(null)

    try {
      // Try to get from preloaded data first
      const cachedProduct = dataContext.getProductById(id)
      if (cachedProduct) {
        setLoading(false)
        return cachedProduct
      }

      // Fallback to API if not in cache
      const response = await apiClient.get(`/products/${id}`)
      if (response.data.success) {
        return response.data.data
      }
      return null
    } catch (err) {
      setError(err.message || 'Failed to fetch product')
      return null
    } finally {
      setLoading(false)
    }
  }, [dataContext])

  // Fetch related products - uses preloaded data
  const fetchRelatedProducts = useCallback(async (id, limit = 4) => {
    try {
      const related = dataContext.getRelatedProducts(id, limit)
      return related
    } catch (err) {
      console.error('Failed to fetch related products:', err)
      return []
    }
  }, [dataContext])

  // No initial fetch needed - data is preloaded in context

  return {
    products,
    featuredProducts,
    categories,
    brands,
    loading,
    error,
    pagination,
    filters,
    fetchProducts,
    fetchFeatured,
    fetchCategories,
    fetchBrands,
    searchProducts,
    updateFilters,
    resetFilters,
    fetchProductById,
    fetchRelatedProducts,
  }
}

export default useProducts
