import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaArrowLeft,
  FaCheck,
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaShareAlt,
  FaWhatsapp
} from 'react-icons/fa'
import SEO from '../../components/common/SEO'
import ProductCard from '../../components/cards/ProductCard'
import { SkeletonText, SkeletonImage } from '../../components/loaders/SkeletonLoader'
import { useProducts } from '../../hooks/useProducts'
import { formatPrice, getCategoryColor, getStockStatusColor, getWhatsAppLink } from '../../utils/helpers'
import { CONTACT } from '../../utils/constants'

/**
 * Product Details Page
 * Single product view with related products
 */
const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedSize, setSelectedSize] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { fetchProductById, fetchRelatedProducts } = useProducts()

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        const productData = await fetchProductById(id)
        if (productData) {
          setProduct(productData)
          if (productData.sizes && productData.sizes.length > 0) {
            setSelectedSize(productData.sizes[0])
          }

          // Fetch related products
          const related = await fetchRelatedProducts(id, 4)
          setRelatedProducts(related)
        } else {
          setError('Product not found')
        }
      } catch (err) {
        setError(err.message || 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
    window.scrollTo(0, 0)
  }, [id])

  const handleWhatsAppInquiry = () => {
    const message = `Hello, I am interested in ${product?.name} (${selectedSize?.size || ''}). Please provide more details.`
    window.open(getWhatsAppLink(CONTACT.whatsapp, message), '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface pt-20">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12">
            <SkeletonImage className="h-[500px] rounded-3xl" />
            <div className="space-y-6">
              <SkeletonText lines={1} className="h-8" />
              <SkeletonText lines={3} />
              <SkeletonText lines={2} />
              <SkeletonText lines={1} className="h-12" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error || 'Product not found'}</p>
          <Link to="/products" className="btn-primary">
            <FaArrowLeft className="mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const images = [product.image, ...(product.images || [])].filter(Boolean)

  return (
    <>
      <SEO 
        title={product.name}
        description={product.description}
        keywords={`${product.name}, ${product.brand}, ${product.category}, agricultural products, Minchinabad`}
        product={{
          name: product.name,
          description: product.description,
          brand: product.brand,
          image: product.image,
          price: selectedSize?.price || product.minPrice || 0,
          currency: 'PKR',
          availability: product.stockStatus === 'In Stock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-primary py-4">
        <div className="container-premium">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-primary-400 hover:text-gold transition-colors">Home</Link>
            <span className="text-primary-300">/</span>
            <Link to="/products" className="text-primary-400 hover:text-gold transition-colors">Products</Link>
            <span className="text-primary-300">/</span>
            <Link to={`/products?category=${product.category}`} className="text-primary-400 hover:text-gold transition-colors">
              {product.category}
            </Link>
            <span className="text-primary-300">/</span>
            <span className="text-gold">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-3xl p-4 shadow-card">
                {/* Main Image */}
                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-primary-700 mb-4">
                  <img
                    src={images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(product.category)}`}>
                      {product.category}
                    </span>
                  </div>
                  {product.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold text-primary">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                          activeImage === index ? 'border-gold' : 'border-transparent'
                        }`}
                      >
                        <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Brand & Name */}
              <p className="text-gold text-sm font-semibold tracking-wider uppercase mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(product.ratings?.average || 0) ? 'text-gold' : 'text-primary-500'}`}
                    />
                  ))}
                </div>
                <span className="text-primary-300 text-sm">
                  ({product.ratings?.count || 0} reviews)
                </span>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStockStatusColor(product.stockStatus)}`}>
                  {product.stockStatus}
                </span>
              </div>

              {/* Description */}
              <p className="text-primary-300 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Sizes & Pricing */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-primary font-semibold mb-3">Select Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size.size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-3 rounded-xl border-2 font-semibold transition-all duration-200 ${
                          selectedSize?.size === size.size
                            ? 'border-gold bg-gold/10 text-gold'
                            : 'border-primary-500 text-primary-300 hover:border-gold hover:text-gold'
                        }`}
                      >
                        <span className="block text-sm">{size.size}</span>
                        <span className="block text-lg">{formatPrice(size.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Display */}
              <div className="bg-primary-700 rounded-2xl p-6 mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-gold text-3xl font-bold">
                    {formatPrice(selectedSize?.price || product.minPrice || 0)}
                  </span>
                  <span className="text-primary-300 text-sm">
                    per {selectedSize?.size || 'unit'}
                  </span>
                </div>
                <p className="text-primary-400 text-sm">
                  Prices may vary based on quantity. Contact us for bulk pricing.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="flex-1 min-w-[200px] px-6 py-4 bg-primary text-gold font-semibold rounded-xl hover:bg-primary-50 transition-colors flex items-center justify-center gap-2 shadow-gold"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Inquire on WhatsApp
                </button>
                <button
                  onClick={() => {
                    const message = `Hello, I am interested in ${product.name}. Please provide more details.`
                    window.open(getWhatsAppLink(CONTACT.whatsapp, message), '_blank')
                  }}
                  className="px-6 py-4 border-2 border-gold text-gold font-semibold rounded-xl hover:bg-gold hover:text-primary transition-all flex items-center gap-2"
                >
                  <FaShareAlt className="w-5 h-5" />
                  Share
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-primary-300 text-sm">
                  <FaCheck className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>100% Genuine Product</span>
                </div>
                <div className="flex items-center gap-3 text-primary-300 text-sm">
                  <FaTruck className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3 text-primary-300 text-sm">
                  <FaShieldAlt className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>Expert Support</span>
                </div>
                <div className="flex items-center gap-3 text-primary-300 text-sm">
                  <FaCheck className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>Original Invoice</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Usage Information */}
          {product.usage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 bg-white rounded-2xl p-8 shadow-card"
            >
              <h2 className="text-2xl font-display font-bold text-primary mb-6">
                Usage Instructions
              </h2>
              <div className="prose prose-primary max-w-none">
                <p className="text-primary-300 leading-relaxed whitespace-pre-line">
                  {product.usage}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-primary text-white">
          <div className="container-premium">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              Related <span className="text-gold">Products</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ProductDetails
