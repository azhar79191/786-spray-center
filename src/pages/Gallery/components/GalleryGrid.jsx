import { memo } from 'react'
import GalleryImage from './GalleryImage'

/**
 * Gallery Grid Component
 * Displays images in a responsive grid
 * Optimized with lazy loading and component-based architecture
 */
const GalleryGrid = memo(({ filteredImages, setSelectedImage }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredImages.map((image) => (
        <GalleryImage
          key={image._id}
          image={image}
          onClick={setSelectedImage}
        />
      ))}
    </div>
  )
})

GalleryGrid.displayName = 'GalleryGrid'

export default GalleryGrid
