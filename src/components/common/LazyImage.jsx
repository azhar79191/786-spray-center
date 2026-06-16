import { useState, useEffect, useRef } from 'react'

/**
 * Lazy Loading Image Component
 * Only loads images when they enter the viewport
 * Improves performance by reducing initial page load
 */
const LazyImage = ({ 
  src, 
  alt, 
  className = '',
  imgClassName = '',
  onClick,
  placeholderClassName = 'bg-primary-700 animate-pulse',
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (!imgRef.current) return

    // Intersection Observer to detect when image enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01
      }
    )

    observer.observe(imgRef.current)

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [])

  return (
    <div ref={imgRef} className={`relative ${className}`} onClick={onClick}>
      {/* Placeholder while loading */}
      {!isLoaded && (
        <div className={`absolute inset-0 ${placeholderClassName}`} />
      )}
      
      {/* Actual image - only load when in viewport */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          onLoad={() => setIsLoaded(true)}
          loading={loading}
        />
      )}
    </div>
  )
}

export default LazyImage
