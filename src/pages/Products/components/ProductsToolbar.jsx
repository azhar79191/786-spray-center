import { memo } from 'react'
import { FaFilter, FaThLarge, FaList } from 'react-icons/fa'

/**
 * Products Toolbar Component
 * View mode toggle and filter button
 */
const ProductsToolbar = memo(({ 
  productsCount, 
  totalItems, 
  viewMode, 
  setViewMode, 
  setShowFilters, 
  showFilters 
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-primary-300 text-sm">
        Showing {productsCount} of {totalItems} products
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden p-2 bg-white rounded-lg shadow-card text-primary hover:text-gold"
          aria-label={showFilters ? 'Hide filters' : 'Show filters'}
          aria-expanded={showFilters}
        >
          <FaFilter className="w-5 h-5" />
        </button>
        <div className="hidden sm:flex items-center bg-white rounded-lg shadow-card p-1" role="group" aria-label="View mode">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-gold text-primary' : 'text-primary-300 hover:text-primary'}`}
            aria-label="Grid view"
            aria-pressed={viewMode === 'grid'}
          >
            <FaThLarge className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-gold text-primary' : 'text-primary-300 hover:text-primary'}`}
            aria-label="List view"
            aria-pressed={viewMode === 'list'}
          >
            <FaList className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
})

ProductsToolbar.displayName = 'ProductsToolbar'

export default ProductsToolbar
