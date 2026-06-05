import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import SEO from '../../components/common/SEO'
import { useGallery } from '../../hooks/useGallery'
import GalleryHero from './components/GalleryHero'
import GalleryFilter from './components/GalleryFilter'
import GalleryGrid from './components/GalleryGrid'
import GalleryGridSkeleton from './components/GalleryGridSkeleton'
import GalleryLightbox from './components/GalleryLightbox'
import { FaThLarge, FaTh, FaList } from 'react-icons/fa'

const GALLERY_STRUCTURED_DATA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Bismillah Spray Center Photo Gallery',
  description: 'Photo gallery featuring agricultural products, store images, farming equipment, and crop protection solutions',
  url: 'https://bismillahspraycenter.vercel.app/gallery',
  inLanguage: 'en-PK',
  isPartOf: { '@type': 'WebSite', name: 'Bismillah Spray Center', url: 'https://bismillahspraycenter.vercel.app' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bismillahspraycenter.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Gallery', item: 'https://bismillahspraycenter.vercel.app/gallery' },
    ],
  },
})

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [viewMode, setViewMode] = useState('masonry') // masonry, grid, compact

  const { galleryImages, loading } = useGallery()

  const categories = useMemo(
    () => ['All', ...new Set(galleryImages.map(img => img.category))],
    [galleryImages]
  )

  const filteredImages = useMemo(
    () => activeFilter === 'All' ? galleryImages : galleryImages.filter(img => img.category === activeFilter),
    [galleryImages, activeFilter]
  )

  const viewModes = [
    { id: 'masonry', label: 'Masonry', icon: FaThLarge, description: 'Pinterest-style' },
    { id: 'grid', label: 'Grid', icon: FaTh, description: 'Uniform grid' },
    { id: 'compact', label: 'Compact', icon: FaList, description: 'Dense view' },
  ]

  return (
    <>
      <SEO
        title="Photo Gallery"
        description="Browse our photo gallery featuring agricultural products, store images, farming equipment, crop protection solutions, and field work."
        keywords="agricultural products photos, pesticide images, fertilizer pictures, farming equipment gallery, agricultural store photos Minchinabad, crop protection images, spray machines photos"
      />

      <script type="application/ld+json">{GALLERY_STRUCTURED_DATA}</script>

      <GalleryHero />

      <section className="section-padding bg-surface">
        <div className="container-premium">
          {/* Stats Bar */}
          {!loading && galleryImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl shadow-card"
            >
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">{galleryImages.length}</p>
                  <p className="text-primary-300 text-sm mt-1">Total Images</p>
                </div>
                <div className="w-px h-12 bg-primary-100" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{filteredImages.length}</p>
                  <p className="text-primary-300 text-sm mt-1">Showing</p>
                </div>
                <div className="w-px h-12 bg-primary-100" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{categories.length - 1}</p>
                  <p className="text-primary-300 text-sm mt-1">Categories</p>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-primary-700 p-1.5 rounded-xl">
                {viewModes.map((mode) => {
                  const Icon = mode.icon
                  return (
                    <motion.button
                      key={mode.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode(mode.id)}
                      className={`
                        relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        flex items-center gap-2
                        ${viewMode === mode.id
                          ? 'bg-white text-primary shadow-md'
                          : 'text-primary-300 hover:text-primary'
                        }
                      `}
                      title={mode.description}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{mode.label}</span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Filter */}
          {!loading && galleryImages.length > 0 && (
            <GalleryFilter
              categories={categories}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          )}

          {/* Gallery Grid */}
          {loading ? (
            <GalleryGridSkeleton count={12} />
          ) : galleryImages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-32 h-32 mx-auto mb-6 bg-primary-700 rounded-full flex items-center justify-center">
                <span className="text-6xl">📷</span>
              </div>
              <h3 className="text-primary font-bold text-2xl mb-2">No Images Available</h3>
              <p className="text-primary-300 text-lg">Check back soon for new gallery updates!</p>
            </motion.div>
          ) : (
            <GalleryGrid
              filteredImages={filteredImages}
              setSelectedImage={setSelectedImage}
              viewMode={viewMode}
            />
          )}
        </div>
      </section>

      <GalleryLightbox
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        images={filteredImages}
      />
    </>
  )
}

export default Gallery
