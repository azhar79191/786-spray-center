import { memo } from 'react'
import { FaFilter } from 'react-icons/fa'

const ProductsFilters = memo(({
  categories,
  brands,
  filters,
  handleCategoryChange,
  handleBrandChange,
  clearSearch,
  showFilters
}) => {
  return (
    <aside
      className={`lg:w-64 w-full flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}
      style={{ position: 'sticky', top: '80px', alignSelf: 'flex-start' }}
    >
      <div className="bg-white rounded-2xl p-6 shadow-card max-h-[calc(100vh-90px)] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-primary font-semibold flex items-center gap-2">
            <FaFilter className="w-4 h-4 text-gold" aria-hidden="true" />
            Filters
          </h3>
          <button
            onClick={clearSearch}
            className="text-sm text-gold hover:opacity-75 transition-opacity"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h4 className="text-primary font-medium text-sm mb-3">Categories</h4>
          <div className="space-y-1" role="group" aria-label="Product categories">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  filters.category === category
                    ? 'bg-gold text-primary font-semibold'
                    : 'text-primary-300 hover:bg-surface'
                }`}
                aria-pressed={filters.category === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h4 className="text-primary font-medium text-sm mb-3">Brands</h4>
          <div className="space-y-1" role="group" aria-label="Product brands">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => handleBrandChange(brand)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  filters.brand === brand
                    ? 'bg-gold text-primary font-semibold'
                    : 'text-primary-300 hover:bg-surface'
                }`}
                aria-pressed={filters.brand === brand}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
})

ProductsFilters.displayName = 'ProductsFilters'

export default ProductsFilters
