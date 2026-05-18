import { useState, useEffect } from 'react'
import SEO from '../../components/common/SEO'
import { getAllGalleryImages } from '../../services/galleryService'
import GalleryHero from './components/GalleryHero'
import GalleryFilter from './components/GalleryFilter'
import GalleryGrid from './components/GalleryGrid'
import GalleryGridSkeleton from './components/GalleryGridSkeleton'
import GalleryLightbox from './components/GalleryLightbox'

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
        title="Photo Gallery" 
        description="Browse our photo gallery featuring agricultural products, store images, farming equipment, crop protection solutions, and field work. See our premium pesticides, fertilizers, seeds, and spray machines in action."
        keywords="agricultural products photos, pesticide images, fertilizer pictures, farming equipment gallery, agricultural store photos Minchinabad, crop protection images, spray machines photos"
      />

      {/* Hero loads immediately */}
      <GalleryHero />

      {/* Grid section - always visible */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          {/* Show filter immediately if we have images */}
          {!loading && images.length > 0 && (
            <GalleryFilter 
              categories={categories}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          )}

          {/* Show skeleton while loading */}
          {loading ? (
            <GalleryGridSkeleton count={12} />
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-primary-300 text-lg">No images available at the moment.</p>
            </div>
          ) : (
            <GalleryGrid 
              filteredImages={filteredImages}
              setSelectedImage={setSelectedImage}
            />
          )}
        </div>
      </section>

      {/* Lightbox */}
      <GalleryLightbox 
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </>
  )
}

export default Gallery
