import { useState } from 'react'
import SEO from '../../components/common/SEO'
import { useGallery } from '../../hooks/useGallery'
import GalleryHero from './components/GalleryHero'
import GalleryFilter from './components/GalleryFilter'
import GalleryGrid from './components/GalleryGrid'
import GalleryGridSkeleton from './components/GalleryGridSkeleton'
import GalleryLightbox from './components/GalleryLightbox'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')
  
  // Use preloaded data from DataContext - instant loading!
  const { galleryImages, loading } = useGallery()

  const categories = ['All', ...new Set(galleryImages.map(img => img.category))]
  const filteredImages = activeFilter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter)

  return (
    <>
      <SEO 
        title="Photo Gallery" 
        description="Browse our photo gallery featuring agricultural products, store images, farming equipment, crop protection solutions, and field work. See our premium pesticides, fertilizers, seeds, and spray machines in action."
        keywords="agricultural products photos, pesticide images, fertilizer pictures, farming equipment gallery, agricultural store photos Minchinabad, crop protection images, spray machines photos"
      />

      {/* Enhanced Structured Data for Gallery Page */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": "Bismillah Spray Center Photo Gallery",
          "description": "Photo gallery featuring agricultural products, store images, farming equipment, and crop protection solutions",
          "url": "https://bismillahspraycenter.vercel.app/gallery",
          "inLanguage": "en-PK",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Bismillah Spray Center",
            "url": "https://bismillahspraycenter.vercel.app"
          },
          "about": {
            "@type": "Thing",
            "name": "Agricultural Products Gallery",
            "description": "Images of pesticides, fertilizers, seeds, farming equipment, and agricultural store"
          },
          "image": galleryImages.slice(0, 10).map(img => ({
            "@type": "ImageObject",
            "contentUrl": img.image,
            "name": img.title,
            "description": img.description || img.title,
            "caption": img.title,
            "thumbnailUrl": img.image
          })),
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://bismillahspraycenter.vercel.app"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Gallery",
                "item": "https://bismillahspraycenter.vercel.app/gallery"
              }
            ]
          },
          "publisher": {
            "@type": "Organization",
            "name": "Bismillah Spray Center",
            "logo": {
              "@type": "ImageObject",
              "url": "https://bismillahspraycenter.vercel.app/og-image.png"
            }
          }
        })}
      </script>

      {/* SEO-friendly static content for crawlers */}
      <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <h1>Photo Gallery - Bismillah Spray Center</h1>
        <h2>Agricultural Products and Store Images</h2>
        
        <article>
          <h3>Gallery Categories</h3>
          <ul>
            <li>Agricultural Products - Photos of pesticides, insecticides, herbicides, and fungicides</li>
            <li>Fertilizers - Images of organic and chemical fertilizers</li>
            <li>Seeds - Pictures of certified seeds from leading brands</li>
            <li>Store Images - Our agricultural store in Minchinabad</li>
            <li>Farming Equipment - Spray machines and agricultural tools</li>
            <li>Field Work - Crop protection and farming activities</li>
            <li>Brand Products - Syngenta, Bayer, FMC, Engro products</li>
          </ul>
        </article>
        
        <article>
          <h3>Featured Products in Gallery</h3>
          <p>Browse through our extensive collection of agricultural product images including:</p>
          <ul>
            <li>Pesticides for cotton, wheat, rice, and vegetables</li>
            <li>Insecticides for pest control and crop protection</li>
            <li>Herbicides for weed management</li>
            <li>Fungicides for disease prevention</li>
            <li>Fertilizers for soil nutrition and plant growth</li>
            <li>Seeds from certified brands</li>
            <li>Spray machines and application equipment</li>
            <li>Agricultural tools and accessories</li>
          </ul>
        </article>
        
        <article>
          <h3>Our Store</h3>
          <p>View images of our agricultural products store located in Behramka Hithar, Minchinabad, Bahawalnagar, Punjab, Pakistan. We maintain a well-stocked inventory of premium agricultural products from leading brands.</p>
        </article>
        
        <article>
          <h3>Quality Products</h3>
          <p>All products shown in our gallery are genuine, authorized products from trusted manufacturers. We are authorized dealers of Syngenta, Bayer Crop Science, FMC Corporation, Engro Fertilizers, and other leading agricultural brands.</p>
        </article>
        
        <article>
          <h3>Contact Us</h3>
          <p>For inquiries about any products shown in our gallery:</p>
          <p>Phone: +92 300 1331616</p>
          <p>Email: zafarwattoo@gmail.com</p>
          <p>Location: Behramka Hithar, Tehsil Minchinabad, District Bahawalnagar, Punjab, Pakistan</p>
        </article>
      </div>

      {/* Hero loads immediately */}
      <GalleryHero />

      {/* Grid section - always visible */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          {/* Show filter immediately if we have images */}
          {!loading && galleryImages.length > 0 && (
            <GalleryFilter 
              categories={categories}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          )}

          {/* Show skeleton while loading */}
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

      {/* Lightbox */}
      <GalleryLightbox 
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </>
  )
}

export default Gallery
