import apiClient from '../api/axios.js'

/**
 * Product service layer
 * Encapsulates all product-related API calls
 */

/**
 * Get all products with optional filters
 */
export const getProducts = async (params = {}) => {
  const response = await apiClient.get('/products', { params })
  return response.data
}

/**
 * Get single product by ID or slug
 */
export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`)
  return response.data
}

/**
 * Get featured products
 */
export const getFeaturedProducts = async (limit = 6) => {
  const response = await apiClient.get('/products/featured/list', {
    params: { limit },
  })
  return response.data
}

/**
 * Get all categories
 */
export const getCategories = async () => {
  const response = await apiClient.get('/products/categories/all')
  return response.data
}

/**
 * Get all brands
 */
export const getBrands = async () => {
  const response = await apiClient.get('/products/brands/all')
  return response.data
}

/**
 * Get related products
 */
export const getRelatedProducts = async (id, limit = 4) => {
  const response = await apiClient.get(`/products/${id}/related`, {
    params: { limit },
  })
  return response.data
}

/**
 * Create new product
 */
export const createProduct = async (productData) => {
  const response = await apiClient.post('/products', productData)
  return response.data
}

/**
 * Update product
 */
export const updateProduct = async (id, productData) => {
  const response = await apiClient.put(`/products/${id}`, productData)
  return response.data
}

/**
 * Delete product
 */
export const deleteProduct = async (id) => {
  const response = await apiClient.delete(`/products/${id}`)
  return response.data
}

// Also export as default object for backward compatibility
export const productService = {
  getAll: getProducts,
  getById: getProductById,
  getFeatured: getFeaturedProducts,
  getCategories,
  getBrands,
  getRelated: getRelatedProducts,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct,
}

export default productService
