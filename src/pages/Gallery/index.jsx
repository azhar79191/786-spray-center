import { useState, useEffect } from 'react'
import SEO from '../../components/common/SEO'
import { getAllGalleryImages } from '../../services/galleryService'
import Spinner from '../../components/loaders/Spinner'
import GalleryHero from './components/GalleryHero'
import GalleryFilter from './components/GalleryFilter'
import GalleryGrid from './components/GalleryGrid'
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
        title="Photo Gallery" 
        description="Browse our photo gallery featuring agricultural products, store images, farming equipment, crop protection solutions, and field work. See our premium pesticides, fertilizers, seeds, and spray machines in action."
        keywords="agricultural products photos, pesticide images, fertilizer pictures, farming equipment gallery, agricultural store photos Minchinabad, crop protection images, spray machines photos"
      />

      <GalleryHero />

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
              <GalleryFilter 
                categories={categories}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
              <GalleryGrid 
                filteredImages={filteredImages}
                setSelectedImage={setSelectedImage}
              />
            </>
          )}
        </div>
      </section>

      <GalleryLightbox 
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </>
  )
}

export default Gallery
