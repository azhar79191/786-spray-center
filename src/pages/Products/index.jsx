import { useState, lazy, Suspense } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEO from '../../components/common/SEO'
import { useProducts } from '../../hooks/useProducts'
import Spinner from '../../components/loaders/Spinner'

// Eager load above-the-fold components
import ProductsHeader from './components/ProductsHeader'
import ProductsToolbar from './components/ProductsToolbar'
import ActiveFilters from './components/ActiveFilters'
import ProductsGrid from './components/ProductsGrid'

// Lazy load sidebar (below the fold on mobile)
const ProductsFilters = lazy(() => import('./components/ProductsFilters'))
const Pagination = lazy(() => import('./components/Pagination'))

const PRODUCTS_STRUCTURED_DATA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Agricultural Products",
  "description": "Browse premium agricultural products including pesticides, insecticides, herbicides, fungicides, fertilizers, and seeds",
  "url": "https://bismillahspraycenter.vercel.app/products",
  "inLanguage": "en-PK",
  "isPartOf": { "@type": "WebSite", "name": "Bismillah Spray Center", "url": "https://bismillahspraycenter.vercel.app" },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bismillahspraycenter.vercel.app" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://bismillahspraycenter.vercel.app/products" }
    ]
  }
})

/**
 * Products Page
 * Product listing with search, filter, and pagination
 * Optimized with component-based architecture
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
    page: parseInt(searchParams.get('page') || '1'),
    limit: 12,
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
  })

  // Data is already filtered in useProducts hook - no need for useEffect!

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
    const params = {}
    if (filters.category) params.category = filters.category
    if (newBrand) params.brand = newBrand
    setSearchParams(params)
  }

  const handlePageChange = (page) => {
    updateFilters({ page })
    const params = {}
    if (filters.category) params.category = filters.category
    if (filters.brand) params.brand = filters.brand
    if (searchQuery) params.search = searchQuery
    if (page > 1) params.page = String(page)
    setSearchParams(params)
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
        title="Agricultural Products" 
        description="Complete range of agricultural products: pesticides, insecticides, herbicides, fungicides, fertilizers, seeds. Authorized Warble, FFC, Engro dealer. Shop in Bahawalnagar with delivery across Punjab."
        keywords="agricultural products Pakistan, crop protection products, pest control products Pakistan, plant nutrition products, farming supplies Bahawalnagar, agricultural chemicals Punjab, buy pesticides Pakistan, fertilizers online Pakistan"
      />

      {/* Header with search */}
      <ProductsHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {/* Products Section */}
      <section className="bg-surface py-8 lg:py-12">
        <div className="container-premium">
          <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
            {/* Sidebar Filters - Lazy loaded */}
            <Suspense fallback={<div className="lg:w-64 flex-shrink-0"><Spinner /></div>}>
              <ProductsFilters
                categories={categories}
                brands={brands}
                filters={filters}
                handleCategoryChange={handleCategoryChange}
                handleBrandChange={handleBrandChange}
                clearSearch={clearSearch}
                showFilters={showFilters}
              />
            </Suspense>

            {/* Product Grid */}
            <div className="flex-grow">
              {/* Toolbar */}
              <ProductsToolbar
                productsCount={products.length}
                totalItems={pagination.totalItems}
                viewMode={viewMode}
                setViewMode={setViewMode}
                setShowFilters={setShowFilters}
                showFilters={showFilters}
              />

              {/* Active Filters */}
              <ActiveFilters
                filters={filters}
                searchQuery={searchQuery}
                handleCategoryChange={handleCategoryChange}
                handleBrandChange={handleBrandChange}
                clearSearch={clearSearch}
              />

              {/* Products Grid */}
              <ProductsGrid
                products={products}
                loading={loading}
                error={error}
                viewMode={viewMode}
                clearSearch={clearSearch}
              />

              {/* Pagination - Lazy loaded */}
              <Suspense fallback={null}>
                <Pagination
                  pagination={pagination}
                  handlePageChange={handlePageChange}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Products
