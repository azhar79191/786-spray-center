import apiClient from '../api/axios.js'

/**
 * FAQ service layer
 * Handles all FAQ-related operations
 */
export const faqService = {
  /**
   * Get all FAQs with optional category filter
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get('/faqs', { params })
    return response.data
  },

  /**
   * Get FAQ categories
   */
  getCategories: async () => {
    const response = await apiClient.get('/faqs/categories/all')
    return response.data
  },

  /**
   * Get single FAQ by ID
   */
  getById: async (id) => {
    const response = await apiClient.get(`/faqs/${id}`)
    return response.data
  },

  /**
   * Create new FAQ (admin)
   */
  create: async (faqData) => {
    const response = await apiClient.post('/faqs', faqData)
    return response.data
  },

  /**
   * Update FAQ (admin)
   */
  update: async (id, faqData) => {
    const response = await apiClient.put(`/faqs/${id}`, faqData)
    return response.data
  },

  /**
   * Delete FAQ (admin)
   */
  delete: async (id) => {
    const response = await apiClient.delete(`/faqs/${id}`)
    return response.data
  },
}

export default faqService
