import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { FaExpand, FaHeart, FaRegHeart, FaDownload, FaShare } from 'react-icons/fa'
import LazyImage from '../../../components/common/LazyImage'

/**
 * Enhanced Gallery Image Component
 * - Adaptive styling based on view mode
 * - Lazy loading for better performance
 * - Favorite/like functionality
 * - Download and share options
 * - Smooth hover animations
 */
const GalleryImage = memo(({ image, onClick, index = 0, viewMode = 'masonry' }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleFavorite = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    // TODO: Save to localStorage or backend
  }

  const handleDownload = (e) => {
    e.stopPropagation()
    const link = document.createElement('a')
    link.href = image.image
    link.download = `${image.title}.jpg`
    link.click()
  }

  const handleShare = (e) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: image.title,
        text: `Check out this image: ${image.title}`,
        url: window.location.href,
      })
    }
  }

  // Different styling based on view mode
  const isCompact = viewMode === 'compact'
  const isGrid = viewMode === 'grid'

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        group relative overflow-hidden cursor-pointer 
        shadow-card hover:shadow-premium transition-all duration-300 h-full
        ${isCompact ? 'rounded-xl' : 'rounded-2xl'}
      `}
      onClick={() => onClick(image)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Lazy loaded image */}
      <div className={`relative ${isGrid || isCompact ? 'h-full' : ''}`}>
        <LazyImage
          src={image.image}
          alt={image.title}
          className={`
            w-full transition-transform duration-700 group-hover:scale-110
            ${isGrid || isCompact ? 'h-full object-cover' : 'h-auto'}
          `}
        />
      </div>
      
      {/* Gradient Overlay - Always visible at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      
      {/* Hover overlay with blur */}
      <div className="absolute inset-0 bg-primary/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center w-full"
        >
          {/* Expand Icon */}
          {!isCompact && (
            <motion.div
              whileHover={{ scale: 1.2, rotate: 90 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="mb-4"
            >
              <FaExpand className={`${isCompact ? 'w-6 h-6' : 'w-10 h-10'} text-gold mx-auto drop-shadow-lg`} />
            </motion.div>
          )}
          
          {/* Title and Category */}
          <p className={`text-white font-bold ${isCompact ? 'text-sm mb-1' : 'text-xl mb-2'} drop-shadow-lg line-clamp-2`}>
            {image.title}
          </p>
          {!isCompact && (
            <p className="text-gold text-sm font-semibold uppercase tracking-wider mb-4">
              {image.category}
            </p>
          )}
          
          {/* Action Buttons - Only show on larger view modes */}
          {!isCompact && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFavorite}
                className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-gold transition-all duration-200"
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? (
                  <FaHeart className="w-4 h-4 text-red-400" />
                ) : (
                  <FaRegHeart className="w-4 h-4 text-white" />
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDownload}
                className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-gold transition-all duration-200"
                title="Download image"
              >
                <FaDownload className="w-4 h-4 text-white" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-gold transition-all duration-200"
                title="Share image"
              >
                <FaShare className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Category Badge - Top Left */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.02 }}
        className="absolute top-3 left-3 z-10"
      >
        <span className={`
          px-3 py-1.5 bg-white/95 backdrop-blur-sm text-primary font-bold rounded-full 
          shadow-lg border border-primary-500
          ${isCompact ? 'text-xs px-2 py-1' : 'text-xs'}
        `}>
          {image.category}
        </span>
      </motion.div>

      {/* Favorite Badge - Top Right */}
      {isFavorite && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 z-10"
        >
          <div className={`${isCompact ? 'p-1.5' : 'p-2'} bg-red-500/90 backdrop-blur-sm rounded-full shadow-lg`}>
            <FaHeart className={`${isCompact ? 'w-3 h-3' : 'w-4 h-4'} text-white`} />
          </div>
        </motion.div>
      )}

      {/* Info Bar at Bottom - Always visible, adapts to view mode */}
      {!isCompact && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary via-primary/98 to-transparent z-10">
          <p className="text-white font-bold text-base truncate drop-shadow-md">
            {image.title}
          </p>
          {image.description && (
            <p className="text-primary-400 text-sm truncate mt-1">
              {image.description}
            </p>
          )}
        </div>
      )}

      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-gold/20 via-transparent to-transparent blur-2xl" />
      </div>
    </motion.article>
  )
})

GalleryImage.displayName = 'GalleryImage'

export default GalleryImage
