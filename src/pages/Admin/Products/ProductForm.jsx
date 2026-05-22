import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaSave, FaTimes, FaImage, FaTrash, FaPlus, FaMinus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import SEO from '../../../components/common/SEO'
import Spinner from '../../../components/loaders/Spinner'
import { getProductById, createProduct, updateProduct } from '../../../services/productService'
import { useData } from '../../../contexts/DataContext'
import { clearCacheByType } from '../../../utils/cacheUtils'

/**
 * Admin Product Form
 * Create or edit products with base64 image upload
 */
const ProductForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const { refreshData } = useData()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    image: '',
    sizes: [{ size: '', price: '' }],
    usage: '',
    stockStatus: 'In Stock',
    featured: false,
  })
  const [imagePreview, setImagePreview] = useState('')

  const categories = ['Insecticides', 'Herbicides', 'Fungicides', 'Fertilizers', 'Seeds']
  const stockStatuses = ['In Stock', 'Low Stock', 'Out of Stock']

  useEffect(() => {
    if (isEdit) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const response = await getProductById(id)
      const product = response.data
      setFormData({
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        brand: product.brand || '',
        image: product.image || '',
        sizes: product.sizes && product.sizes.length > 0 ? product.sizes : [{ size: '', price: '' }],
        usage: product.usage || '',
        stockStatus: product.stockStatus || 'In Stock',
        featured: product.featured ?? false,
      })
      if (product.image) {
        setImagePreview(product.image)
      }
    } catch (error) {
      toast.error('Failed to load product')
      navigate('/admin/products')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...formData.sizes]
    newSizes[index][field] = value
    setFormData({ ...formData, sizes: newSizes })
  }

  const addSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { size: '', price: '' }]
    })
  }

  const removeSize = (index) => {
    if (formData.sizes.length > 1) {
      setFormData({
        ...formData,
        sizes: formData.sizes.filter((_, i) => i !== index)
      })
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    // Convert to base64
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result
      setFormData({ ...formData, image: base64String })
      setImagePreview(base64String)
    }
    reader.onerror = () => {
      toast.error('Failed to read image file')
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setFormData({ ...formData, image: '' })
    setImagePreview('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate sizes
      const validSizes = formData.sizes.filter(s => s.size && s.price)
      if (validSizes.length === 0) {
        toast.error('Please add at least one size with price')
        setLoading(false)
        return
      }

      // Prepare payload
      const payload = {
        ...formData,
        sizes: validSizes.map(s => ({
          size: s.size,
          price: parseFloat(s.price)
        })),
        imageBase64: formData.image
      }

      if (isEdit) {
        await updateProduct(id, payload)
        toast.success('Product updated successfully')
      } else {
        await createProduct(payload)
        toast.success('Product created successfully')
      }
      
      // Clear product caches
      clearCacheByType('products')
      await refreshData('products')
      await refreshData('featuredProducts')
      await refreshData('categories')
      await refreshData('brands')
      
      navigate('/admin/products')
    } catch (error) {
      console.error('Save error:', error)
      toast.error(error.response?.data?.message || error.message || 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  if (loading && isEdit) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <SEO title={isEdit ? 'Edit Product' : 'Add Product'} noIndex />

      <div className="max-w-4xl">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-primary-300">
            {isEdit ? 'Update product information' : 'Fill in the details to create a new product'}
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-card space-y-6">
          {/* Basic Info */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="e.g., Confidor 200 SL"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-primary mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-primary mb-2">
                  Brand *
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="e.g., Bayer, Syngenta"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-primary mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Detailed product description..."
                />
              </div>
            </div>
          </section>

          {/* Sizes and Prices */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">Sizes & Prices</h2>
            <div className="space-y-3">
              {formData.sizes.map((size, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={size.size}
                      onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                      placeholder="e.g., 100ml, 1kg"
                      required
                      className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={size.price}
                      onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                      placeholder="Price (PKR)"
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    disabled={formData.sizes.length === 1}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaMinus className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSize}
                className="flex items-center gap-2 text-gold hover:text-gold-dark transition-colors"
              >
                <FaPlus className="w-4 h-4" />
                Add Size
              </button>
            </div>
          </section>

          {/* Additional Details */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">Additional Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="usage" className="block text-sm font-medium text-primary mb-2">
                  Usage Instructions
                </label>
                <textarea
                  id="usage"
                  name="usage"
                  value={formData.usage}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="How to use this product..."
                />
              </div>

              <div>
                <label htmlFor="stockStatus" className="block text-sm font-medium text-primary mb-2">
                  Stock Status *
                </label>
                <select
                  id="stockStatus"
                  name="stockStatus"
                  value={formData.stockStatus}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                >
                  {stockStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Product Image */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">Product Image *</h2>
            
            {imagePreview ? (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-64 h-64 object-cover rounded-lg border-2 border-primary-100"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required={!isEdit}
                  />
                  <div className="border-2 border-dashed border-primary-100 rounded-lg p-8 text-center cursor-pointer hover:border-gold transition-colors">
                    <FaImage className="w-12 h-12 text-primary-300 mx-auto mb-3" />
                    <p className="text-primary-300 mb-1">Click to upload image</p>
                    <p className="text-primary-300 text-sm">PNG, JPG, WEBP up to 5MB</p>
                  </div>
                </label>
              </div>
            )}
          </section>

          {/* Status */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">Display Options</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 text-gold rounded focus:ring-2 focus:ring-gold"
                />
                <span className="text-primary">Featured Product (Show on homepage)</span>
              </label>
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-primary-100">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <FaSave className="w-4 h-4" />
                  {isEdit ? 'Update Product' : 'Create Product'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="btn-secondary flex items-center gap-2"
            >
              <FaTimes className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ProductForm
