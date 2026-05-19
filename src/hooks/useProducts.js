import { useState, useCallback, useEffect } from 'react'
import apiClient from '../api/axios.js'

/**
 * Custom hook for product operations
 * Handles fetching, filtering, searching, and pagination
 */
export const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12,
  })
  const [filters, setFilters] = useState(initialFilters)

  // Fetch products with filters
  const fetchProducts = useCallback(async (customFilters = {}) => {
    const mergedFilters = { ...filters, ...customFilters }
    setLoading(true)
    setError(null)

    try {
      const response = await apiClient.get('/products', { params: mergedFilters })
      if (response.data.success) {
        setProducts(response.data.data)
        setPagination(response.data.pagination)
      }
      return response.data
    } catch (err) {
      setError(err.message || 'Failed to fetch products')
      return null
    } finally {
      setLoading(false)
    }
  }, [filters])

  // Fetch featured products
  const fetchFeatured = useCallback(async (limit = 6) => {
    try {
      const response = await apiClient.get('/products/featured/list', { params: { limit } })
      if (response.data.success) {
        setFeaturedProducts(response.data.data)
      }
      return response.data
    } catch (err) {
      console.error('Failed to fetch featured products:', err)
      return null
    }
  }, [])

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await apiClient.get('/products/categories/all')
      if (response.data.success) {
        setCategories(response.data.data)
      }
      return response.data
    } catch (err) {
      console.error('Failed to fetch categories:', err)
      return null
    }
  }, [])

  // Fetch brands
  const fetchBrands = useCallback(async () => {
    try {
      const response = await apiClient.get('/products/brands/all')
      if (response.data.success) {
        setBrands(response.data.data)
      }
      return response.data
    } catch (err) {
      console.error('Failed to fetch brands:', err)
      return null
    }
  }, [])

  // Search products
  const searchProducts = useCallback(async (searchQuery) => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiClient.get('/products', {
        params: { search: searchQuery, page: 1, limit: 12 },
      })
      if (response.data.success) {
        setProducts(response.data.data)
        setPagination(response.data.pagination)
      }
      return response.data
    } catch (err) {
      setError(err.message || 'Search failed')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  // Fetch single product
  const fetchProductById = useCallback(async (id) => {
    setLoading(true)
    setError(null)

    try {
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
  }, [])

  // Fetch related products
  const fetchRelatedProducts = useCallback(async (id, limit = 4) => {
    try {
      const response = await apiClient.get(`/products/${id}/related`, { params: { limit } })
      if (response.data.success) {
        return response.data.data
      }
      return []
    } catch (err) {
      console.error('Failed to fetch related products:', err)
      return []
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchCategories()
    fetchBrands()
    fetchFeatured()
  }, [fetchCategories, fetchBrands, fetchFeatured])

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
