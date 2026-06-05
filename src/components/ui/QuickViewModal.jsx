import { memo, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaWhatsapp, FaShareAlt, FaHeart, FaRegHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { formatPrice, getCategoryColor } from '../../utils/helpers'
import { CONTACT, getWhatsAppLink } from '../../utils/constants'

/**
 * Quick View Modal Component
 * Shows product preview without leaving the page
 */
const QuickViewModal = memo(({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store original overflow value
      const originalOverflow = document.body.style.overflow
      const originalPaddingRight = document.body.style.paddingRight
      const originalPosition = document.body.style.position
      
      // Get scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      
      // Lock scroll
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.documentElement.style.overflow = 'hidden'
      
      // Cleanup: restore original values when modal closes
      return () => {
        document.body.style.overflow = originalOverflow
        document.body.style.paddingRight = originalPaddingRight
        document.body.style.position = originalPosition
        document.body.style.width = ''
        document.documentElement.style.overflow = ''
      }
    }
  }, [isOpen])

  if (!product) return null

  const images = product.images?.length > 0 ? product.images : [product.image]

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in:\n\n*${product.name}*\n${
      selectedSize ? `Size: ${selectedSize.size}\nPrice: ${formatPrice(selectedSize.price)}` : ''
    }\n\nPlease provide more details.`
    
    window.open(getWhatsAppLink(CONTACT.whatsapp, message), '_blank')
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-primary/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
          style={{ margin: 0 }}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative my-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-primary hover:text-gold transition-colors shadow-lg"
              aria-label="Close modal"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Left: Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-primary-700">
                  <img
                    src={images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(product.category)}`}>
                      {product.category}
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-gold transition-all shadow-lg"
                  >
                    {isFavorite ? (
                      <FaHeart className="w-5 h-5 text-red-500" />
                    ) : (
                      <FaRegHeart className="w-5 h-5 text-primary" />
                    )}
                  </button>
                </div>

                {/* Thumbnail Images */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                          activeImage === index ? 'border-gold scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Product Info */}
              <div className="flex flex-col">
                <div className="flex-grow space-y-6">
                  {/* Brand */}
                  <p className="text-gold text-sm font-semibold tracking-wider uppercase">
                    {product.brand?.name || product.brand}
                  </p>

                  {/* Product Name */}
                  <h2 className="text-primary font-display font-bold text-3xl leading-tight">
                    {product.name}
                  </h2>

                  {/* Description */}
                  <p className="text-primary-300 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Stock Status */}
                  <div className="inline-block">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      product.stockStatus === 'In Stock' 
                        ? 'bg-green-100 text-green-800' 
                        : product.stockStatus === 'Low Stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stockStatus}
                    </span>
                  </div>

                  {/* Sizes & Prices */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div>
                      <h3 className="text-primary font-semibold mb-3">Available Sizes:</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {product.sizes.map((size) => (
                          <button
                            key={size.size}
                            onClick={() => setSelectedSize(size)}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                              selectedSize?.size === size.size
                                ? 'border-gold bg-gold/10 shadow-gold'
                                : 'border-primary-500 hover:border-gold hover:shadow-lg'
                            }`}
                          >
                            <p className="font-semibold text-primary">{size.size}</p>
                            <p className="text-gold font-bold text-lg">{formatPrice(size.price)}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div>
                      <h3 className="text-primary font-semibold mb-3">Key Features:</h3>
                      <ul className="space-y-2">
                        {product.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                            <span className="text-primary-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-6 border-t border-primary-100">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full btn-primary py-4 text-lg"
                  >
                    <FaWhatsapp className="w-5 h-5 mr-2" />
                    Order via WhatsApp
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="px-4 py-3 border-2 border-primary-500 text-primary font-semibold rounded-xl hover:border-gold hover:text-gold transition-all flex items-center justify-center gap-2">
                      <FaShareAlt className="w-4 h-4" />
                      Share
                    </button>
                    
                    <Link
                      to={`/products/${product.slug || product._id}`}
                      className="px-4 py-3 bg-primary-700 text-primary font-semibold rounded-xl hover:bg-primary-600 transition-all text-center"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
})

QuickViewModal.displayName = 'QuickViewModal'

export default QuickViewModal
