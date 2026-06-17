import { useState, useEffect, useRef, memo } from 'react'

/**
 * Lazy Loading Image Component
 * Only loads images when they enter the viewport
 * Improves performance by reducing initial page load
 */
const LazyImage = memo(({ 
  src, 
  alt, 
  className = '',
  imgClassName = '',
  onClick,
  placeholderClassName = 'bg-primary-700 animate-pulse',
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  // Optimized: Use native lazy loading with IntersectionObserver fallback
  useEffect(() => {
    if (!imgRef.current || loading === 'eager') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target.querySelector('img')
            if (img && img.dataset.src) {
              img.src = img.dataset.src
              delete img.dataset.src
            }
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '200px 0px', // Load 200px before entering viewport for better UX
        threshold: 0.01
      }
    )

    observer.observe(imgRef.current)

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [loading])

  return (
    <div ref={imgRef} className={`relative ${className}`} onClick={onClick}>
      {/* Placeholder while loading */}
      {!isLoaded && (
        <div className={`absolute inset-0 ${placeholderClassName}`} />
      )}
      
      {/* Actual image */}
      <img
        {...(loading !== 'eager' && { 'data-src': src })}
        src={loading === 'eager' ? src : undefined}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
        onLoad={() => setIsLoaded(true)}
        loading={loading}
        decoding="async"
        importance={loading === 'eager' ? 'high' : 'low'}
      />
    </div>
  )
})

LazyImage.displayName = 'LazyImage'

export default LazyImage
