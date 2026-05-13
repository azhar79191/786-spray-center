import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop component
 * Automatically scrolls to top on route change
 * Temporarily disables smooth scroll for instant navigation
 */
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Temporarily disable smooth scrolling
    const html = document.documentElement
    const originalBehavior = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    
    // Scroll to top instantly
    window.scrollTo(0, 0)
    
    // Re-enable smooth scrolling after a short delay
    setTimeout(() => {
      html.style.scrollBehavior = originalBehavior
    }, 100)
  }, [pathname])

  return null
}

export default ScrollToTop
