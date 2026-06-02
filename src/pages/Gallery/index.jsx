import { useState, useMemo } from 'react'
import SEO from '../../components/common/SEO'
import { useGallery } from '../../hooks/useGallery'
import GalleryHero from './components/GalleryHero'
import GalleryFilter from './components/GalleryFilter'
import GalleryGrid from './components/GalleryGrid'
import GalleryGridSkeleton from './components/GalleryGridSkeleton'
import GalleryLightbox from './components/GalleryLightbox'

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

  const { galleryImages, loading } = useGallery()

  const categories = useMemo(
    () => ['All', ...new Set(galleryImages.map(img => img.category))],
    [galleryImages]
  )

  const filteredImages = useMemo(
    () => activeFilter === 'All' ? galleryImages : galleryImages.filter(img => img.category === activeFilter),
    [galleryImages, activeFilter]
  )

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
          {!loading && galleryImages.length > 0 && (
            <GalleryFilter
              categories={categories}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          )}

          {loading ? (
            <GalleryGridSkeleton count={12} />
          ) : galleryImages.length === 0 ? (
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

      <GalleryLightbox
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </>
  )
}

export default Gallery
