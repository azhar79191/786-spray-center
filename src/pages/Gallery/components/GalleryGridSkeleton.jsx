/**
 * Gallery Grid Skeleton Loader
 * Shows placeholder while images are loading
 * Improves perceived performance
 */
const GalleryGridSkeleton = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="aspect-square rounded-2xl bg-primary-700 animate-pulse"
          style={{
            animationDelay: `${index * 50}ms`
          }}
        />
      ))}
    </div>
  )
}

export default GalleryGridSkeleton
