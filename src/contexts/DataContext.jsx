import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import apiClient from '../api/axios'
import { clearCache } from '../api/axios'

const DataContext = createContext(null)

// All fetch configs in one place — single source of truth
const FETCHERS = {
  featuredProducts: () => apiClient.get('/products/featured/list', { params: { limit: 6 }, _skipCache: true }),
  categories:       () => apiClient.get('/products/categories/all', { _skipCache: true }),
  brands:           () => apiClient.get('/products/brands/all', { _skipCache: true }),
  products:         () => apiClient.get('/products', { params: { limit: 100 }, _skipCache: true }),
  brandList:        () => apiClient.get('/brands', { params: { limit: 50, isActive: true }, _skipCache: true }),
  gallery:          () => apiClient.get('/gallery', { params: { limit: 50, isActive: true }, _skipCache: true }),
  faqs:             () => apiClient.get('/faqs', { params: { limit: 100 }, _skipCache: true }),
  faqCategories:    () => apiClient.get('/faqs/categories/all', { _skipCache: true }),
  testimonials:     () => apiClient.get('/testimonials/approved', { params: { limit: 20 }, _skipCache: true }),
}

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    products: [], featuredProducts: [], categories: [],
    brands: [], brandList: [], gallery: [],
    faqs: [], faqCategories: [], testimonials: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isPreloaded, setIsPreloaded] = useState(false)

  const preloadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Critical first — page becomes interactive fast
      const [featuredRes, categoriesRes, brandsRes] = await Promise.allSettled([
        apiClient.get('/products/featured/list', { params: { limit: 6 } }),
        apiClient.get('/products/categories/all'),
        apiClient.get('/products/brands/all'),
      ])
      setData(prev => ({
        ...prev,
        featuredProducts: featuredRes.status === 'fulfilled' ? featuredRes.value.data.data || [] : [],
        categories:       categoriesRes.status === 'fulfilled' ? categoriesRes.value.data.data || [] : [],
        brands:           brandsRes.status === 'fulfilled' ? brandsRes.value.data.data || [] : [],
      }))
      setIsPreloaded(true)
      setLoading(false)

      // Secondary — background, non-blocking
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
          products:      productsRes.status === 'fulfilled' ? productsRes.value.data.data || [] : [],
          brandList:     brandListRes.status === 'fulfilled' ? brandListRes.value.data.data || [] : [],
          gallery:       galleryRes.status === 'fulfilled' ? galleryRes.value.data.data || [] : [],
          faqs:          faqsRes.status === 'fulfilled' ? faqsRes.value.data.data || [] : [],
          faqCategories: faqCategoriesRes.status === 'fulfilled' ? faqCategoriesRes.value.data.data || [] : [],
          testimonials:  testimonialsRes.status === 'fulfilled' ? testimonialsRes.value.data.data || [] : [],
        }))
      })
    } catch (err) {
      console.error('Failed to preload data:', err)
      setError(err.message)
      setLoading(false)
    }
  }, [])

  // Refresh a single data type — always bypasses cache
  const refreshData = useCallback(async (dataType) => {
    const fetcher = FETCHERS[dataType]
    if (!fetcher) { console.warn(`Unknown data type: ${dataType}`); return }
    try {
      const response = await fetcher()
      setData(prev => ({ ...prev, [dataType]: response.data.data || [] }))
    } catch (err) {
      console.error(`Failed to refresh ${dataType}:`, err)
    }
  }, [])

  // Invalidate ALL cache + refresh ALL data — call this after any mutation
  const invalidateAndRefresh = useCallback(async (types) => {
    clearCache() // wipe entire axios cache instantly
    const keys = types || Object.keys(FETCHERS)
    const results = await Promise.allSettled(keys.map(k => FETCHERS[k]?.()))
    const updates = {}
    keys.forEach((key, i) => {
      if (results[i].status === 'fulfilled') {
        updates[key] = results[i].value.data.data || []
      }
    })
    setData(prev => ({ ...prev, ...updates }))
  }, [])

  const clearCacheCtx = useCallback(() => clearCache(), [])

  const getProductById = useCallback((id) =>
    data.products.find(p => p._id === id || p.slug === id)
  , [data.products])

  const getRelatedProducts = useCallback((productId, limit = 4) => {
    const product = getProductById(productId)
    if (!product) return []
    return data.products.filter(p => p._id !== productId && p.category === product.category).slice(0, limit)
  }, [data.products, getProductById])

  const searchProducts = useCallback((query) => {
    const q = query.toLowerCase()
    return data.products.filter(p =>
      p.name?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.brand?.name?.toLowerCase().includes(q)
    )
  }, [data.products])

  const filterProducts = useCallback((filters) => {
    let filtered = [...data.products]
    if (filters.category) filtered = filtered.filter(p => p.category === filters.category)
    if (filters.brand) {
      filtered = filtered.filter(p => {
        const name = typeof p.brand === 'object' ? p.brand?.name : p.brand
        return name === filters.brand
      })
    }
    if (filters.search) {
      const q = filters.search.toLowerCase()
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
      )
    }
    return filtered
  }, [data.products])

  useEffect(() => { preloadData() }, [preloadData])

  return (
    <DataContext.Provider value={{
      ...data, loading, error, isPreloaded,
      preloadData, refreshData, invalidateAndRefresh,
      clearCache: clearCacheCtx,
      getProductById, getRelatedProducts, searchProducts, filterProducts,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}

export default DataContext
