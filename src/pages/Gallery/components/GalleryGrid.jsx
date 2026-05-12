import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExpand } from 'react-icons/fa'

const GalleryGrid = memo(({ filteredImages, setSelectedImage }) => {
  return (
    <motion.div 
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <AnimatePresence>
        {filteredImages.map((image, index) => (
          <motion.article
            key={image._id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.image}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center px-4">
                <FaExpand className="w-8 h-8 text-white mx-auto mb-2" aria-hidden="true" />
                <p className="text-white font-semibold">{image.title}</p>
                <p className="text-primary-400 text-sm">{image.category}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>
    </motion.div>
  )
})

GalleryGrid.displayName = 'GalleryGrid'

export default GalleryGrid
