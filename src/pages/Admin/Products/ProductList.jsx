import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from 'react-icons/fa'
import { toast } from 'react-toastify'
import SEO from '../../../components/common/SEO'
import { useProducts } from '../../../hooks/useProducts'
import Spinner from '../../../components/loaders/Spinner'
import apiClient from '../../../api/axios'
import ENDPOINTS from '../../../api/endpoints'

/**
 * Admin Product List
 * View, search, filter, and delete products
 */
const ProductList = () => {
  const { products, loading, fetchProducts, categories, brands } = useProducts()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetchProducts({
      search: searchTerm,
      category: selectedCategory,
      brand: selectedBrand
    })
  }, [searchTerm, selectedCategory, selectedBrand, fetchProducts])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return

    setDeleting(id)
    try {
      await apiClient.delete(ENDPOINTS.products.delete(id))
      toast.success('Product deleted successfully')
      fetchProducts()
    } catch (error) {
      toast.error(error.message || 'Failed to delete product')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <>
      <SEO title="Manage Products" noIndex />

      <div className="space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary mb-2">
              Products
            </h1>
            <p className="text-primary-300">
              Manage your product catalog
            </p>
          </div>
          <Link to="/admin/products/new" className="btn-primary">
            <FaPlus className="w-4 h-4 mr-2" />
            Add Product
          </Link>
        </header>

        {/* Filters */}
        <section className="bg-white rounded-xl p-6 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-300 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-300 w-5 h-5" />
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent appearance-none"
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Products Table */}
        <section className="bg-white rounded-xl shadow-card overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-primary-300 mb-4">No products found</p>
              <Link to="/admin/products/new" className="btn-primary">
                <FaPlus className="w-4 h-4 mr-2" />
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface border-b border-primary-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Image</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Brand</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Stock</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-primary">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-100">
                  {products.map((product, index) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-surface transition-colors"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={product.images?.[0] || '/placeholder.jpg'}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-primary">{product.name}</p>
                        {product.featured && (
                          <span className="inline-block mt-1 text-xs px-2 py-1 bg-gold/10 text-gold rounded-full">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-primary-300">{product.category}</td>
                      <td className="px-6 py-4 text-primary-300">{product.brand}</td>
                      <td className="px-6 py-4 text-primary-300">
                        PKR {product.price?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          product.inStock 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/products/${product._id}/edit`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id, product.name)}
                            disabled={deleting === product._id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deleting === product._id ? (
                              <Spinner size="sm" />
                            ) : (
                              <FaTrash className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default ProductList
