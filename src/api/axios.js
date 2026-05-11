import axios from 'axios'

/**
 * Centralized Axios instance with interceptors
 * Handles authentication, error handling, and request/response transformation
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://myshop-1sp3.onrender.com/api',
  timeout: 30000, // Increased timeout for production
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Request interceptor
 * Adds auth token, logging, and request metadata
 */
apiClient.interceptors.request.use(
  (config) => {
    // Add timestamp for request tracking
    config.metadata = { startTime: new Date() }

    // Add auth token if available (check both token and adminToken)
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Response interceptor
 * Handles success responses, errors, and token refresh
 */
apiClient.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration = new Date() - response.config.metadata?.startTime

    if (import.meta.env.DEV) {
      console.log(`[${response.config.method?.toUpperCase()}] ${response.config.url} - ${duration}ms`)
    }

    return response
  },
  (error) => {
    const { response, request, config } = error

    // Log error in development
    if (import.meta.env.DEV) {
      console.error('API Error:', {
        url: config?.url,
        method: config?.method,
        status: response?.status,
        message: error.message,
      })
    }

    // Handle specific error cases
    if (!response) {
      // Network error (no response)
      error.message = 'Network error. Please check your internet connection.'
    } else {
      switch (response.status) {
        case 400:
          error.message = response.data?.message || 'Bad request. Please check your input.'
          break
        case 401:
          error.message = 'Session expired. Please login again.'
          localStorage.removeItem('token')
          localStorage.removeItem('adminToken')
          localStorage.removeItem('adminUser')
          // Only redirect if on admin page
          if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
            window.location.href = '/admin/login'
          }
          break
        case 403:
          error.message = 'You do not have permission to perform this action.'
          break
        case 404:
          error.message = response.data?.message || 'Resource not found.'
          break
        case 409:
          error.message = response.data?.message || 'Conflict. Resource already exists.'
          break
        case 422:
          error.message = response.data?.message || 'Validation failed. Please check your input.'
          break
        case 429:
          error.message = 'Too many requests. Please try again later.'
          break
        case 500:
          error.message = 'Server error. Please try again later.'
          break
        default:
          error.message = response.data?.message || 'An unexpected error occurred.'
      }
    }

    return Promise.reject(error)
  }
)

/**
 * File upload helper with multipart/form-data
 */
export const uploadFile = async (url, file, onProgress) => {
  const formData = new FormData()
  formData.append('image', file)

  return apiClient.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: onProgress
      ? (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(percentCompleted)
        }
      : undefined,
  })
}

export default apiClient
