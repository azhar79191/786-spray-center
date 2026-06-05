import { memo } from 'react'
import Masonry from 'react-masonry-css'
import { motion, AnimatePresence } from 'framer-motion'
import GalleryImage from './GalleryImage'

/**
 * Gallery Grid Component with Multiple View Modes
 * - Masonry: Pinterest-style responsive layout
 * - Grid: Uniform equal-height grid
 * - Compact: Dense grid for more images per row
 * Optimized with lazy loading and smooth animations
 */
const GalleryGrid = memo(({ filteredImages, setSelectedImage, viewMode = 'masonry' }) => {
  // Breakpoint columns for different view modes
  const breakpointColumnsConfig = {
    masonry: {
      default: 4,
      1536: 4,
      1280: 3,
      1024: 3,
      768: 2,
      640: 1,
    },
    grid: {
      default: 3,
      1280: 3,
      1024: 2,
      768: 2,
      640: 1,
    },
    compact: {
      default: 5,
      1536: 5,
      1280: 4,
      1024: 3,
      768: 3,
      640: 2,
    },
  }

  const breakpointColumns = breakpointColumnsConfig[viewMode] || breakpointColumnsConfig.masonry

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  }

  // Render different layouts based on view mode
  const renderMasonryLayout = () => (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex -ml-6 w-auto"
      columnClassName="pl-6 bg-clip-padding"
    >
      {filteredImages.map((image, index) => (
        <motion.div
          key={image._id}
          className="mb-6"
          variants={itemVariants}
        >
          <GalleryImage
            image={image}
            onClick={setSelectedImage}
            index={index}
            viewMode={viewMode}
          />
        </motion.div>
      ))}
    </Masonry>
  )

  const renderGridLayout = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredImages.map((image, index) => (
        <motion.div
          key={image._id}
          variants={itemVariants}
          className="aspect-square"
        >
          <GalleryImage
            image={image}
            onClick={setSelectedImage}
            index={index}
            viewMode={viewMode}
          />
        </motion.div>
      ))}
    </div>
  )

  const renderCompactLayout = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {filteredImages.map((image, index) => (
        <motion.div
          key={image._id}
          variants={itemVariants}
          className="aspect-square"
        >
          <GalleryImage
            image={image}
            onClick={setSelectedImage}
            index={index}
            viewMode={viewMode}
          />
        </motion.div>
      ))}
    </div>
  )

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewMode}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={containerVariants}
      >
        {viewMode === 'masonry' && renderMasonryLayout()}
        {viewMode === 'grid' && renderGridLayout()}
        {viewMode === 'compact' && renderCompactLayout()}

        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-primary-700 rounded-full flex items-center justify-center">
              <span className="text-5xl">🔍</span>
            </div>
            <h3 className="text-primary font-semibold text-xl mb-2">No images found</h3>
            <p className="text-primary-300">Try selecting a different category or view mode</p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
})

GalleryGrid.displayName = 'GalleryGrid'

export default GalleryGrid
