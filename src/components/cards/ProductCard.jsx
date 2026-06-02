import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEye } from 'react-icons/fa'
import { formatPrice, getCategoryColor, getStockStatusColor } from '../../utils/helpers'

const ProductCard = memo(({ product, index = 0 }) => {
  const minPrice = product.sizes?.length > 0 
    ? Math.min(...product.sizes.map(s => s.price)) 
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image container */}
      <div className="relative h-56 overflow-hidden bg-primary-700">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            to={`/products/${product.slug || product._id}`}
            className="p-3 bg-white rounded-full text-primary hover:bg-gold hover:text-primary transition-colors duration-200"
            title="View Details"
          >
            <FaEye className="w-5 h-5" />
          </Link>
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
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold text-primary">
              Featured
            </span>
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
        {/* Brand */}
        <p className="text-gold text-xs font-semibold tracking-wider uppercase mb-1">
          {product.brand}
        </p>

        {/* Name */}
        <h3 className="text-primary font-display font-bold text-lg mb-2 line-clamp-1 group-hover:text-gold transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-primary-300 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Sizes preview */}
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

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-primary-600">
          <div>
            <p className="text-primary-300 text-xs">Starting from</p>
            <p className="text-gold font-bold text-lg">
              {formatPrice(minPrice)}
            </p>
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
    </motion.div>
  )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard
