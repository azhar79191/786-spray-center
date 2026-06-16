import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://myshop-1sp3.onrender.com/api',
  timeout: 8000, // 8s — fail fast, don't make user wait 15s
  headers: { 'Content-Type': 'application/json' },
})

// ─── Two-layer cache: memory (fast) + localStorage (persists across refreshes) ──
const memCache = new Map()
const MEM_TTL  = 5 * 60 * 1000   // 5 min in-memory
const DISK_TTL = 30 * 60 * 1000  // 30 min localStorage (stale-while-revalidate)
const LS_PREFIX = 'bsc_cache_'

const getCacheKey = (config) =>
  `${config.url}?${JSON.stringify(config.params || {})}`

// Read from localStorage
const readDisk = (key) => {
  try {
    const raw = localStorage.getItem(LS_PREFIX + key)
    if (!raw) return null
    const entry = JSON.parse(raw)
    if (Date.now() - entry.timestamp > DISK_TTL) {
      localStorage.removeItem(LS_PREFIX + key)
      return null
    }
    return entry
  } catch { return null }
}

// Write to localStorage (non-blocking)
const writeDisk = (key, data) => {
  try {
    localStorage.setItem(LS_PREFIX + key, JSON.stringify({ data, timestamp: Date.now() }))
  } catch { /* storage full — ignore */ }
}

// ─── Request interceptor ──────────────────────────────────────────────────────
apiClient.interceptors.request.use((config) => {
  config.metadata = { startTime: Date.now() }

  const token = localStorage.getItem('token') || localStorage.getItem('adminToken')
  if (token) config.headers.Authorization = `Bearer ${token}`

  if (config.method === 'get' && !config._skipCache) {
    const key = getCacheKey(config)

    // 1. Memory cache hit — instant
    const mem = memCache.get(key)
    if (mem && Date.now() - mem.timestamp < MEM_TTL) {
      config._fromCache = 'memory'
      config.adapter = () => Promise.resolve({
        data: mem.data, status: 200,
        statusText: 'OK (Memory)', headers: {}, config, request: {},
      })
      return config
    }

    // 2. Disk cache hit — fast, serve stale & revalidate in background
    const disk = readDisk(key)
    if (disk) {
      config._fromCache = 'disk'
      config._staleKey  = key
      config._staleData = disk.data
      config.adapter = () => Promise.resolve({
        data: disk.data, status: 200,
        statusText: 'OK (Stale)', headers: {}, config, request: {},
      })
      // Revalidate in background after serving stale
      setTimeout(() => {
        apiClient.get(config.url, { params: config.params, _skipCache: true, _bgRefresh: true })
          .then(res => {
            memCache.set(key, { data: res.data, timestamp: Date.now() })
            writeDisk(key, res.data)
          }).catch(() => {})
      }, 100)
      return config
    }
  }

  return config
})

// ─── Response interceptor ────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      const ms = Date.now() - (response.config.metadata?.startTime || 0)
      const tag = response.config._fromCache ? ` [${response.config._fromCache.toUpperCase()}]` : ''
      console.log(`[${response.config.method?.toUpperCase()}] ${response.config.url} ${ms}ms${tag}`)
    }

    // Cache fresh responses (not skip-cache admin calls, not background refreshes)
    if (
      response.config.method === 'get' &&
      response.status === 200 &&
      !response.config._skipCache &&
      !response.config._bgRefresh
    ) {
      const key = getCacheKey(response.config)
      memCache.set(key, { data: response.data, timestamp: Date.now() })
      writeDisk(key, response.data)
    }

    // Background refresh — update caches silently
    if (response.config._bgRefresh && response.status === 200) {
      const key = getCacheKey(response.config)
      memCache.set(key, { data: response.data, timestamp: Date.now() })
      writeDisk(key, response.data)
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

export const clearCache = () => {
  memCache.clear()
  // Clear only BSC cache keys from localStorage
  Object.keys(localStorage)
    .filter(k => k.startsWith(LS_PREFIX))
    .forEach(k => localStorage.removeItem(k))
}

export const clearCacheEntry = (url) => {
  for (const key of memCache.keys()) {
    if (key.startsWith(`${url}?`)) memCache.delete(key)
  }
  Object.keys(localStorage)
    .filter(k => k.startsWith(LS_PREFIX) && k.includes(url))
    .forEach(k => localStorage.removeItem(k))
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
