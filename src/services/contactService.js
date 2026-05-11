import apiClient from '../api/axios.js'

/**
 * Contact service layer
 * Handles all contact form and inquiry operations
 */
export const contactService = {
  /**
   * Submit contact form
   */
  submit: async (formData) => {
    const response = await apiClient.post('/contact', formData)
    return response.data
  },

  /**
   * Get all contact submissions (admin)
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get('/contact', { params })
    return response.data
  },

  /**
   * Get single contact by ID (admin)
   */
  getById: async (id) => {
    const response = await apiClient.get(`/contact/${id}`)
    return response.data
  },

  /**
   * Update contact status (admin)
   */
  updateStatus: async (id, status) => {
    const response = await apiClient.put(`/contact/${id}`, { status })
    return response.data
  },

  /**
   * Delete contact (admin)
   */
  delete: async (id) => {
    const response = await apiClient.delete(`/contact/${id}`)
    return response.data
  },
}

export default contactService
