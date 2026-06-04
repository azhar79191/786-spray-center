import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import apiClient from '../api/axios'

const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    products: [],
    featuredProducts: [],
    categories: [],
    brands: [],
    brandList: [],
    gallery: [],
    faqs: [],
    faqCategories: [],
    testimonials: [],
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isPreloaded, setIsPreloaded] = useState(false)

  const preloadData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Step 1: Critical data first — page becomes interactive fast
      const [featuredRes, categoriesRes, brandsRes] = await Promise.allSettled([
        apiClient.get('/products/featured/list', { params: { limit: 6 } }),
        apiClient.get('/products/categories/all'),
        apiClient.get('/products/brands/all'),
      ])

      const criticalData = {
        featuredProducts: featuredRes.status === 'fulfilled' ? featuredRes.value.data.data || [] : [],
        categories: categoriesRes.status === 'fulfilled' ? categoriesRes.value.data.data || [] : [],
        brands: brandsRes.status === 'fulfilled' ? brandsRes.value.data.data || [] : [],
      }

      setData(prev => ({ ...prev, ...criticalData }))
      setIsPreloaded(true)
      setLoading(false)

      // Step 2: Secondary data in background (non-blocking)
      Promise.allSettled([
        apiClient.get('/products', { params: { limit: 100 } }),
        apiClient.get('/brands', { params: { limit: 50, isActive: true } }),
        apiClient.get('/gallery', { params: { limit: 50, isActive: true } }),
        apiClient.get('/faqs', { params: { limit: 100 } }),
        apiClient.get('/faqs/categories/all'),
        apiClient.get('/testimonials/approved', { params: { limit: 20 } }),
      ]).then(([productsRes, brandListRes, galleryRes, faqsRes, faqCategoriesRes, testimonialsRes]) => {
        setData(prev => ({
          ...prev,
          products: productsRes.status === 'fulfilled' ? productsRes.value.data.data || [] : [],
          brandList: brandListRes.status === 'fulfilled' ? brandListRes.value.data.data || [] : [],
          gallery: galleryRes.status === 'fulfilled' ? galleryRes.value.data.data || [] : [],
          faqs: faqsRes.status === 'fulfilled' ? faqsRes.value.data.data || [] : [],
          faqCategories: faqCategoriesRes.status === 'fulfilled' ? faqCategoriesRes.value.data.data || [] : [],
          testimonials: testimonialsRes.status === 'fulfilled' ? testimonialsRes.value.data.data || [] : [],
        }))
      })

    } catch (err) {
      console.error('Failed to preload data:', err)
      setError(err.message)
      setLoading(false)
    }
  }, [])

  const refreshData = useCallback(async (dataType) => {
    const skip = { _skipCache: true }
    try {
      let response
      switch (dataType) {
        case 'products':
          response = await apiClient.get('/products', { params: { limit: 100 }, ...skip })
          setData(prev => ({ ...prev, products: response.data.data || [] }))
          break
        case 'featuredProducts':
          response = await apiClient.get('/products/featured/list', { params: { limit: 6 }, ...skip })
          setData(prev => ({ ...prev, featuredProducts: response.data.data || [] }))
          break
        case 'categories':
          response = await apiClient.get('/products/categories/all', skip)
          setData(prev => ({ ...prev, categories: response.data.data || [] }))
          break
        case 'brands':
          response = await apiClient.get('/products/brands/all', skip)
          setData(prev => ({ ...prev, brands: response.data.data || [] }))
          break
        case 'brandList':
          response = await apiClient.get('/brands', { params: { limit: 50, isActive: true }, ...skip })
          setData(prev => ({ ...prev, brandList: response.data.data || [] }))
          break
        case 'gallery':
          response = await apiClient.get('/gallery', { params: { limit: 50, isActive: true }, ...skip })
          setData(prev => ({ ...prev, gallery: response.data.data || [] }))
          break
        case 'faqs':
          response = await apiClient.get('/faqs', { params: { limit: 100 }, ...skip })
          setData(prev => ({ ...prev, faqs: response.data.data || [] }))
          break
        case 'faqCategories':
          response = await apiClient.get('/faqs/categories/all', skip)
          setData(prev => ({ ...prev, faqCategories: response.data.data || [] }))
          break
        case 'testimonials':
          response = await apiClient.get('/testimonials/approved', { params: { limit: 20 }, ...skip })
          setData(prev => ({ ...prev, testimonials: response.data.data || [] }))
          break
        default:
          console.warn(`Unknown data type: ${dataType}`)
      }
    } catch (err) {
      console.error(`Failed to refresh ${dataType}:`, err)
    }
  }, [])

  // clearCache is a no-op now (no localStorage), kept for API compatibility
  const clearCache = useCallback(() => {}, [])

  const getProductById = useCallback((id) => {
    return data.products.find(p => p._id === id || p.slug === id)
  }, [data.products])

  const getRelatedProducts = useCallback((productId, limit = 4) => {
    const product = getProductById(productId)
    if (!product) return []
    return data.products
      .filter(p => p._id !== productId && p.category === product.category)
      .slice(0, limit)
  }, [data.products, getProductById])

  const searchProducts = useCallback((query) => {
    const lowerQuery = query.toLowerCase()
    return data.products.filter(p =>
      p.name?.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery) ||
      p.category?.toLowerCase().includes(lowerQuery) ||
      p.brand?.name?.toLowerCase().includes(lowerQuery)
    )
  }, [data.products])

  /**
   * Filter products
   */
  const filterProducts = useCallback((filters) => {
    let filtered = [...data.products]

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    if (filters.brand) {
      // product.brand is stored as a plain string
      filtered = filtered.filter(p => {
        const brandName = typeof p.brand === 'object' ? p.brand?.name : p.brand
        return brandName === filters.brand
      })
    }

    if (filters.search) {
      const lowerQuery = filters.search.toLowerCase()
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(lowerQuery) ||
        p.description?.toLowerCase().includes(lowerQuery)
      )
    }

    return filtered
  }, [data.products])

  useEffect(() => {
    preloadData()
  }, [preloadData])

  const value = {
    ...data,
    loading,
    error,
    isPreloaded,
    preloadData,
    refreshData,
    clearCache,
    getProductById,
    getRelatedProducts,
    searchProducts,
    filterProducts,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}

export default DataContext
