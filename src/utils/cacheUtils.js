import { clearCache as clearAxiosCache, clearCacheEntry } from '../api/axios'

/**
 * Clear all axios in-memory cache
 */
export const clearAllCaches = () => {
  clearAxiosCache()
}

/**
 * Clear axios cache entries related to a specific data type
 */
export const clearCacheByType = (type) => {
  const urlMap = {
    products: ['/products', '/products/featured/list', '/products/categories/all', '/products/brands/all'],
    brands: ['/brands', '/products/brands/all'],
    gallery: ['/gallery'],
    faqs: ['/faqs', '/faqs/categories/all'],
    testimonials: ['/testimonials/approved'],
  }

  const urls = urlMap[type] || []
  urls.forEach(url => clearCacheEntry(url))
}

export const invalidateCache = () => clearAxiosCache()

export default {
  clearAllCaches,
  clearCacheByType,
  invalidateCache,
}
