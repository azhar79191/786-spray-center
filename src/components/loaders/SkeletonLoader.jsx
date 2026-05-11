import { motion } from 'framer-motion'

/**
 * Skeleton loader for cards and content
 * Provides visual feedback during data loading
 */
export const SkeletonCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl shadow-card overflow-hidden"
    >
      {/* Image skeleton */}
      <div className="h-48 bg-primary-600 animate-pulse" />

      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        <div className="h-5 bg-primary-600 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-primary-600 rounded animate-pulse w-full" />
        <div className="h-4 bg-primary-600 rounded animate-pulse w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-primary-600 rounded animate-pulse w-1/3" />
          <div className="h-8 bg-primary-600 rounded animate-pulse w-1/4" />
        </div>
      </div>
    </motion.div>
  )
}

export const SkeletonProductGrid = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export const SkeletonText = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-primary-600 rounded animate-pulse"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  )
}

export const SkeletonImage = ({ className = '' }) => {
  return (
    <div className={`bg-primary-600 animate-pulse rounded-lg ${className}`} />
  )
}

export default SkeletonCard
