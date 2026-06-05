/**
 * Product Card Skeleton Loader with Shimmer Effect
 */
const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      {/* Image skeleton */}
      <div className="relative h-56 bg-primary-700 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        {/* Brand */}
        <div className="h-4 w-20 bg-primary-700 rounded overflow-hidden relative">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Title */}
        <div className="h-6 w-3/4 bg-primary-700 rounded overflow-hidden relative">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-primary-700 rounded overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div className="h-4 w-2/3 bg-primary-700 rounded overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>

        {/* Sizes */}
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-16 bg-primary-700 rounded overflow-hidden relative">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animationDelay: `${i * 0.1}s` }} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-primary-600">
          <div className="space-y-2">
            <div className="h-3 w-16 bg-primary-700 rounded overflow-hidden relative">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="h-6 w-20 bg-primary-700 rounded overflow-hidden relative">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
          <div className="h-10 w-24 bg-primary-700 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Product Grid Skeleton Loader
 */
export const ProductGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

export default ProductCardSkeleton
