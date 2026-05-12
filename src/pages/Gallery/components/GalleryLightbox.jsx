import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

const GalleryLightbox = memo(({ selectedImage, setSelectedImage }) => {
  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            className="absolute top-6 right-6 p-2 text-white hover:text-gold transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <FaTimes className="w-8 h-8" />
          </button>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="text-center mt-4">
              <h3 className="text-white font-display font-bold text-xl">{selectedImage.title}</h3>
              <p className="text-primary-400">{selectedImage.category}</p>
              {selectedImage.description && (
                <p className="text-primary-400 text-sm mt-2">{selectedImage.description}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

GalleryLightbox.displayName = 'GalleryLightbox'

export default GalleryLightbox
