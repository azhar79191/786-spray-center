import { useState, useCallback, useEffect, useMemo } from 'react'
import { useData } from '../contexts/DataContext'
import apiClient from '../api/axios.js'

export const useProducts = (initialFilters = {}) => {
  const dataContext = useData()
  const [products, setProducts] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState(initialFilters)

  const featuredProducts = dataContext.featuredProducts
  const categories = dataContext.categories
  const brands = dataContext.brandList.length > 0
    ? dataContext.brandList.filter(b => b.isActive).map(b => b.name)
    : dataContext.brands

  const pagination = useMemo(() => {
    const itemsPerPage = filters.limit || 12
    const currentPage = filters.page || 1
    const totalPages = Math.ceil(totalCount / itemsPerPage)
    return { currentPage, totalPages, totalItems: totalCount, itemsPerPage }
  }, [totalCount, filters.limit, filters.page])

  const fetchProducts = useCallback(async (customFilters = {}) => {
    const mergedFilters = { ...filters, ...customFilters }
    setLoading(true)
    setError(null)

    try {
      const page = mergedFilters.page || 1
      const limit = mergedFilters.limit || 12
      const start = (page - 1) * limit
      const end = start + limit

      let allFiltered = dataContext.products.filter(p => p.stockStatus !== 'Out of Stock')

      // Apply category filter
      if (mergedFilters.category) {
        allFiltered = allFiltered.filter(p => p.category === mergedFilters.category)
      }

      // Apply brand filter
      if (mergedFilters.brand) {
        allFiltered = allFiltered.filter(p => {
          const brandName = typeof p.brand === 'object' ? p.brand?.name : p.brand
          return brandName === mergedFilters.brand
        })
      }

      // Apply search filter
      if (mergedFilters.search) {
        const q = mergedFilters.search.toLowerCase()
        allFiltered = allFiltered.filter(p =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
        )
      }

      setTotalCount(allFiltered.length)
      setProducts(allFiltered.slice(start, end))
      return { success: true, data: allFiltered.slice(start, end) }
    } catch (err) {
      setError(err.message || 'Failed to fetch products')
      return null
    } finally {
      setLoading(false)
    }
  }, [filters, dataContext.products])

  const searchProducts = useCallback(async (searchQuery) => {
    setLoading(true)
    setError(null)
    try {
      const q = searchQuery.toLowerCase()
      const results = dataContext.products.filter(p =>
        p.stockStatus !== 'Out of Stock' && (
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          (typeof p.brand === 'object' ? p.brand?.name : p.brand)?.toLowerCase().includes(q)
        )
      )
      setTotalCount(results.length)
      setProducts(results.slice(0, filters.limit || 12))
      return { success: true, data: results }
    } catch (err) {
      setError(err.message || 'Search failed')
      return null
    } finally {
      setLoading(false)
    }
  }, [dataContext.products, filters.limit])

  const fetchFeatured = useCallback(async (limit = 6) => {
    return { success: true, data: featuredProducts.slice(0, limit) }
  }, [featuredProducts])

  const fetchCategories = useCallback(async () => {
    return { success: true, data: categories }
  }, [categories])

  const fetchBrands = useCallback(async () => {
    return { success: true, data: brands }
  }, [brands])

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  const fetchProductById = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const cached = dataContext.getProductById(id)
      if (cached) { setLoading(false); return cached }
      const response = await apiClient.get(`/products/${id}`)
      return response.data.success ? response.data.data : null
    } catch (err) {
      setError(err.message || 'Failed to fetch product')
      return null
    } finally {
      setLoading(false)
    }
  }, [dataContext])

  const fetchRelatedProducts = useCallback(async (id, limit = 4) => {
    try {
      return dataContext.getRelatedProducts(id, limit)
    } catch {
      return []
    }
  }, [dataContext])

  useEffect(() => {
    fetchProducts()
  }, [filters.category, filters.brand, filters.page, dataContext.products])

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
