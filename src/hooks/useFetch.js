import { useState, useEffect, useCallback, useRef } from 'react'
import apiClient from '../api/axios.js'

/**
 * Custom hook for data fetching with auto-execution
 * Automatically fetches data on mount or when dependencies change
 */
export const useFetch = (url, options = {}) => {
  const { immediate = true, params = {}, dependencies = [] } = options

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)
  const paramsRef = useRef(params)

  // Update params ref when params change (deep comparison)
  useEffect(() => {
    if (JSON.stringify(paramsRef.current) !== JSON.stringify(params)) {
      paramsRef.current = params
    }
  }, [params])

  const fetchData = useCallback(async (customParams = {}, requestOptions = {}) => {
    const signal = requestOptions.signal
    setLoading(true)
    setError(null)

    try {
      const response = await apiClient.get(url, {
        params: { ...paramsRef.current, ...customParams },
        _skipCache: options._skipCache || false,
        signal,
      })
      if (signal?.aborted) return null
      setData(response.data)
      return response.data
    } catch (err) {
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED' || signal?.aborted) {
        return null
      }
      setError(err.message || 'Failed to fetch data')
      return null
    } finally {
      if (!signal?.aborted) {
        setLoading(false)
      }
    }
  }, [url, options._skipCache])

  const refetch = useCallback(() => {
    return fetchData()
  }, [fetchData])

  useEffect(() => {
    if (!immediate) return undefined

    const controller = new AbortController()

    if (immediate) {
      fetchData({}, { signal: controller.signal })
    }

    return () => {
      controller.abort()
    }
  }, [immediate, fetchData, ...dependencies])

  return { data, loading, error, refetch, setData }
}

export default useFetch
