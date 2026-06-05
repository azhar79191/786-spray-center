import { memo, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight, FaDownload, FaShareAlt, FaExpand, FaCompress } from 'react-icons/fa'

const GalleryLightbox = memo(({ selectedImage, setSelectedImage, images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [scale, setScale] = useState(1)

  // Lock body scroll when modal is open - prevents background scrolling
  useEffect(() => {
    if (selectedImage) {
      // Store original values
      const originalOverflow = document.body.style.overflow
      const originalPaddingRight = document.body.style.paddingRight
      const originalPosition = document.body.style.position
      
      // Get scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      
      // Lock scroll on body and html
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.documentElement.style.overflow = 'hidden'
      
      // Also prevent iOS Safari scroll issues
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      
      // Cleanup: restore original values when modal closes
      return () => {
        document.body.style.overflow = originalOverflow
        document.body.style.paddingRight = originalPaddingRight
        document.body.style.position = originalPosition
        document.body.style.width = ''
        document.documentElement.style.overflow = ''
      }
    }
  }, [selectedImage])

  useEffect(() => {
    if (selectedImage && images.length > 0) {
      const index = images.findIndex(img => img._id === selectedImage._id)
      setCurrentIndex(index >= 0 ? index : 0)
    }
  }, [selectedImage, images])

  const goToNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedImage(images[currentIndex + 1])
      setIsZoomed(false)
      setScale(1)
    }
  }, [currentIndex, images, setSelectedImage])

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setSelectedImage(images[currentIndex - 1])
      setIsZoomed(false)
      setScale(1)
    }
  }, [currentIndex, images, setSelectedImage])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return
      
      switch(e.key) {
        case 'Escape':
          setSelectedImage(null)
          break
        case 'ArrowRight':
          goToNext()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, goToNext, goToPrevious, setSelectedImage])

  const handleDownload = async () => {
    if (!selectedImage) return
    
    try {
      const response = await fetch(selectedImage.image)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${selectedImage.title || 'image'}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const handleShare = async () => {
    if (navigator.share && selectedImage) {
      try {
        await navigator.share({
          title: selectedImage.title,
          text: selectedImage.description || '',
          url: window.location.href
        })
      } catch (error) {
        console.log('Share failed:', error)
      }
    }
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
    setScale(isZoomed ? 1 : 2)
  }

  if (!selectedImage) return null

  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-primary/80 to-transparent z-10">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              {/* Counter */}
              <div className="text-white font-semibold backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
                {currentIndex + 1} / {images.length}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleZoom()
                  }}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-gold hover:text-primary transition-all"
                  title={isZoomed ? 'Zoom Out' : 'Zoom In'}
                >
                  {isZoomed ? <FaCompress className="w-5 h-5" /> : <FaExpand className="w-5 h-5" />}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload()
                  }}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-gold hover:text-primary transition-all"
                  title="Download"
                >
                  <FaDownload className="w-5 h-5" />
                </button>

                {navigator.share && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleShare()
                    }}
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-gold hover:text-primary transition-all"
                    title="Share"
                  >
                    <FaShareAlt className="w-5 h-5" />
                  </button>
                )}

                <button
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-gold hover:text-primary transition-all"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close lightbox"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Arrows */}
          {currentIndex > 0 && (
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 md:p-5 bg-white/15 backdrop-blur-md rounded-full text-white hover:bg-gold hover:text-primary transition-all shadow-2xl z-10 group"
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-5 h-5 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
            </motion.button>
          )}

          {currentIndex < images.length - 1 && (
            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 md:p-5 bg-white/15 backdrop-blur-md rounded-full text-white hover:bg-gold hover:text-primary transition-all shadow-2xl z-10 group"
              aria-label="Next image"
            >
              <FaChevronRight className="w-5 h-5 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
            </motion.button>
          )}

          {/* Main Content - Scrollable Container */}
          <motion.div
            key={selectedImage._id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="max-w-6xl w-full max-h-[85vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-6">
              <motion.img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-2xl mx-auto"
                animate={{ scale }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
                onClick={toggleZoom}
              />
              
              {/* Info Bar */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mt-6 bg-white/5 backdrop-blur-sm rounded-2xl p-6"
              >
                <h3 className="text-white font-display font-bold text-2xl">{selectedImage.title}</h3>
                <p className="text-gold font-medium mt-1">{selectedImage.category}</p>
                {selectedImage.description && (
                  <p className="text-primary-400 text-sm mt-3 max-w-2xl mx-auto">{selectedImage.description}</p>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Progress Indicator - Replaces Thumbnail Strip */}
          {images.length > 1 && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                {/* Progress dots */}
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIndex(index)
                      setSelectedImage(images[index])
                      setIsZoomed(false)
                      setScale(1)
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? 'w-8 h-2 bg-gold'
                        : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
})

GalleryLightbox.displayName = 'GalleryLightbox'

export default GalleryLightbox
