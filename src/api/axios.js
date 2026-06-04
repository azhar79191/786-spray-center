import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://myshop-1sp3.onrender.com/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// In-memory cache for GET requests
const cache = new Map()
const CACHE_TTL = 1 * 60 * 1000 // 5 minutes for public pages

const getCacheKey = (config) =>
  `${config.url}?${JSON.stringify(config.params || {})}`

// ─── Request interceptor ───────────────────────────────────────────────────
apiClient.interceptors.request.use((config) => {
  config.metadata = { startTime: Date.now() }

  // Auth token
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken')
  if (token) config.headers.Authorization = `Bearer ${token}`

  // Serve from cache only if not explicitly skipped
  if (config.method === 'get' && !config._skipCache) {
    const key = getCacheKey(config)
    const cached = cache.get(key)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      config.adapter = () => Promise.resolve({
        data: cached.data,
        status: 200,
        statusText: 'OK (Cached)',
        headers: {},
        config,
        request: {},
      })
    }
  }

  return config
})

// ─── Response interceptor ─────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      const ms = Date.now() - (response.config.metadata?.startTime || 0)
      const tag = response.statusText === 'OK (Cached)' ? ' [CACHE]' : ''
      console.log(`[${response.config.method?.toUpperCase()}] ${response.config.url} ${ms}ms${tag}`)
    }

    // Only write to cache for real (non-skipped) GET responses
    if (
      response.config.method === 'get' &&
      response.status === 200 &&
      !response.config._skipCache
    ) {
      cache.set(getCacheKey(response.config), {
        data: response.data,
        timestamp: Date.now(),
      })
    }

    return response
  },
  (error) => {
    const { response, config } = error

    if (import.meta.env.DEV) {
      console.error('API Error:', { url: config?.url, status: response?.status, message: error.message })
    }

    if (!response) {
      error.message = 'Network error. Please check your internet connection.'
    } else {
      switch (response.status) {
        case 400: error.message = response.data?.message || 'Bad request.'; break
        case 401:
          error.message = 'Session expired. Please login again.'
          localStorage.removeItem('token')
          localStorage.removeItem('adminToken')
          localStorage.removeItem('adminUser')
          if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
            window.location.href = '/admin/login'
          }
          break
        case 403: error.message = 'You do not have permission to perform this action.'; break
        case 404: error.message = response.data?.message || 'Resource not found.'; break
        case 409: error.message = response.data?.message || 'Conflict. Resource already exists.'; break
        case 422: error.message = response.data?.message || 'Validation failed.'; break
        case 429: error.message = 'Too many requests. Please try again later.'; break
        case 500: error.message = 'Server error. Please try again later.'; break
        default:  error.message = response.data?.message || 'An unexpected error occurred.'
      }
    }

    return Promise.reject(error)
  }
)

export const clearCache = () => cache.clear()

export const clearCacheEntry = (url) => {
  for (const key of cache.keys()) {
    if (key.startsWith(`${url}?`)) cache.delete(key)
  }
}

export const uploadFile = async (url, file, onProgress) => {
  const formData = new FormData()
  formData.append('image', file)
  return apiClient.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: onProgress
      ? (e) => onProgress(Math.round((e.loaded * 100) / e.total))
      : undefined,
  })
}

export default apiClient
