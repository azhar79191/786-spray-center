import { memo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEye, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa'
import { formatPrice, getCategoryColor, getStockStatusColor } from '../../utils/helpers'

const ProductCard = memo(({ product, index = 0 }) => {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const minPrice = product.sizes?.length > 0
    ? Math.min(...product.sizes.map(s => s.price))
    : 0

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    const tiltX = ((y / height) - 0.5) * 14   // -7 to +7 deg
    const tiltY = ((x / width) - 0.5) * -14
    setTilt({ x: tiltX, y: tiltY })
    setGlowPos({ x: (x / width) * 100, y: (y / height) * 100 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlowPos({ x: 50, y: 50 })
    setHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      style={{ perspective: '900px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group bg-white rounded-2xl shadow-card overflow-hidden relative cursor-pointer"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
          transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d',
          boxShadow: hovered
            ? '0 20px 40px -10px rgba(212,160,23,0.35), 0 8px 16px -4px rgba(0,0,0,0.15)'
            : undefined,
        }}
      >
        {/* Gold radial glow that follows cursor */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(212,160,23,0.12) 0%, transparent 65%)`,
            }}
          />
        )}

        {/* Image container */}
        <div className="relative h-56 overflow-hidden bg-primary-700" style={{ transformStyle: 'preserve-3d' }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={(e) => {
                e.preventDefault()
                setShowQuickView(true)
              }}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-primary hover:bg-gold hover:text-white hover:scale-110 transition-all duration-200 shadow-lg"
              title="Quick View"
            >
              <FaExpand className="w-5 h-5" />
            </button>
            <Link
              to={`/products/${product.slug || product._id}`}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-primary hover:bg-gold hover:text-white hover:scale-110 transition-all duration-200 shadow-lg"
              title="View Details"
            >
              <FaEye className="w-5 h-5" />
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsFavorite(!isFavorite)
              }}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-primary hover:bg-gold hover:text-white hover:scale-110 transition-all duration-200 shadow-lg"
              title="Add to Wishlist"
            >
              {isFavorite ? (
                <FaHeart className="w-5 h-5 text-red-500" />
              ) : (
                <FaRegHeart className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(product.category)}`}>
              {product.category}
            </span>
          </div>

          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-3 right-3">
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-gold text-primary shadow-gold"
              >
                ⭐ Featured
              </motion.span>
            </div>
          )}

          {/* Stock status */}
          <div className="absolute bottom-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStockStatusColor(product.stockStatus)}`}>
              {product.stockStatus}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-gold text-xs font-semibold tracking-wider uppercase mb-1">
            {product.brand}
          </p>
          <h3 className="text-primary font-display font-bold text-lg mb-2 line-clamp-1 group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-primary-300 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.sizes.slice(0, 3).map((size, i) => (
                <span key={i} className="px-2 py-1 bg-primary-700 rounded text-xs text-primary-300">
                  {size.size}
                </span>
              ))}
              {product.sizes.length > 3 && (
                <span className="px-2 py-1 bg-primary-700 rounded text-xs text-primary-300">
                  +{product.sizes.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-primary-600">
            <div>
              <p className="text-primary-300 text-xs">Starting from</p>
              <p className="text-gold font-bold text-lg">{formatPrice(minPrice)}</p>
            </div>
            <Link
              to={`/products/${product.slug || product._id}`}
              className="btn-primary text-sm py-2 px-4"
            >
              <FaEye className="w-4 h-4 mr-2" />
              View
            </Link>
          </div>
        </div>

        {/* Quick View Modal */}
        <QuickViewModal
          product={product}
          isOpen={showQuickView}
          onClose={() => setShowQuickView(false)}
        />
      </div>
    </motion.div>
  )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard
