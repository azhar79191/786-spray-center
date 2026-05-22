import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import apiClient from '../api/axios'

/**
 * Global Data Context
 * Preloads and caches all common data used across the application
 * Reduces API calls and improves page load performance
 */

const DataContext = createContext(null)

// Cache keys for localStorage
const CACHE_KEYS = {
  PRODUCTS: 'cache_products',
  FEATURED_PRODUCTS: 'cache_featured_products',
  CATEGORIES: 'cache_categories',
  BRANDS: 'cache_brands',
  BRAND_LIST: 'cache_brand_list',
  GALLERY: 'cache_gallery',
  FAQS: 'cache_faqs',
  FAQ_CATEGORIES: 'cache_faq_categories',
  TESTIMONIALS: 'cache_testimonials',
  TIMESTAMP: 'cache_timestamp',
}

// Cache duration: 10 minutes
const CACHE_DURATION = 10 * 60 * 1000

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

  /**
   * Check if cache is valid
   */
  const isCacheValid = useCallback(() => {
    const timestamp = localStorage.getItem(CACHE_KEYS.TIMESTAMP)
    if (!timestamp) return false
    
    const age = Date.now() - parseInt(timestamp, 10)
    return age < CACHE_DURATION
  }, [])

  /**
   * Load data from localStorage cache
   */
  const loadFromCache = useCallback(() => {
    if (!isCacheValid()) return null

    try {
      const cachedData = {
        products: JSON.parse(localStorage.getItem(CACHE_KEYS.PRODUCTS) || '[]'),
        featuredProducts: JSON.parse(localStorage.getItem(CACHE_KEYS.FEATURED_PRODUCTS) || '[]'),
        categories: JSON.parse(localStorage.getItem(CACHE_KEYS.CATEGORIES) || '[]'),
        brands: JSON.parse(localStorage.getItem(CACHE_KEYS.BRANDS) || '[]'),
        brandList: JSON.parse(localStorage.getItem(CACHE_KEYS.BRAND_LIST) || '[]'),
        gallery: JSON.parse(localStorage.getItem(CACHE_KEYS.GALLERY) || '[]'),
        faqs: JSON.parse(localStorage.getItem(CACHE_KEYS.FAQS) || '[]'),
        faqCategories: JSON.parse(localStorage.getItem(CACHE_KEYS.FAQ_CATEGORIES) || '[]'),
        testimonials: JSON.parse(localStorage.getItem(CACHE_KEYS.TESTIMONIALS) || '[]'),
      }

      // Validate that we have actual data
      if (cachedData.products.length > 0 || cachedData.featuredProducts.length > 0) {
        return cachedData
      }
    } catch (err) {
      console.error('Failed to load from cache:', err)
    }

    return null
  }, [isCacheValid])

  /**
   * Save data to localStorage cache
   */
  const saveToCache = useCallback((newData) => {
    try {
      localStorage.setItem(CACHE_KEYS.PRODUCTS, JSON.stringify(newData.products))
      localStorage.setItem(CACHE_KEYS.FEATURED_PRODUCTS, JSON.stringify(newData.featuredProducts))
      localStorage.setItem(CACHE_KEYS.CATEGORIES, JSON.stringify(newData.categories))
      localStorage.setItem(CACHE_KEYS.BRANDS, JSON.stringify(newData.brands))
      localStorage.setItem(CACHE_KEYS.BRAND_LIST, JSON.stringify(newData.brandList))
      localStorage.setItem(CACHE_KEYS.GALLERY, JSON.stringify(newData.gallery))
      localStorage.setItem(CACHE_KEYS.FAQS, JSON.stringify(newData.faqs))
      localStorage.setItem(CACHE_KEYS.FAQ_CATEGORIES, JSON.stringify(newData.faqCategories))
      localStorage.setItem(CACHE_KEYS.TESTIMONIALS, JSON.stringify(newData.testimonials))
      localStorage.setItem(CACHE_KEYS.TIMESTAMP, Date.now().toString())
    } catch (err) {
      console.error('Failed to save to cache:', err)
    }
  }, [])

  /**
   * Clear cache
   */
  const clearCache = useCallback(() => {
    Object.values(CACHE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
  }, [])

  /**
   * Preload all data in parallel
   */
  const preloadData = useCallback(async (forceRefresh = false) => {
    // Check cache first
    if (!forceRefresh) {
      const cachedData = loadFromCache()
      if (cachedData) {
        setData(cachedData)
        setIsPreloaded(true)
        setLoading(false)
        console.log('✅ Data loaded from cache')
        
        // Refresh in background after 30 seconds to avoid double loading
        setTimeout(() => preloadData(true), 30000)
        return
      }
    }

    setLoading(true)
    setError(null)

    try {
      console.log('🔄 Preloading data from API...')
      const startTime = Date.now()

      // Fetch all data in parallel for maximum speed
      const [
        productsRes,
        featuredRes,
        categoriesRes,
        brandsRes,
        brandListRes,
        galleryRes,
        faqsRes,
        faqCategoriesRes,
        testimonialsRes,
      ] = await Promise.allSettled([
        apiClient.get('/products', { params: { limit: 100 } }),
        apiClient.get('/products/featured/list', { params: { limit: 6 } }),
        apiClient.get('/products/categories/all'),
        apiClient.get('/products/brands/all'),
        apiClient.get('/brands', { params: { limit: 50, isActive: true } }),
        apiClient.get('/gallery', { params: { limit: 50, isActive: true } }),
        apiClient.get('/faqs', { params: { limit: 100 } }),
        apiClient.get('/faqs/categories/all'),
        apiClient.get('/testimonials/approved', { params: { limit: 20 } }),
      ])

      const newData = {
        products: productsRes.status === 'fulfilled' ? productsRes.value.data.data || [] : [],
        featuredProducts: featuredRes.status === 'fulfilled' ? featuredRes.value.data.data || [] : [],
        categories: categoriesRes.status === 'fulfilled' ? categoriesRes.value.data.data || [] : [],
        brands: brandsRes.status === 'fulfilled' ? brandsRes.value.data.data || [] : [],
        brandList: brandListRes.status === 'fulfilled' ? brandListRes.value.data.data || [] : [],
        gallery: galleryRes.status === 'fulfilled' ? galleryRes.value.data.data || [] : [],
        faqs: faqsRes.status === 'fulfilled' ? faqsRes.value.data.data || [] : [],
        faqCategories: faqCategoriesRes.status === 'fulfilled' ? faqCategoriesRes.value.data.data || [] : [],
        testimonials: testimonialsRes.status === 'fulfilled' ? testimonialsRes.value.data.data || [] : [],
      }

      setData(newData)
      saveToCache(newData)
      setIsPreloaded(true)

      const duration = Date.now() - startTime
      console.log(`✅ Data preloaded in ${duration}ms`)

      // Log any failures
      const failures = [
        productsRes, featuredRes, categoriesRes, brandsRes, brandListRes,
        galleryRes, faqsRes, faqCategoriesRes, testimonialsRes
      ].filter(res => res.status === 'rejected')
      
      if (failures.length > 0) {
        console.warn(`⚠️ ${failures.length} requests failed during preload`)
      }

    } catch (err) {
      console.error('Failed to preload data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [loadFromCache, saveToCache])

  /**
   * Refresh specific data type
   */
  const refreshData = useCallback(async (dataType) => {
    try {
      let response
      switch (dataType) {
        case 'products':
          response = await apiClient.get('/products', { params: { limit: 100 } })
          setData(prev => {
            const newData = { ...prev, products: response.data.data || [] }
            saveToCache(newData)
            return newData
          })
          break
        case 'featuredProducts':
          response = await apiClient.get('/products/featured/list', { params: { limit: 6 } })
          setData(prev => {
            const newData = { ...prev, featuredProducts: response.data.data || [] }
            saveToCache(newData)
            return newData
          })
          break
        case 'categories':
          response = await apiClient.get('/products/categories/all')
          setData(prev => {
            const newData = { ...prev, categories: response.data.data || [] }
            saveToCache(newData)
            return newData
          })
          break
        case 'brands':
          response = await apiClient.get('/products/brands/all')
          setData(prev => {
            const newData = { ...prev, brands: response.data.data || [] }
            saveToCache(newData)
            return newData
          })
          break
        case 'brandList':
          response = await apiClient.get('/brands', { params: { limit: 50, isActive: true } })
          setData(prev => {
            const newData = { ...prev, brandList: response.data.data || [] }
            saveToCache(newData)
            return newData
          })
          break
        case 'gallery':
          response = await apiClient.get('/gallery', { params: { limit: 50, isActive: true } })
          setData(prev => {
            const newData = { ...prev, gallery: response.data.data || [] }
            saveToCache(newData)
            return newData
          })
          break
        case 'faqs':
          response = await apiClient.get('/faqs', { params: { limit: 100 } })
          setData(prev => {
            const newData = { ...prev, faqs: response.data.data || [] }
            saveToCache(newData)
            return newData
          })
          break
        case 'faqCategories':
          response = await apiClient.get('/faqs/categories/all')
          setData(prev => {
            const newData = { ...prev, faqCategories: response.data.data || [] }
            saveToCache(newData)
            return newData
          })
          break
        case 'testimonials':
          response = await apiClient.get('/testimonials/approved', { params: { limit: 20 } })
          setData(prev => {
            const newData = { ...prev, testimonials: response.data.data || [] }
            saveToCache(newData)
            return newData
          })
          break
        default:
          console.warn(`Unknown data type: ${dataType}`)
      }
      
      console.log(`✅ Refreshed ${dataType}`)
    } catch (err) {
      console.error(`Failed to refresh ${dataType}:`, err)
    }
  }, [saveToCache])

  /**
   * Get product by ID from cached data
   */
  const getProductById = useCallback((id) => {
    return data.products.find(p => p._id === id || p.slug === id)
  }, [data.products])

  /**
   * Get related products by category
   */
  const getRelatedProducts = useCallback((productId, limit = 4) => {
    const product = getProductById(productId)
    if (!product) return []

    return data.products
      .filter(p => p._id !== productId && p.category === product.category)
      .slice(0, limit)
  }, [data.products, getProductById])

  /**
   * Search products
   */
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
      filtered = filtered.filter(p => p.brand?.name === filters.brand)
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

  // Preload data on mount
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

/**
 * Hook to use data context
 */
export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}

export default DataContext
