import { memo } from 'react'
import { motion } from 'framer-motion'
import { FaImage, FaThLarge, FaCog, FaTractor, FaStore } from 'react-icons/fa'

/**
 * Enhanced Gallery Filter Component
 * Category filtering with smooth animations and icon support
 */
const GalleryFilter = memo(({ categories, activeFilter, setActiveFilter }) => {
  // Icon mapping for categories
  const categoryIcons = {
    'All': FaThLarge,
    'Products': FaImage,
    'Equipment': FaCog,
    'Field Work': FaTractor,
    'Store': FaStore,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Filter Title */}
        <div className="text-center">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-display font-bold text-2xl mb-2"
          >
            Browse by Category
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-primary-300 text-sm"
          >
            Filter images to find what you're looking for
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category] || FaImage
            const isActive = activeFilter === category
            
            return (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category)}
                className={`
                  relative px-6 py-3 rounded-full text-sm font-semibold
                  transition-all duration-300 overflow-hidden
                  border-2 shadow-md hover:shadow-lg
                  flex items-center gap-2
                  ${isActive
                    ? 'bg-gold text-primary border-gold shadow-gold scale-105'
                    : 'bg-white text-primary border-primary-100 hover:border-gold hover:text-gold'
                  }
                `}
                aria-pressed={isActive}
              >
                {/* Animated background on active */}
                {isActive && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-gold"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-primary' : ''}`} />
                
                {/* Text */}
                <span className="relative z-10">{category}</span>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative z-10 ml-1 w-2 h-2 bg-primary rounded-full"
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Active Filter Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-primary-300 text-sm">
            Showing:{' '}
            <span className="text-gold font-semibold">
              {activeFilter === 'All' ? 'All Images' : `${activeFilter} Images`}
            </span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
})

GalleryFilter.displayName = 'GalleryFilter'

export default GalleryFilter
