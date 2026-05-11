import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaExpand } from 'react-icons/fa'
import SEO from '../../components/common/SEO'
import SectionTitle from '../../components/common/SectionTitle'
import { getAllGalleryImages } from '../../services/galleryService'
import Spinner from '../../components/loaders/Spinner'

/**
 * Gallery Page
 * Image gallery with lightbox functionality
 */
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await getAllGalleryImages({ isActive: true })
      setImages(response.data || [])
    } catch (error) {
      console.error('Failed to fetch gallery images:', error)
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', ...new Set(images.map(img => img.category))]

  const filteredImages = activeFilter === 'All' 
    ? images 
    : images.filter(img => img.category === activeFilter)

  return (
    <>
      <SEO 
        title="Gallery" 
        description="Explore our product gallery, shop images, and agricultural field work photos."
      />

      {/* Hero */}
      <section className="relative py-24 bg-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />

        <div className="container-premium relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="Our Gallery"
              subtitle="Visual Journey"
              light
            />
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-primary-300 text-lg">No images available at the moment.</p>
            </div>
          ) : (
            <>
              {/* Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeFilter === category
                        ? 'bg-gold text-primary'
                        : 'bg-white text-primary-300 hover:bg-primary-700 shadow-card'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Image Grid */}
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                <AnimatePresence>
                  {filteredImages.map((image, index) => (
                    <motion.div
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
                          <FaExpand className="w-8 h-8 text-white mx-auto mb-2" />
                          <p className="text-white font-semibold">{image.title}</p>
                          <p className="text-primary-400 text-sm">{image.category}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 p-2 text-white hover:text-gold transition-colors"
              onClick={() => setSelectedImage(null)}
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
    </>
  )
}

export default Gallery
