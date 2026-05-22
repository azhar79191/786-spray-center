/**
 * Keep Backend Alive Utility
 * Prevents Render.com free tier cold starts by pinging the backend periodically
 */

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'https://myshop-1sp3.onrender.com/api'
const PING_INTERVAL = 10 * 60 * 1000 // 10 minutes

/**
 * Start keepalive pings to prevent backend cold starts
 */
export const startKeepAlive = () => {
  // Only run in production
  if (import.meta.env.DEV) {
    console.log('⏭️ Keepalive disabled in development')
    return
  }

  console.log('🔄 Starting backend keepalive service...')

  // Initial ping
  pingBackend()

  // Set up interval
  const intervalId = setInterval(pingBackend, PING_INTERVAL)

  // Return cleanup function
  return () => {
    console.log('⏹️ Stopping backend keepalive service')
    clearInterval(intervalId)
  }
}

/**
 * Ping backend health endpoint
 */
const pingBackend = async () => {
  try {
    const startTime = Date.now()
    const response = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const duration = Date.now() - startTime
      console.log(`✅ Backend keepalive ping successful (${duration}ms)`)
    } else {
      console.warn(`⚠️ Backend keepalive ping failed: ${response.status}`)
    }
  } catch (error) {
    console.error('❌ Backend keepalive ping error:', error.message)
  }
}

/**
 * Check if backend is awake
 */
export const checkBackendStatus = async () => {
  try {
    const startTime = Date.now()
    const response = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const duration = Date.now() - startTime
    const data = await response.json()

    return {
      isAwake: response.ok,
      responseTime: duration,
      data,
    }
  } catch (error) {
    return {
      isAwake: false,
      responseTime: null,
      error: error.message,
    }
  }
}

export default startKeepAlive
