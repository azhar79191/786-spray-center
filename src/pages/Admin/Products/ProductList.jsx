import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaExclamationTriangle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import SEO from '../../../components/common/SEO'
import { useData } from '../../../contexts/DataContext'
import Spinner from '../../../components/loaders/Spinner'
import apiClient from '../../../api/axios'
import ENDPOINTS from '../../../api/endpoints'

const ProductList = () => {
  const { invalidateAndRefresh } = useData()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [deleting, setDeleting] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null) // { id, name }

  const categories = ['Insecticides', 'Herbicides', 'Fungicides', 'Fertilizers', 'Seeds']

  useEffect(() => {
    fetchProducts()
  }, [searchTerm, selectedCategory])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = { limit: 100 }
      if (searchTerm) params.search = searchTerm
      if (selectedCategory) params.category = selectedCategory
      const res = await apiClient.get('/products', { params, _skipCache: true })
      setProducts(res.data.data || [])
    } catch {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    const { id } = confirmDelete
    setConfirmDelete(null)
    setDeleting(id)
    try {
      await apiClient.delete(ENDPOINTS.products.delete(id))
      toast.success('Product deleted successfully')
      await invalidateAndRefresh(['products', 'featuredProducts'])
      setProducts(prev => prev.filter(p => p._id !== id))
    } catch (error) {
      toast.error(error.message || 'Failed to delete product')
    } finally {
      setDeleting(null)
    }
  }

  const getMinPrice = (product) => {
    if (product.sizes?.length > 0) {
      return Math.min(...product.sizes.map(s => s.price))
    }
    return product.price || 0
  }

  return (
    <>
      <SEO title="Manage Products" noIndex />

      {/* Inline Delete Confirm Dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaExclamationTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Delete Product</h3>
                <p className="text-sm text-primary-300">Are you sure you want to delete "{confirmDelete.name}"?</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="btn-secondary text-sm py-2 px-4">Cancel</button>
              <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded-lg transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary mb-2">Products</h1>
            <p className="text-primary-300">Manage your product catalog</p>
          </div>
          <Link to="/admin/products/new" className="btn-primary">
            <FaPlus className="w-4 h-4 mr-2" />
            Add Product
          </Link>
        </header>

        {/* Filters */}
        <section className="bg-white rounded-xl p-6 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-300 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-300 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="bg-white rounded-xl shadow-card overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-12"><Spinner /></div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-primary-300 mb-4">No products found</p>
              <Link to="/admin/products/new" className="btn-primary">
                <FaPlus className="w-4 h-4 mr-2" />Add Your First Product
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
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-surface transition-colors">
                      <td className="px-6 py-4">
                        <img
                          src={product.image || '/placeholder.jpg'}
                          alt={product.name}
                          className="w-14 h-14 rounded-lg object-cover bg-surface"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-primary">{product.name}</p>
                        {product.featured && (
                          <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-gold/10 text-gold rounded-full">Featured</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-primary-300 text-sm">{product.category}</td>
                      <td className="px-6 py-4 text-primary-300 text-sm">{product.brand}</td>
                      <td className="px-6 py-4 text-primary-300 text-sm">
                        PKR {getMinPrice(product).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          product.stockStatus === 'In Stock' ? 'bg-green-100 text-green-600' :
                          product.stockStatus === 'Low Stock' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {product.stockStatus || 'Unknown'}
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
                            onClick={() => setConfirmDelete({ id: product._id, name: product.name })}
                            disabled={deleting === product._id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deleting === product._id ? <Spinner size="sm" /> : <FaTrash className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
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
