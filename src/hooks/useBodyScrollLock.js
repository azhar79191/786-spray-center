import { useEffect } from 'react'

/**
 * Custom Hook: useBodyScrollLock
 * Locks body scroll when a modal/overlay is open
 * Prevents layout shift by accounting for scrollbar width
 * 
 * @param {boolean} isLocked - Whether scroll should be locked
 * 
 * @example
 * function Modal({ isOpen }) {
 *   useBodyScrollLock(isOpen)
 *   return <div>Modal content</div>
 * }
 */
export const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (!isLocked) return

    // Store original values
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    
    // Lock scroll and compensate for scrollbar
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
    
    // Cleanup: restore original values when unlocked
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [isLocked])
}

export default useBodyScrollLock
