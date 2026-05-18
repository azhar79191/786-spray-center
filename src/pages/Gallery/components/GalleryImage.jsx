import { memo } from 'react'
import { FaExpand } from 'react-icons/fa'
import LazyImage from '../../../components/common/LazyImage'

/**
 * Optimized Gallery Image Component
 * Uses lazy loading for better performance
 * Memoized to prevent unnecessary re-renders
 */
const GalleryImage = memo(({ image, onClick }) => {
  return (
    <article
      className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-300"
      onClick={() => onClick(image)}
    >
      {/* Lazy loaded image */}
      <LazyImage
        src={image.image}
        alt={image.title}
        className="w-full h-full transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-center px-4">
          <FaExpand className="w-8 h-8 text-white mx-auto mb-2" aria-hidden="true" />
          <p className="text-white font-semibold">{image.title}</p>
          <p className="text-primary-400 text-sm">{image.category}</p>
        </div>
      </div>
    </article>
  )
})

GalleryImage.displayName = 'GalleryImage'

export default GalleryImage
