/**
 * Keep Backend Alive
 * Render free tier sleeps after 15 min inactivity — ping every 13 min
 */

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'https://myshop-1sp3.onrender.com/api'
const PING_INTERVAL = 13 * 60 * 1000 // 13 min — safely under Render's 15 min sleep
const ENABLE_CLIENT_KEEP_ALIVE = import.meta.env.VITE_ENABLE_CLIENT_KEEPALIVE === 'true'

const pingBackend = async () => {
  try {
    const t = Date.now()
    const res = await fetch(`${BACKEND_URL}/health`, { method: 'GET' })
    if (import.meta.env.DEV) {
      console.log(`🏓 Keep-alive ${res.ok ? '✅' : '⚠️'} ${Date.now() - t}ms`)
    }
  } catch { /* silent in production */ }
}

export const startKeepAlive = () => {
  if (import.meta.env.DEV || !ENABLE_CLIENT_KEEP_ALIVE) return () => {}

  // Immediate ping on app start — wakes Render if sleeping
  pingBackend()

  // Regular interval
  const id = setInterval(pingBackend, PING_INTERVAL)

  // Ping on tab visibility restore (user returns after long absence)
  const onVisible = () => {
    if (document.visibilityState === 'visible') pingBackend()
  }
  document.addEventListener('visibilitychange', onVisible)

  return () => {
    clearInterval(id)
    document.removeEventListener('visibilitychange', onVisible)
  }
}

export const checkBackendStatus = async () => {
  try {
    const t = Date.now()
    const res = await fetch(`${BACKEND_URL}/health`)
    const data = await res.json()
    return { isAwake: res.ok, responseTime: Date.now() - t, data }
  } catch (error) {
    return { isAwake: false, responseTime: null, error: error.message }
  }
}

export default startKeepAlive
