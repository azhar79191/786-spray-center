/**
 * API endpoint definitions
 * Centralized URL management for all API calls
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const ENDPOINTS = {
  // Health check
  health: `${BASE_URL}/health`,

  // Products
  products: {
    list: `${BASE_URL}/products`,
    featured: `${BASE_URL}/products/featured/list`,
    categories: `${BASE_URL}/products/categories/all`,
    brands: `${BASE_URL}/products/brands/all`,
    detail: (id) => `${BASE_URL}/products/${id}`,
    related: (id) => `${BASE_URL}/products/${id}/related`,
    create: `${BASE_URL}/products`,
    update: (id) => `${BASE_URL}/products/${id}`,
    delete: (id) => `${BASE_URL}/products/${id}`,
  },

  // Contact
  contact: {
    submit: `${BASE_URL}/contact`,
    list: `${BASE_URL}/contact`,
    detail: (id) => `${BASE_URL}/contact/${id}`,
    update: (id) => `${BASE_URL}/contact/${id}`,
    delete: (id) => `${BASE_URL}/contact/${id}`,
  },

  // FAQs
  faqs: {
    list: `${BASE_URL}/faqs`,
    categories: `${BASE_URL}/faqs/categories/all`,
    detail: (id) => `${BASE_URL}/faqs/${id}`,
    create: `${BASE_URL}/faqs`,
    update: (id) => `${BASE_URL}/faqs/${id}`,
    delete: (id) => `${BASE_URL}/faqs/${id}`,
  },
}

export default ENDPOINTS
