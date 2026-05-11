import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaSearch, FaFilter, FaTimes, FaThLarge, FaList } from 'react-icons/fa'
import SEO from '../../components/common/SEO'
import SectionTitle from '../../components/common/SectionTitle'
import ProductCard from '../../components/cards/ProductCard'
import Spinner from '../../components/loaders/Spinner'
import { SkeletonProductGrid } from '../../components/loaders/SkeletonLoader'
import { useProducts } from '../../hooks/useProducts'
import { getCategoryColor } from '../../utils/helpers'

/**
 * Products Page
 * Product listing with search, filter, and pagination
 */
const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  const {
    products,
    categories,
    brands,
    loading,
    error,
    pagination,
    filters,
    fetchProducts,
    updateFilters,
    resetFilters,
    searchProducts,
  } = useProducts({
    page: 1,
    limit: 12,
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
  })

  // Fetch products on mount and when filters change
  useEffect(() => {
    fetchProducts()
  }, [filters])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchProducts(searchQuery.trim())
      setSearchParams({ search: searchQuery.trim() })
    }
  }

  const handleCategoryChange = (category) => {
    const newCategory = filters.category === category ? '' : category
    updateFilters({ category: newCategory, page: 1 })
    if (newCategory) {
      setSearchParams({ category: newCategory })
    } else {
      setSearchParams({})
    }
  }

  const handleBrandChange = (brand) => {
    const newBrand = filters.brand === brand ? '' : brand
    updateFilters({ brand: newBrand, page: 1 })
  }

  const handlePageChange = (page) => {
    updateFilters({ page })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearSearch = () => {
    setSearchQuery('')
    resetFilters()
    setSearchParams({})
  }

  return (
    <>
      <SEO 
        title="Products" 
        description="Browse our wide range of premium agricultural products including pesticides, fertilizers, and seeds."
      />

      {/* Header */}
      <section className="relative py-20 bg-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />

        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <SectionTitle
              title="Our Products"
              subtitle="Premium Quality"
              light
            />

            {/* Search bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, brands, categories..."
                  className="w-full px-6 py-4 pl-14 pr-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-400 w-5 h-5" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gold text-primary font-semibold rounded-lg hover:bg-gold-600 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}
            >
              <div className="bg-white rounded-2xl p-6 shadow-card sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-primary font-semibold flex items-center gap-2">
                    <FaFilter className="w-4 h-4 text-gold" />
                    Filters
                  </h3>
                  <button
                    onClick={clearSearch}
                    className="text-sm text-gold hover:text-gold-600 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="text-primary font-medium text-sm mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          filters.category === category
                            ? 'bg-gold text-primary font-semibold'
                            : 'text-primary-300 hover:bg-primary-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <h4 className="text-primary font-medium text-sm mb-3">Brands</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => handleBrandChange(brand)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          filters.brand === brand
                            ? 'bg-gold text-primary font-semibold'
                            : 'text-primary-300 hover:bg-primary-700'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Product Grid */}
            <div className="flex-grow">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-primary-300 text-sm">
                  Showing {products.length} of {pagination.totalItems} products
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden p-2 bg-white rounded-lg shadow-card text-primary hover:text-gold"
                  >
                    <FaFilter className="w-5 h-5" />
                  </button>
                  <div className="hidden sm:flex items-center bg-white rounded-lg shadow-card p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-gold text-primary' : 'text-primary-300 hover:text-primary'}`}
                    >
                      <FaThLarge className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-gold text-primary' : 'text-primary-300 hover:text-primary'}`}
                    >
                      <FaList className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(filters.category || filters.brand || searchQuery) && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-primary-300 text-sm">Active filters:</span>
                  {filters.category && (
                    <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-medium flex items-center gap-1">
                      {filters.category}
                      <button onClick={() => handleCategoryChange(filters.category)}>
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {filters.brand && (
                    <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-medium flex items-center gap-1">
                      {filters.brand}
                      <button onClick={() => handleBrandChange(filters.brand)}>
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-medium flex items-center gap-1">
                      Search: {searchQuery}
                      <button onClick={clearSearch}>
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              {/* Products */}
              {loading ? (
                <SkeletonProductGrid count={12} />
              ) : error ? (
                <div className="text-center py-16">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button onClick={clearSearch} className="btn-primary">
                    Clear Filters
                  </button>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-primary-300 text-lg mb-4">No products found matching your criteria.</p>
                  <button onClick={clearSearch} className="btn-primary">
                    View All Products
                  </button>
                </div>
              ) : (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {products.map((product, index) => (
                    <ProductCard key={product._id} product={product} index={index} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="px-4 py-2 bg-white rounded-lg shadow-card text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
                  >
                    Previous
                  </button>

                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                        page === pagination.currentPage
                          ? 'bg-gold text-primary'
                          : 'bg-white text-primary-300 hover:bg-primary-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="px-4 py-2 bg-white rounded-lg shadow-card text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Products
