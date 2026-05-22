/**
 * Cache Utility Functions
 * Centralized cache management for the application
 */

import { clearCache as clearAxiosCache } from '../api/axios'

/**
 * Clear all application caches
 * - localStorage cache (DataContext)
 * - Axios in-memory cache
 */
export const clearAllCaches = () => {
  // Clear localStorage cache
  const cacheKeys = [
    'cache_products',
    'cache_featured_products',
    'cache_categories',
    'cache_brands',
    'cache_brand_list',
    'cache_gallery',
    'cache_faqs',
    'cache_faq_categories',
    'cache_testimonials',
    'cache_timestamp',
  ]

  cacheKeys.forEach(key => {
    localStorage.removeItem(key)
  })

  // Clear axios cache
  clearAxiosCache()

  console.log('✅ All caches cleared')
}

/**
 * Clear specific cache entries
 */
export const clearCacheByType = (type) => {
  const cacheMap = {
    products: ['cache_products', 'cache_featured_products', 'cache_categories', 'cache_brands'],
    brands: ['cache_brand_list', 'cache_brands'],
    gallery: ['cache_gallery'],
    faqs: ['cache_faqs', 'cache_faq_categories'],
    testimonials: ['cache_testimonials'],
  }

  const keys = cacheMap[type] || []
  keys.forEach(key => {
    localStorage.removeItem(key)
  })

  // Also clear axios cache
  clearAxiosCache()

  console.log(`✅ Cleared ${type} cache`)
}

/**
 * Clear cache timestamp to force refresh on next load
 */
export const invalidateCache = () => {
  localStorage.removeItem('cache_timestamp')
  console.log('✅ Cache invalidated')
}

/**
 * Get cache age in minutes
 */
export const getCacheAge = () => {
  const timestamp = localStorage.getItem('cache_timestamp')
  if (!timestamp) return null

  const age = Date.now() - parseInt(timestamp, 10)
  return Math.floor(age / 1000 / 60) // Convert to minutes
}

/**
 * Check if cache is valid
 */
export const isCacheValid = (maxAgeMinutes = 10) => {
  const age = getCacheAge()
  if (age === null) return false
  return age < maxAgeMinutes
}

export default {
  clearAllCaches,
  clearCacheByType,
  invalidateCache,
  getCacheAge,
  isCacheValid,
}
