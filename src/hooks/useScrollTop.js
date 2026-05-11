import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Custom hook to scroll to top on route change
 */
export const useScrollTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname])
}

export default useScrollTop
