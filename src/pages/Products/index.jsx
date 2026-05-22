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
    page: 1,
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
        title="Agricultural Products" 
        description="Browse premium agricultural products including pesticides, insecticides, herbicides, fungicides, fertilizers, and seeds. Authorized dealer of Syngenta, Bayer, FMC, Engro. Quality products at competitive prices for Pakistani farmers."
        keywords="buy pesticides online Pakistan, agricultural products catalog, insecticides price, herbicides for crops, fungicides Pakistan, fertilizers online, seeds dealer, Syngenta products, Bayer crop science, FMC pesticides Pakistan"
      />

      {/* Enhanced Structured Data for Products Page */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Agricultural Products",
          "description": "Browse premium agricultural products including pesticides, insecticides, herbicides, fungicides, fertilizers, and seeds",
          "url": "https://bismillahspraycenter.vercel.app/products",
          "inLanguage": "en-PK",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Bismillah Spray Center",
            "url": "https://bismillahspraycenter.vercel.app"
          },
          "about": {
            "@type": "Thing",
            "name": "Agricultural Products",
            "description": "Pesticides, Insecticides, Herbicides, Fungicides, Fertilizers, Seeds"
          },
          "mainEntity": {
            "@type": "ItemList",
            "name": "Agricultural Products Catalog",
            "description": "Complete catalog of agricultural products available at Bismillah Spray Center",
            "numberOfItems": pagination.totalItems || 50,
            "itemListElement": products.slice(0, 10).map((product, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": product.name,
                "description": product.description,
                "image": product.image,
                "brand": {
                  "@type": "Brand",
                  "name": product.brand?.name || "Bismillah Spray Center"
                },
                "category": product.category,
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "PKR",
                  "seller": {
                    "@type": "Organization",
                    "name": "Bismillah Spray Center"
                  }
                }
              }
            }))
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://bismillahspraycenter.vercel.app"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": "https://bismillahspraycenter.vercel.app/products"
              }
            ]
          }
        })}
      </script>

      {/* Header with search */}
      <ProductsHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {/* Products Section */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          <div className="flex flex-col lg:flex-row gap-8">
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
