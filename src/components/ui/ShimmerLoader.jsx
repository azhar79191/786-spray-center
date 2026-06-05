/**
 * Shimmer Loading Effect Component
 * Modern animated skeleton loader with shimmer effect
 */
const ShimmerLoader = ({ className = '', variant = 'default' }) => {
  const variants = {
    default: 'h-4 w-full',
    title: 'h-8 w-3/4',
    text: 'h-4 w-full',
    image: 'h-64 w-full',
    circle: 'h-12 w-12 rounded-full',
    button: 'h-12 w-32 rounded-xl',
    card: 'h-96 w-full rounded-2xl',
  }

  return (
    <div
      className={`relative overflow-hidden bg-primary-700 rounded-lg ${variants[variant]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  )
}

export default ShimmerLoader
